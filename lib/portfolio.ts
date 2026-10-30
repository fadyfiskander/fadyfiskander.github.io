// ─── Portfolio data ────────────────────────────────────────────────────────────
// Single source of truth — every section and the terminal read from here.
// Synced with the official résumé (Junior Software Developer .NET).

export const owner = {
  name: "Fady Fayez",
  role: "Junior Software Developer (.NET)",
  focusLabel: "C# & ASP.NET Core",
  focusFull: "Clean Architecture, CQRS & maintainable code",
  spec: "DEV_SPEC // FULL STACK",
  hostname: "fady@workstation",
  cwd: "~/dev/portfolio",
  shell: "dotnet-sdk",
  intro:
    "Junior Software Developer with hands-on experience building scalable web applications using C#, ASP.NET Core, React, Entity Framework Core, and PostgreSQL. Passionate about Clean Architecture, CQRS, and writing maintainable, testable code while continuously learning modern software engineering practices.",
  location: "New Cairo, Cairo",
  email: "fadyfayez.net@gmail.com",
  phone: "01503996443",
  github: "FadiFayezDev",
  linkedin: "fadifayezdev",
  website: "fadyfiskander.github.io",
  primaryStack: "C#, ASP.NET Core, React, EF Core, PostgreSQL",
  runtime: ".NET 8 / 10",
  database: "SQL SERVER / POSTGRES",
} as const

export type Project = {
  /** lowercase command id — also what `show <id>` accepts */
  id: string
  title: string
  subtitle: string
  domain: string
  /** runtime label shown on the dossier/card */
  state: "ACTIVE" | "IN PROGRESS" | "IDLE" | "ARCHIVED"
  /** human period, e.g. "02/2026 — Present" */
  period: string
  stack: string[]
  features: string[]
  architecture: string

  // ── Showcase card content ──
  /** small mono category line */
  tagline: string
  /** version pill text — "WIP" while in progress */
  version: string
  /** the longer paragraph shown on the card */
  cardDescription: string
  /** exactly the two label/value cells on the card */
  metrics: { label: string; value: string }[]
  repo?: string

  // ── Detail page right rail — design-level decisions, not tool names ──
  archTags?: string[]
}

export const projects: Project[] = [
  {
    id: "stocka",
    title: "Stocka",
    subtitle: "Multi-Brand & Multi-Branch ERP System",
    domain: "ERP / Business Systems",
    state: "IN PROGRESS",
    period: "02/2026 — Present",
    stack: ["C#", "ASP.NET Core", "Next.js", "EF Core", "Dapper"],
    features: [
      "Replaces Excel/Access workflows for small & medium businesses in Egypt",
      "Secure isolation across brands (JWT + RBAC)",
      "Local-first deployment option — planned SaaS offering",
    ],
    architecture:
      "Clean Architecture + CQRS with a hybrid data access layer: EF Core for writes, Dapper for reads. ASP.NET Core Identity with branch-level data scoping.",
    tagline: "ERP // MULTI-BRAND SYSTEMS",
    version: "WIP",
    cardDescription:
      "Multi-brand, multi-branch ERP backend architected in C# and .NET, designed to replace Excel/Access workflows for small and medium businesses in Egypt. Hybrid data access and branch-scoped security from day one — with a local-first deployment path and a planned SaaS offering.",
    metrics: [
      { label: "DATA ACCESS", value: "EF Core × Dapper" },
      { label: "SECURITY", value: "JWT / RBAC" },
    ],
    repo: "https://github.com/FadiFayezDev/Stocka",
    archTags: ["Clean Architecture", "CQRS", "MediatR", "Contract-Based Communication", "Repository", "Unit of Work"],
  },
  {
    id: "gamedex",
    title: "GameDex",
    subtitle: "Game Library & Metadata Catalog",
    domain: "Desktop / Local-First Apps",
    state: "ACTIVE",
    period: "03/2026 — 05/2026",
    stack: ["Tauri", ".NET 10", "Next.js", "SQLite", "xUnit"],
    features: [
      "Full stack runs offline — no server required",
      "304 domain unit tests + integration test coverage",
      ".gdex portable export for peer-to-peer library sharing",
    ],
    architecture:
      "Local-first data layer on SQLite with EF Core (writes) and Dapper (reads), following Clean Architecture and DDD — 8 domain aggregates, 16 strongly-typed IDs, 7 domain events.",
    tagline: "DESKTOP // LOCAL-FIRST",
    version: "v1.0.0",
    cardDescription:
      "A desktop app built on Tauri embedding a static Next.js frontend with an ASP.NET Core (.NET 10) Web API — the entire stack runs offline. Strict DDD domain with 8 aggregates, 16 strongly-typed IDs and 7 domain events, covered by 304 domain unit tests and packaged into a portable .gdex export.",
    metrics: [
      { label: "TEST COVERAGE", value: "304 tests" },
      { label: "DOMAIN MODEL", value: "8 aggregates" },
    ],
    repo: "https://github.com/FadiFayezDev/GameDex",
    archTags: ["Clean Architecture", "Domain-Driven Design", "Strongly-Typed IDs", "Domain Events", "Value Objects"],
  },
]

