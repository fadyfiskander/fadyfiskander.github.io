import type { SkillGroup } from "@/lib/portfolio-data";

type SkillsProps = {
  groups: SkillGroup[];
};

export default function Skills({ groups }: SkillsProps) {
  return (
    <section className="panel reveal-up p-5 md:p-8">
      <h2 className="section-title">
        <span className="accent-line" />
        Skills & Tech
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {groups.map((group) => (
          <article key={group.label} className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/45 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">{group.label}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={`${group.label}-${item}`}
                  className="rounded-md border border-[var(--border)] bg-black/35 px-3 py-1.5 text-xs font-medium text-zinc-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
