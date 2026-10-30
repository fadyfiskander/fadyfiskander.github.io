// ─── Terminal content layer ──────────────────────────────────────────────────
// Pure data + pure functions. No React here. The component consumes this file.
// Tones map to monochrome zinc values in the component render step.

import {
  archStyles,
  designPatterns,
  education,
  onlineProfiles,
  owner,
  projects,
  skillGroups,
  type Project,
} from "./portfolio"

/** Value shades of the monochrome scale, darkest name = dimmest text. */
export type Tone = "strong" | "body" | "soft" | "muted" | "faint"

export type TerminalSpan = {
  text: string
  tone?: Tone
}

export type TerminalLine = TerminalSpan[]

const t = (text: string, tone: Tone = "body"): TerminalSpan => ({ text, tone })

/** Label column used in table-ish output, e.g. `stocka    | …` */
const pad = (s: string, n: number) => s + " ".repeat(Math.max(0, n - s.length))

// ─── Boot script ─────────────────────────────────────────────────────────────

/** Commands the shell "runs by itself" as an opening sequence. */
export const bootSequence: string[] = ["dotnet --info && load-projects"]

const BOOT_MOTD: TerminalLine[] = [
  [t(`// ${owner.name} — ${owner.role} Shell (${owner.primaryStack})`, "faint")],
  [t(`// ${education.school}: ${education.faculty} (${education.specialization})`, "faint")],
]

function systemInfo(): TerminalLine[] {
  const p = projects
  return [
    [t(`.NET SDK: ${owner.runtime} (x64) | Host OS: Windows / WSL2`)],
    [t(`Loaded ${p.length} core applications from `, "soft"), t("~/fady/projects", "strong")],
    [
      t("PROJECT      | ARCHITECTURE                    | DOMAIN                | STATE", "faint"),
    ],
    ...p.map(
      (pr): TerminalLine => [
        t(pad(pr.id, 13), "strong"),
        t("| "),
        t(pad(pr.subtitle, 32), "soft"),
        t("| "),
        t(pad(pr.domain, 22), "soft"),
        t("| "),
        t(pr.state, "strong"),
      ],
    ),
    [
      t("[READY] ", "strong"),
      t(`${p.length} core applications loaded. `, "soft"),
      t("Type a command below, or tap one of the pills above — e.g. ", "faint"),
      t("show stocka", "strong"),
      t(".", "faint"),
    ],
  ]
}

/** Suggested chips shown in the EXEC bar (name = command to run). */
export type ChipCommand = {
  label: string
  command: string
  /** first chip reads as the primary action */
  primary?: boolean
}

export const chipCommands: ChipCommand[] = [
  { label: "projects", command: "list-projects", primary: true },
  ...projects.map((p) => ({ label: p.id, command: `show ${p.id}` })),
  { label: "stack", command: "stack" },
  { label: "arch", command: "arch" },
  { label: "education", command: "education" },
  { label: "status", command: "status" },
  { label: "help", command: "help" },
]

/** Broadcast: auto replay shows the newest project first, then cycles. */
export const idleReplay: string[] = [
  ...projects.map((p) => `show ${p.id}`),
  "stack",
  "arch",
]

// ─── Command outputs ─────────────────────────────────────────────────────────

function projectDossier(p: Project): TerminalLine[] {
  return [
    [t(`// Project Dossier: ${p.title}`, "faint"), t(`  ${p.state} · ${p.period}`, "faint")],
    [t("Title: ", "strong"), t(`${p.title} — ${p.subtitle}`)],
    [t("Stack: ", "strong"), t(p.stack.join(", "), "soft")],
    ...p.features.map((f): TerminalLine => [t("  - ", "faint"), t(f, "soft")]),
    [t("Architecture: ", "strong"), t(p.architecture, "soft")],
    ...(p.repo ? [[t("Repo: ", "strong"), t(p.repo, "soft")]] : []),
  ]
}

const HELP: TerminalLine[] = [
  [t("help          ", "faint"), t("show this list", "faint")],
  [t("list-projects ", "strong"), t("directory listing of shipped work", "faint")],
  [t("show <id>     ", "strong"), t(`project dossier — ids: ${projects.map((p) => p.id).join(", ")}`, "faint")],
  [t("stack         ", "strong"), t("frameworks & core toolchain", "faint")],
  [t("arch          ", "strong"), t("architectures & design patterns", "faint")],
  [t("education     ", "strong"), t("academic background", "faint")],
  [t("status        ", "strong"), t("runtime status", "faint")],
  [t("contact       ", "strong"), t("email, phone, socials", "faint")],
  [t("clear         ", "strong"), t("wipe the screen", "faint")],
]

export function listProjects(): TerminalLine[] {
  return [
    [t("// Directory listing: ~/fady/projects", "faint")],
    [t("PROJECT   | CORE DOMAIN                | STATE  | TECH STACK", "faint")],
    ...projects.map(
      (p): TerminalLine => [
        t(pad(p.id, 10), "strong"),
        t("| "),
        t(pad(p.domain, 29), "soft"),
        t("| "),
        t(p.state, "strong"),
        t(" | "),
        t(p.stack.join(", "), "soft"),
      ],
    ),
    [t(`Tip: run "show <project>" (e.g. show ${projects[0].id}) — or click the pills above.`, "faint")],
  ]
}

