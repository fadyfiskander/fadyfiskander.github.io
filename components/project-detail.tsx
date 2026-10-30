import Link from "next/link"
import { projects, type Project } from "@/lib/portfolio"
import type { ProjectSection } from "@/lib/projects-content"

type RenderSection = ProjectSection & { html: string }

function HeaderPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-baseline gap-1.5 border border-[#1f1f23] bg-[#0e0e11] px-2 py-1 font-mono text-[10.5px]">
      <span className="text-zinc-600">{label}</span>
      <span className="text-zinc-100">{value}</span>
    </span>
  )
}

function SectionChip({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href}
      className="inline-flex w-fit items-center border border-[#161619] bg-[#0d0d10] px-1.5 py-0.5 font-mono text-[10.5px] text-zinc-500 transition-colors hover:border-[#2b2b30] hover:bg-[#131316] hover:text-zinc-300"
    >
      {title}
    </Link>
  )
}

function RailPanel({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="border border-[#131316] bg-[#050507] p-3">
      <div className="mb-2 font-mono text-[10.5px] uppercase tracking-wider text-zinc-600">
        {label}
      </div>
      {children}
    </div>
  )
}

function SectionIndex({ sections }: { sections: RenderSection[] }) {
  return (
    <nav className="hidden lg:block">
      <div className="sticky top-6">
        <RailPanel label="SECTIONS // INDEX">
          <ul className="space-y-0.5">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block border-b border-[#0f0f12] py-1 font-mono text-[11px] text-zinc-500 transition-colors last:border-b-0 hover:text-zinc-50"
                >
                  <span className="text-zinc-700">› </span>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </RailPanel>
      </div>
    </nav>
  )
}

function TechRail({ project }: { project: Project }) {
  return (
    <div className="lg:sticky lg:top-6 self-start flex flex-col gap-3">
      <RailPanel label="STACK // TECHNOLOGIES">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="inline-flex w-fit items-center border border-[#161619] bg-[#0d0d10] px-1.5 py-0.5 font-mono text-[10.5px] text-zinc-500"
            >
              {s}
            </span>
          ))}
        </div>
      </RailPanel>
      {project.archTags && project.archTags.length > 0 && (
        <RailPanel label="DESIGN // PATTERNS">
          <div className="flex flex-wrap gap-1.5">
            {project.archTags.map((t) => (
              <span
                key={t}
                className="inline-flex w-fit items-center border border-[#161619] bg-[#0d0d10] px-1.5 py-0.5 font-mono text-[10.5px] text-zinc-500"
              >
                {t}
              </span>
            ))}
          </div>
        </RailPanel>
      )}
      <RailPanel label="STATUS // TELEMETRY">
        <div className="space-y-1 font-mono text-[10.5px] text-zinc-600">
          <div>
            STATE <span className="text-zinc-300">{project.state}</span>
          </div>
          <div>
            PERIOD <span className="text-zinc-300">{project.period}</span>
          </div>
          <div>
            VERSION <span className="text-zinc-300">{project.version}</span>
          </div>
        </div>
      </RailPanel>
    </div>
  )
}

function MarkdownBody({ html }: { html: string }) {
  return (
    <div
      className="md-content"
      // self-authored project content, rendered from local .md files
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

/**
 * Full project case page: dossier header on top, then a three-column grid —
 * section index (left), authored markdown workspace (center), tech/design rail (right).
 */
export function ProjectDetail({
  project,
  sections,
}: {
  project: Project
  sections: RenderSection[]
}) {
  const ordered = projects
  const idx = ordered.findIndex((p) => p.id === project.id)
  const prev = ordered[idx - 1]
  const next = ordered[idx + 1]

  return (
    <article className="min-h-svh bg-black text-zinc-100">
      {/* ── dossier header ─────────────────────────────────────────────── */}
      <div className="border-b border-[#1f1f23] px-5 pb-5 pt-8 sm:px-6">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10.5px]">
            <Link
              href="/"
              className="text-zinc-600 transition-colors hover:text-zinc-300"
            >
              {`< ~/portfolio`}
            </Link>
            <span className="text-zinc-700">/</span>
            <span className="uppercase tracking-wider text-zinc-600">{project.tagline}</span>
            <span
              className={`px-1.5 py-0.5 ${
                project.state === "IN PROGRESS"
                  ? "border border-[#2b2b30] bg-[#0e0e11]"
                  : "bg-[#151518]"
              } text-zinc-300`}
            >
              {project.state}
            </span>
            <span className="text-zinc-600">{project.version}</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-zinc-50 sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-2 max-w-3xl text-[13.5px] leading-6 text-zinc-400">
            {project.cardDescription}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <HeaderPill label="PERIOD" value={project.period} />
            {project.metrics.map((m) => (
              <HeaderPill key={m.label} label={m.label} value={m.value} />
            ))}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 border border-[#1f1f23] bg-[#0e0e11] px-2 py-1 font-mono text-[10.5px] text-zinc-500 transition-colors hover:border-[#2b2b30] hover:text-zinc-200"
              >
                <span className="text-zinc-600">REPO</span>
                <span>{project.repo.replace("https://", "").split("/").slice(-1)}</span>
                <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── three-column workspace ─────────────────────────────────────── */}
      <div className="border-b border-[#1f1f23] px-5 py-8 sm:px-6">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 lg:grid-cols-[190px_minmax(0,1fr)_225px]">
          <SectionIndex sections={sections} />

          {/* authored content workspace */}
          <div className="min-w-0">
            {sections.length === 0 && (
              <div className="border border-[#131316] bg-[#050507] p-6 font-mono text-[12px] text-zinc-500">
                <div className="text-zinc-300">no sections registered for {project.id} yet</div>
                <div className="mt-2">
                  drop a <span className="text-zinc-300">.md</span> file in{" "}
                  <span className="text-zinc-300">content/projects/{project.id}/</span> and add an
                  entry in <span className="text-zinc-300">lib/projects-content.ts</span>
                </div>
              </div>
            )}
            {sections.length > 0 && (
              <div className="mb-5 lg:hidden">
                <div className="mb-2 font-mono text-[10.5px] uppercase tracking-wider text-zinc-600">
                  SECTIONS
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {sections.map((s) => (
                    <SectionChip key={s.id} href={`#${s.id}`} title={s.title} />
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-10">
              {sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-8">
                  <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-[#1f1f23] pb-2">
                    <h2 className="text-[15px] font-medium tracking-[-0.015em] text-zinc-100">
                      {s.title}
                    </h2>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-700">
                      {s.file}
                    </span>
                  </div>
                  <MarkdownBody html={s.html} />
                </section>
              ))}
            </div>

            {/* prev/next project */}
            <div className="mt-12 flex items-center justify-between border-t border-[#1f1f23] pt-4 font-mono text-[10.5px]">
              {prev ? (
                <Link href={`/projects/${prev.id}`} className="text-zinc-500 hover:text-zinc-100">
                  ← {prev.title}
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={`/projects/${next.id}`} className="text-zinc-500 hover:text-zinc-100">
                  {next.title} →
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>

          <TechRail project={project} />
        </div>
      </div>
    </article>
  )
}