export type SkillGroup = {
  /** section index, e.g. "01" */
  index: string
  /** short human label, e.g. "Backend & APIs" */
  label: string
  /** small mono category line over the group */
  tagline: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    index: "01",
    label: "Backend & APIs",
    tagline: "DOMAIN 01 // BACKEND & WEB",
    items: [
      "C#",
      ".NET 8 / 10",
      "ASP.NET Core Web API",
      "ASP.NET Core MVC",
      "RESTful APIs",
      "Entity Framework Core",
      "LINQ",
      "Dapper",
      "MediatR",
      "CQRS",
    ],
  },
  {
    index: "02",
    label: "Frontend",
    tagline: "DOMAIN 02 // FRONTEND & UI",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "jQuery",
    ],
  },
  {
    index: "03",
    label: "Databases & Data",
    tagline: "DOMAIN 03 // DATA & STORAGE",
    items: ["SQL", "SQL Server", "PostgreSQL", "SQLite", "MySQL"],
  },
  {
    index: "04",
    label: "Tools & Practices",
    tagline: "DOMAIN 04 // TOOLING",
    items: [
      "Git",
      "Docker",
      "Postman",
      "Visual Studio",
      "xUnit",
      "Tauri",
      "Agile Methodologies",
    ],
  },
]

export type DesignPractice = {
  name: string
  /** short qualifier shown after the name, e.g. "DDD", "MediatR" */
  detail?: string
}

/** How I structure systems — kept as data because the same list drives
 *  the "arch" command in the terminal. */
export const archStyles: DesignPractice[] = [
  { name: "Clean Architecture" },
  { name: "Domain-Driven Design", detail: "DDD" },
  { name: "Modular Monolith Architecture" },
  { name: "Layered Architecture" },
  { name: "Contract-Based Module Communication" },
]

export const designPatterns: DesignPractice[] = [
  { name: "CQRS", detail: "Command Query Responsibility Segregation" },
  { name: "Mediator Pattern", detail: "MediatR" },
  { name: "Repository Pattern" },
  { name: "Unit of Work Pattern" },
  { name: "Domain Model Pattern" },
]

export type Education = {
  degree: string
  school: string
  faculty: string
  specialization: string
  period: string
  grade: string
  highlights: string[]
}

export const education: Education = {
  degree: "MIS",
  school: "Helwan University",
  faculty: "Faculty of Commerce & Business Administration",
  specialization: "Management Information Systems",
  period: "09/2021 — 05/2025",
  grade: "Good (76.38%)",
  highlights: [
    "Relational database architectures & information systems analysis",
    "Business software engineering fundamentals",
    "Distributed networking fundamentals",
  ],
}

/** Links surfaced by `status` / `contact` in the terminal. */
export const onlineProfiles = [
  { label: "github  ", url: `https://github.com/${owner.github}`, text: `github.com/${owner.github}` },
  { label: "linkedin", url: `https://www.linkedin.com/in/${owner.linkedin}`, text: `linkedin.com/in/${owner.linkedin}` },
  { label: "web     ", url: `https://${owner.website}`, text: owner.website },
] as const
