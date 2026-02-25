import type { ContactLink } from "@/lib/portfolio-data";

type ContactProps = {
  links: ContactLink[];
};

export default function Contact({ links }: ContactProps) {
  return (
    <section className="panel reveal-up p-6 md:p-8">
      <h2 className="section-title">
        <span className="accent-line" />
        Contact
      </h2>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
        Open to full-time roles, freelance opportunities, and collaboration on product-focused web experiences.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {links.map((link) => {
          const isExternal = link.href.startsWith("http");

          return (
            <a
              key={link.label}
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              className="focus-ring rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </section>
  );
}
