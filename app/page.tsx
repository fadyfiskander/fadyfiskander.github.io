import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { portfolio } from "@/lib/portfolio-data";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Works", href: "#works" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  return (
    <div className="container-shell py-4 md:py-8">
      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="panel reveal-up h-fit p-6 lg:sticky lg:top-6">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full border border-[var(--border)] bg-black/35 text-lg font-semibold text-[var(--accent)]">
              <img src={portfolio.hero.myPhoto} alt="" className="rounded-full" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Portfolio</p>
              <h1 className="text-xl font-semibold text-white">Fadi Fayez</h1>
            </div>
          </div>

          <p className="mt-6 text-sm leading-7 text-[var(--muted)]">
            .NET Full-Stack developer crafting modern web products with strong backend architecture and clean UI.
          </p>

          <span className="accent-line mt-6 block" />

          <nav className="mt-6 space-y-1" aria-label="Main sections">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="focus-ring block rounded-lg px-3 py-2 text-sm text-zinc-200 transition hover:bg-[var(--surface-2)] hover:text-[var(--accent)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-6 flex flex-wrap gap-2">
            {portfolio.contactLinks.map((link) => {
              const isExternal = link.href.startsWith("http");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="focus-ring rounded-md border border-[var(--border)] px-3 py-2 text-xs uppercase tracking-[0.12em] text-zinc-300 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </aside>

        <main className="scrollbar-custom space-y-6">
          <section id="home" className="scroll-mt-24">
            <Hero data={portfolio.hero} />
          </section>

          <section id="works" className="scroll-mt-24">
            <Projects projects={portfolio.projects} />
          </section>

          <section id="skills" className="scroll-mt-24">
            <Skills groups={portfolio.skillGroups} />
          </section>

          <section id="contact" className="scroll-mt-24">
            <Contact links={portfolio.contactLinks} />
          </section>
        </main>
      </div>
    </div>
  );
}
