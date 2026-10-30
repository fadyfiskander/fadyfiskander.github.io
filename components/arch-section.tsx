import { archStyles, designPatterns, projects, type DesignPractice } from "@/lib/portfolio"

function PracticeColumn({
  label,
  items,
}: {
  label: string
  items: DesignPractice[]
}) {
  return (
    <div>
      <div className="mb-1 font-mono text-[10.5px] uppercase tracking-wider text-zinc-600">
        {label}
      </div>
      <ul>
        {items.map((d, i) => (
          <li
            key={d.name}
            className="group/row flex items-baseline gap-3 border-b border-[#0f0f12] py-1.5"
          >
            <span className="font-mono text-[10px] tabular-nums text-zinc-700 transition-colors group-hover/row:text-zinc-500">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[13px] font-medium text-zinc-400 transition-colors group-hover/row:text-zinc-50">
              {d.name}
            </span>
            {d.detail && (
              <span className="truncate font-mono text-[10px] text-zinc-700">{d.detail}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Architecture & design section — a quiet numbered list, no cards, no boxes:
 * hairline rules, tabular indices, and one hover treatment.
 */
export function ArchSection() {
  return (
    <section id="arch" className="border-b border-[#1f1f23] bg-black px-5 py-8 sm:px-6">
      <div className="mx-auto max-w-[1180px]">
        {/* section header */}
        <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-1.5 flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              <span className="inline-block h-2 w-2 bg-zinc-50" aria-hidden />
              <span className="normal-case">SYSTEM_DESIGN // ARCHITECTURE &amp; PATTERNS</span>
              <span className="text-zinc-700">[IN PRACTICE — NOT IN THEORY]</span>
            </div>
            <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-zinc-50 sm:text-3xl sm:tracking-[-0.03em]">
              Architecture &amp; Design
            </h2>
          </div>
          <p className="max-w-md font-mono text-[11.5px] leading-5 text-zinc-500">
            {`How I structure systems — the layering, the boundaries, and the patterns that keep ${projects.length} applications consistent.`}
          </p>
        </div>

        {/* two flat lists */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
          <PracticeColumn label="ARCHITECTURAL STYLES" items={archStyles} />
          <PracticeColumn label="DESIGN & MODULE PATTERNS" items={designPatterns} />
        </div>

        {/* telemetry footer tying the list to real project data */}
        <div className="mt-4 font-mono text-[10.5px] text-zinc-600">
          <span className="text-zinc-300">[●]</span>{" "}
          {`APPLIED ACROSS ${projects.map((p) => p.title.toUpperCase()).join(" / ")}`}
        </div>
      </div>
    </section>
  )
}
