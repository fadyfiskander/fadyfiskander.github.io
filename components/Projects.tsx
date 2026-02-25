import Image from "next/image";
import type { Project } from "@/lib/portfolio-data";

type ProjectsProps = {
  projects: Project[];
};

function hasUsableLink(url?: string): url is string {
  return typeof url === "string" && url.trim().length > 0 && url !== "#";
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section className="panel reveal-up reveal-up-delay p-5 md:p-8">
      <h2 className="section-title">
        <span className="accent-line" />
        <span>
          <span className="text-[var(--accent)]">My</span> Works
        </span>
      </h2>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
        Selected projects with strong foundations in architecture, product thinking, and modern visual execution.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => {
          const showLive = hasUsableLink(project.liveUrl);
          const showRepo = hasUsableLink(project.repoUrl);

          return (
            <article
              key={project.title}
              className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/60 transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/80"
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b border-[var(--border)] bg-black/30">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="transition duration-500 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950 text-xs uppercase tracking-[0.2em] text-zinc-500">
                    No Preview
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </div>

              <div className="space-y-4 p-5">
                <div>
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span
                      key={`${project.title}-${item}`}
                      className="rounded-md border border-[var(--border)] bg-black/30 px-2.5 py-1 text-xs text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs uppercase tracking-[0.16em]">
                  {showLive && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring font-semibold text-[var(--accent)] transition hover:text-[#e9be62]"
                    >
                      Live
                    </a>
                  )}
                  {showRepo && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring font-semibold text-zinc-200 transition hover:text-[var(--accent)]"
                    >
                      GitHub
                    </a>
                  )}
                  {!showLive && !showRepo && <span className="text-zinc-500">Private Project</span>}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}


// Details Page --
