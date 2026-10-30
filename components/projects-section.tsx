import { owner, projects } from "@/lib/portfolio"
import { ProjectCard } from "@/components/project-card"

/**
 * Showcase grid ("Main Projects Showcase"). Server component — the only
 * interactivity lives inside ProjectCard.
 */
export function ProjectsSection() {
  return (
    <section id="projects" className="border-b border-[#1f1f23] bg-black px-5 py-8 sm:px-6">
      <div className="mx-auto max-w-[1180px]">
        {/* section header */}
        <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-1.5 flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              <span className="inline-block h-2 w-2 bg-zinc-50" aria-hidden />
              <span className="normal-case">APPLICATION_CATALOG // FEATURED PORTFOLIO</span>
              <span className="text-zinc-700">
                {`[${String(projects.length).padStart(2, "0")} FLAGSHIP SYSTEMS]`}
              </span>
            </div>
            <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-zinc-50 sm:text-3xl sm:tracking-[-0.03em]">
              Main Projects Showcase
            </h2>
          </div>
          <p className="max-w-md font-mono text-[11.5px] leading-[20px] text-zinc-500">
            {`Full stack applications highlighting clean architecture, robust business logic, high-performance database modeling, and intuitive user experiences — built with ${owner.primaryStack}.`}
          </p>
        </div>

        {/* project grid: 2 columns for 2 flagship systems, balanced & symmetrical */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
