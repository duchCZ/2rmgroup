"use server";

import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { sectionLink } from "@/lib/db/schema";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    throw new Error("Neautorizováno");
  }
  return session;
}

type LinkInput = {
  title: string;
  description: string;
  href: string;
  accent: string;
  icon: string;
  enabled: boolean;
};

function parseForm(formData: FormData): LinkInput {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();
  const accent = String(formData.get("accent") ?? "#F5C200").trim();
  const icon = String(formData.get("icon") ?? "link").trim();
  const enabled = formData.get("enabled") === "on";

  if (!title) throw new Error("Název je povinný");
  if (!href) throw new Error("Odkaz je povinný");
  // Allow only same-origin anchors or http(s) URLs — blocks javascript:/data: etc.
  if (!/^(#|\/|https?:\/\/)/.test(href)) {
    throw new Error("Odkaz musí začínat http://, https://, / nebo #");
  }
  if (!/^#[0-9a-fA-F]{6}$/.test(accent)) {
    throw new Error("Barva musí být hex, např. #F5C200");
  }

  return { title, description, href, accent, icon, enabled };
}

export async function updateLink(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseForm(formData);
  await getDb()
    .update(sectionLink)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(sectionLink.id, id));
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function createLink(formData: FormData) {
  await requireAdmin();
  const data = parseForm(formData);
  const slug =
    data.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || randomUUID().slice(0, 8);

  const count = (await getDb().select().from(sectionLink)).length;

  await getDb()
    .insert(sectionLink)
    .values({
      id: randomUUID(),
      slug: `${slug}-${randomUUID().slice(0, 4)}`,
      ...data,
      sortOrder: count,
    });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteLink(id: string) {
  await requireAdmin();
  await getDb().delete(sectionLink).where(eq(sectionLink.id, id));
  revalidatePath("/");
  revalidatePath("/admin");
}
