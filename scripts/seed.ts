/**
 * Seeds the first admin account and the default section links.
 *
 * Run with credentials from the environment (never hard-code them):
 *   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='strong-pass' \
 *     npx dotenv -e .env.local -- npx tsx scripts/seed.ts
 *
 * Safe to re-run: it skips the admin if the email already exists and only
 * inserts section links when the table is empty.
 */
import { randomUUID } from "crypto";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { eq } from "drizzle-orm";
import { getDb } from "../lib/db";
import * as schema from "../lib/db/schema";
import { DEFAULT_SECTIONS } from "../lib/sections";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables before seeding."
    );
  }
  if (password.length < 10) {
    throw new Error("ADMIN_PASSWORD must be at least 10 characters.");
  }

  const db = getDb();

  // --- Admin user ---
  const existing = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.email, email));

  if (existing.length > 0) {
    console.log(`✓ Admin ${email} already exists — skipping.`);
  } else {
    // Dedicated instance with sign-up enabled (the app instance disables it).
    const seedAuth = betterAuth({
      database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
          user: schema.user,
          session: schema.session,
          account: schema.account,
          verification: schema.verification,
        },
      }),
      emailAndPassword: { enabled: true },
    });

    await seedAuth.api.signUpEmail({
      body: { email, password, name: "Admin" },
    });

    await db
      .update(schema.user)
      .set({ role: "admin", emailVerified: true })
      .where(eq(schema.user.email, email));

    console.log(`✓ Created admin ${email}`);
  }

  // --- Default section links ---
  const linkCount = (await db.select().from(schema.sectionLink)).length;
  if (linkCount > 0) {
    console.log(`✓ ${linkCount} section link(s) already present — skipping.`);
  } else {
    for (const s of DEFAULT_SECTIONS) {
      await db.insert(schema.sectionLink).values({
        id: randomUUID(),
        slug: s.slug,
        title: s.title,
        description: s.description,
        href: s.href,
        accent: s.accent,
        icon: s.icon,
        sortOrder: s.sortOrder,
        enabled: s.enabled,
      });
    }
    console.log(`✓ Inserted ${DEFAULT_SECTIONS.length} default section links`);
  }

  console.log("Seed complete.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
