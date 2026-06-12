import { asc, eq } from "drizzle-orm";
import { getDb } from "./db";
import { sectionLink, type SectionLink } from "./db/schema";

// Fallback used on the public page if the DB is empty or unreachable, so the
// landing page never renders blank.
export const DEFAULT_SECTIONS: Omit<
  SectionLink,
  "createdAt" | "updatedAt"
>[] = [
  {
    id: "seed-servis",
    slug: "servis",
    title: "Servis",
    description: "Opravy, údržba a péče o vaše vozidlo od profesionálů.",
    href: "#",
    accent: "#F5C200",
    icon: "wrench",
    sortOrder: 0,
    enabled: true,
  },
  {
    id: "seed-eventy",
    slug: "eventy",
    title: "Eventy",
    description: "Srazy, výjezdy a skupinové akce pro celou komunitu.",
    href: "#",
    accent: "#62BAE8",
    icon: "calendar",
    sortOrder: 1,
    enabled: true,
  },
  {
    id: "seed-merch",
    slug: "merch",
    title: "Merch",
    description: "Oblečení, doplňky a vybavení s logem 2RM Group.",
    href: "#",
    accent: "#F5C200",
    icon: "shirt",
    sortOrder: 2,
    enabled: true,
  },
  {
    id: "seed-detailing",
    slug: "detailing",
    title: "Detailing",
    description:
      "Profesionální čištění a kosmetika vozu do posledního detailu.",
    href: "#",
    accent: "#62BAE8",
    icon: "sparkles",
    sortOrder: 3,
    enabled: true,
  },
];

/** All links ordered, for the admin panel. */
export async function getAllSectionLinks(): Promise<SectionLink[]> {
  return getDb().select().from(sectionLink).orderBy(asc(sectionLink.sortOrder));
}

/** Only enabled links, for the public landing page. */
export async function getPublicSectionLinks() {
  try {
    const rows = await getDb()
      .select()
      .from(sectionLink)
      .where(eq(sectionLink.enabled, true))
      .orderBy(asc(sectionLink.sortOrder));
    return rows.length > 0 ? rows : DEFAULT_SECTIONS;
  } catch {
    return DEFAULT_SECTIONS;
  }
}