function stack(): TerminalLine[] {
  return [
    [t("// Frameworks & core toolchain", "faint")],
    ...skillGroups.map(
      (g): TerminalLine => [t(`${pad(g.label + ":", 20)}`, "strong"), t(g.items.join("  ·  "), "soft")],
    ),
  ]
}

function arch(): TerminalLine[] {
  const rows = (list: typeof archStyles): TerminalLine[] =>
    list.map(
      (d, i): TerminalLine => [
        t(`${String(i + 1).padStart(2, "0")}  `, "faint"),
        t(d.name, "strong"),
        ...(d.detail ? [t(`  (${d.detail})`, "faint")] : []),
      ],
    )
  return [
    [t("// Architectures & design patterns — in practice", "faint")],
    [t("ARCHITECTURAL STYLES", "soft")],
    ...rows(archStyles),
    [t("DESIGN & MODULE PATTERNS", "soft")],
    ...rows(designPatterns),
  ]
}

function educationLines(): TerminalLine[] {
  return [
    [t(`// ${education.degree} — ${education.specialization}`, "faint")],
    [t("Institution: ", "strong"), t(`${education.school}, ${education.faculty}`, "soft")],
    [t("Period: ", "strong"), t(education.period, "soft"), t(`   Grade: `, "strong"), t(education.grade, "soft")],
    ...education.highlights.map((h): TerminalLine => [t("  - ", "faint"), t(h, "soft")]),
  ]
}

function status(): TerminalLine[] {
  return [
    [t("// Runtime status", "faint")],
    [t("session  "), t("[SESSION ACTIVE]", "strong"), t("  UTF-8", "faint")],
    [t("role     "), t(owner.role, "strong")],
    [t("base     "), t(owner.location, "soft")],
    [t("stack    "), t(owner.primaryStack, "strong")],
    [t("contact  "), t(owner.email, "soft"), t(`  / type `), t("contact", "strong")],
  ]
}

function contact(): TerminalLine[] {
  return [
    [t("// Reach me", "faint")],
    [t("email    "), t(owner.email, "soft")],
    [t("phone    "), t(owner.phone, "soft")],
    ...onlineProfiles.map(
      (p): TerminalLine => [
        t(`${p.label} `),
        t(p.text, "soft"),
        t(`  ↗ `, "faint"),
        t(p.url, "faint"),
      ],
    ),
  ]
}

export function bootOutput(): TerminalLine[] {
  return [...BOOT_MOTD, ...systemInfo()]
}

export function runCommand(raw: string): { clear: boolean; lines: TerminalLine[] } {
  const norm = raw.trim().toLowerCase()
  if (!norm) return { clear: false, lines: [] }
  if (norm === "clear" || norm === "cls") return { clear: true, lines: [] }
  if (norm === "help" || norm === "man" || norm === "?") {
    return { clear: false, lines: HELP }
  }
  if (norm === "whoami") {
    return {
      clear: false,
      lines: [
        [t(owner.name, "strong"), t(` — ${owner.role}`)],
        [t(owner.intro, "soft")],
      ],
    }
  }
  if (
    norm === "dotnet --info && load-projects" ||
    norm === "dotnet --info" ||
    norm === "dotnet"
  ) {
    return { clear: false, lines: systemInfo() }
  }
  if (
    norm === "list-projects" ||
    norm === "projects" ||
    norm === "ls" ||
    norm === "dir" ||
    norm === "ls projects"
  ) {
    return { clear: false, lines: listProjects() }
  }
  if (norm === "stack" || norm === "skills" || norm === "tech") {
    return { clear: false, lines: stack() }
  }
  if (norm === "arch" || norm === "patterns" || norm === "architecture") {
    return { clear: false, lines: arch() }
  }
  if (norm === "education" || norm === "edu" || norm === "academic") {
    return { clear: false, lines: educationLines() }
  }
  if (norm === "status" || norm === "session" || norm === "uptime") {
    return { clear: false, lines: status() }
  }
  if (norm === "contact" || norm === "reach" || norm === "email" || norm === "socials") {
    return { clear: false, lines: contact() }
  }

  // show <id> / open <id> / cat <id>
  const match = norm.match(/^(?:show|open|cat|inspect)\s+([a-z0-9_-]+)$/)
  if (match) {
    const id = match[1]
    const p = projects.find((x) => x.id.toLowerCase() === id)
    if (p) return { clear: false, lines: projectDossier(p) }
    return {
      clear: false,
      lines: [
        [
          t(`project not found: "${id}". `, "soft"),
          t(`available ids: ${projects.map((x) => x.id).join(", ")}`, "faint"),
        ],
      ],
    }
  }

  // direct project name, e.g. "stocka"
  const direct = projects.find((x) => x.id.toLowerCase() === norm)
  if (direct) return { clear: false, lines: projectDossier(direct) }

  return {
    clear: false,
    lines: [
      [
        t(`command not found: "${raw}". `, "soft"),
        t('type "help" to see available commands or tap the pills above.', "faint"),
      ],
    ],
  }
}
