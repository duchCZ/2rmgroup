/**
 * Resets an existing user's password using Better Auth's own hashing.
 *
 *   ADMIN_EMAIL=you@example.com NEW_PASSWORD='clear-pass' \
 *     npx dotenv -e .env.local -- npx tsx scripts/reset-password.ts
 */
import { and, eq } from "drizzle-orm";
import { auth } from "../lib/auth";
import { getDb } from "../lib/db";
import * as schema from "../lib/db/schema";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const newPassword = process.env.NEW_PASSWORD;

  if (!email || !newPassword) {
    throw new Error("Set ADMIN_EMAIL and NEW_PASSWORD.");
  }
  if (newPassword.length < 10) {
    throw new Error("NEW_PASSWORD must be at least 10 characters.");
  }

  const db = getDb();
  const users = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.email, email));

  if (users.length === 0) throw new Error(`No user with email ${email}`);
  const userId = users[0].id;

  // Better Auth stores credential passwords on the `account` row with
  // providerId = "credential". Hash with the same primitive the app uses.
  const ctx = await auth.$context;
  const hash = await ctx.password.hash(newPassword);

  const updated = await db
    .update(schema.account)
    .set({ password: hash, updatedAt: new Date() })
    .where(
      and(
        eq(schema.account.userId, userId),
        eq(schema.account.providerId, "credential")
      )
    )
    .returning();

  if (updated.length === 0) {
    throw new Error("No credential account found for this user.");
  }

  console.log(`✓ Password reset for ${email}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Reset failed:", err);
    process.exit(1);
  });
