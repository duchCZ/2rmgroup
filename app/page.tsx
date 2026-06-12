import { Logo } from "@/components/logo";

const sections = [
  {
    id: "servis",
    title: "Servis",
    description: "Opravy, údržba a péče o vaše vozidlo od profesionálů.",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
        aria-hidden
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    accent: "#F5C200",
  },
  {
    id: "eventy",
    title: "Eventy",
    description: "Srazy, výjezdy a skupinové akce pro celou komunitu.",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
        aria-hidden
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
    accent: "#62BAE8",
  },
  {
    id: "merch",
    title: "Merch",
    description: "Oblečení, doplňky a vybavení s logem 2RM Group.",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
        aria-hidden
      >
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
    accent: "#F5C200",
  },
  {
    id: "detailing",
    title: "Detailing",
    description: "Profesionální čištění a kosmetika vozu do posledního detailu.",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
        aria-hidden
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    accent: "#62BAE8",
  },
];

export default function Home() {
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
              {/* accent top bar */}
              <div
                className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: s.accent }}
              />

              <div style={{ color: s.accent }}>{s.icon}</div>

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
