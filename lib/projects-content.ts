// ─── Project content registry ──────────────────────────────────────────────────
// How to add a section to a project page:
//   1. Create your Markdown file in `content/projects/<projectId>/`
//   2. Append an entry to the project's `sections` array below —
//      the `id` becomes the URL anchor, the `title` is what the reader sees.
// The app renders whatever is here; it never authors content.

import fs from "node:fs"
import path from "node:path"
import { marked } from "marked"

export type ProjectSection = {
  /** URL anchor — stable, lowercase, no spaces */
  id: string
  /** the display name shown in the section index and its heading row */
  title: string
  /** file inside `content/projects/<projectId>/` */
  file: string
}

export type ProjectContentEntry = {
  sections: ProjectSection[]
}

export const projectContent: Record<string, ProjectContentEntry> = {
  stocka: {
    sections: [
      { id: "overview", title: "Overview", file: "overview.md" },
      { id: "architecture", title: "Architecture Decisions", file: "architecture.md" },
    ],
  },
  gamedex: {
    sections: [
      { id: "overview", title: "Overview", file: "overview.md" },
      { id: "domain-model", title: "Domain Model", file: "domain-model.md" },
    ],
  },
}

const CONTENT_ROOT = path.join(process.cwd(), "content", "projects")

/** Reads one Markdown file for a project. Build-time + dev-server only. */
export function readProjectMarkdown(projectId: string, file: string): string {
  return fs.readFileSync(path.join(CONTENT_ROOT, projectId, file), "utf8")
}

/** Markdown → HTML. GFM tables/strikes on; content is self-authored, not user input. */
export function renderProjectMarkdown(md: string): string {
  return marked.parse(md, { async: false, gfm: true }) as string
}
