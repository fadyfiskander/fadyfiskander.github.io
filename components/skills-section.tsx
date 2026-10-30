import { owner, skillGroups } from "@/lib/portfolio"

/**
 * Skills matrix. Four domain panels, each a quiet dark box holding small
 * square chips — one per technology, sized exactly to its name.
 */
export function SkillsSection() {
  return (
    <section id="skills" className="border-b border-[#1f1f23] bg-black px-5 py-8 sm:px-6">
      <div className="mx-auto max-w-[1180px]">
        {/* section header */}
        <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-1.5 flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              <span className="inline-block h-2 w-2 bg-zinc-50" aria-hidden />
              <span className="normal-case">CORE_COMPETENCIES // SKILLSET MATRIX</span>
              <span className="text-zinc-700">[ENGINEERING PILLARS]</span>
            </div>
            <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-zinc-50 sm:text-3xl sm:tracking-[-0.03em]">
              Technical Skills &amp; Domain Expertise
            </h2>
          </div>
          <div className="font-mono text-[10.5px] text-zinc-600">
            SPECIALIZATION:{" "}
            <span className="font-medium text-zinc-300">
              {`${owner.focusLabel.toUpperCase()} & INFORMATION SYSTEMS`}
            </span>
          </div>
        </div>

        {/* four domain panels */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g) => (
            <div
              key={g.index}
              className="border border-[#131316] bg-[#050507] p-3.5 transition-colors hover:border-[#2b2b30] hover:bg-[#09090b]"
            >
              <div className="mb-3 flex items-center justify-between gap-1.5 font-mono text-[10.5px]">
                <span className="uppercase tracking-wider text-zinc-600">{g.tagline}</span>
                <span className="bg-[#0e0e11] px-1.5 py-0.5 text-zinc-500">
                  {g.index}
                </span>
              </div>
              <h3 className="mb-3 text-[15px] font-medium tracking-[-0.015em] text-zinc-100">
                {g.label}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <span
                    key={item}
                    title={item}
                    className="inline-flex w-fit items-center border border-[#161619] bg-[#0d0d10] px-1.5 py-0.5 font-mono text-[10.5px] text-zinc-500 transition-colors hover:border-[#2b2b30] hover:bg-[#131316] hover:text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
