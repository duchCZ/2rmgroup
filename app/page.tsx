import { Logo } from "@/components/logo";
import { SectionIcon } from "@/components/section-icon";
import { getPublicSectionLinks } from "@/lib/sections";

export const dynamic = "force-dynamic";

export default async function Home() {
  const sections = await getPublicSectionLinks();

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center flex-1 px-6 pt-24 pb-12">
        <Logo size="xl" dark className="mb-4" />
        <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mt-2 mb-1">
          Group
        </p>
        <p className="text-muted-foreground text-sm mt-3 text-center max-w-xs leading-relaxed">
          Komunita pro nadšence motorismu
        </p>
      </section>

      {/* Cards grid */}
      <section className="px-6 pb-20 max-w-3xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sections.map((s) => (
            <a
              key={s.id}
              href={s.href}
              className="group relative flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-white/20 hover:bg-card/80 hover:shadow-xl hover:-translate-y-0.5"
            >
              <div
                className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: s.accent }}
              />

              <div style={{ color: s.accent }}>
                <SectionIcon name={s.icon} />
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground mb-1.5">
                  {s.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="flex items-center text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                <span>Přejít</span>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform duration-200"
                  aria-hidden
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} 2RM Group · 2rmgroup.cz
      </footer>
    </main>
  );
}
