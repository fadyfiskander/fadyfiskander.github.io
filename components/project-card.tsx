"use client"

import Link from "next/link"
import type { Project } from "@/lib/portfolio"
import { runTerminalCommand } from "@/lib/bus"

/**
 * Showcase card. Deliberately quiet: dark surface close to the page canvas,
 * one border color, three text values total.
 */
export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article
      id={`proj-${p.id}`}
      className="group flex flex-col justify-between border border-[#131316] bg-[#050507] p-4 transition-colors hover:border-[#2b2b30] hover:bg-[#09090b]"
    >
      <div>
        {/* release line: category + version */}
        <div className="mb-2 flex items-center justify-between gap-1.5 font-mono text-[10.5px]">
          <span className="uppercase tracking-wider text-zinc-600">{p.tagline}</span>
          <span className="border border-[#1f1f23] bg-[#0e0e11] px-1.5 py-0.5 text-zinc-400">{p.version}</span>
        </div>
        <h3 className="text-[20px] font-medium leading-6 tracking-[-0.02em] text-zinc-50">
          {p.title}
        </h3>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-zinc-400">{p.cardDescription}</p>

        {/* two data cells — hairline separators */}
        <div className="my-3.5 grid grid-cols-2 gap-3 font-mono text-[10.5px]">
          {p.metrics.map((m) => (
            <div key={m.label} className="border-l border-[#1a1a1f] pl-3">
              <span className="block text-zinc-600 uppercase tracking-wider text-[9.5px]">{m.label}</span>
              <span className="font-mono text-[12px] text-zinc-300">{m.value}</span>
            </div>
          ))}
        </div>

        {/* stack — clean mono pill badges */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10.5px]">
          {p.stack.map((tech) => (
            <span
              key={tech}
              className="border border-[#161619] bg-[#0d0d10] px-1.5 py-0.5 text-zinc-500"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* card footer actions: CLI runner, Case page, and GitHub Repo */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#121215] pt-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => runTerminalCommand(`show ${p.id}`, true)}
            className="inline-flex items-center gap-1.5 border border-[#1f1f23] bg-[#0e0e11] px-2.5 py-1 font-mono text-[10.5px] text-zinc-400 transition-colors hover:border-zinc-700 hover:bg-[#16161a] hover:text-zinc-100"
            title={`Inspect ${p.title} dossier directly in terminal`}
          >
            <span className="text-zinc-600">[$]</span>
            <span>INSPECT IN CLI</span>
          </button>
          <Link
            href={`/projects/${p.id}`}
            className="group/btn inline-flex items-center gap-1 border border-transparent px-2 py-1 font-mono text-[10.5px] font-medium text-zinc-300 transition-colors hover:text-zinc-50"
          >
            <span>FULL CASE</span>
            <span aria-hidden className="transition-transform group-hover/btn:translate-x-1">
              →
            </span>
          </Link>
        </div>
        {p.repo && (
          <a
            href={p.repo}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10.5px] text-zinc-600 transition-colors hover:text-zinc-300"
          >
            VIEW REPO ↗
          </a>
        )}
      </div>
    </article>
  )
}
