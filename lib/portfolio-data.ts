export type HeroData = {
  name: string;
  role: string;
  summary: string;
  coverImage: string;
  myPhoto: string;
  ctaLabel: string;
  ctaHref: string;
};

export type Project = {
  title: string;
  description: string;
  image?: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type ContactLink = {
  label: string;
  href: string;
};

const buildFix = '.';

export const portfolio = {
  hero: {
    name: "Fadi Fayez",
    role: ".NET Full-Stack Developer | Next.js | UI/UX",
    summary:
      "I design and build clean, high-performance web products with strong backend architecture and modern frontend experience.",
    coverImage: `${buildFix}/profile-cover.jpg`,
    myPhoto: `${buildFix}/MyPhoto.jpg`,
    ctaLabel: "View My Work",
    ctaHref: "#works",
  } satisfies HeroData,
  projects: [
    {
      title: "Stocka",
      description: "Inventory and sales platform with robust APIs and analytics dashboards.",
      image: `${buildFix}/MyWorks/stocka.png`,
      tech: ["ASP.NET Core", "SQL Server", "Next.js"],
      liveUrl: "#",
      repoUrl: "#",
    },
  ] satisfies Project[],
  skillGroups: [
    {
      label: "Backend",
      items: ["ASP.NET Core", "Web API", "Entity Framework", "Dapper", "Authentication"],
    },
    {
      label: "Frontend",
      items: ["Next.js", "React", "TypeScript", "Tailwind CSS", `HTML/CSS`],
    },
    {
      label: "Database",
      items: ["SQL Server", "PostgreSQL", "SQLite", "Query Optimization"],
    },
    {
      label: "Tools",
      items: ["Git", "Docker", "Postman", "Figma"],
    },
  ] satisfies SkillGroup[],
  contactLinks: [
    { label: "Email", href: "fadyfayez.nt@gmail.com" },
    { label: "GitHub", href: "https://github.com/FadiFayezDev" },
    { label: "LinkedIn", href: "https://linkedin.com/in/FadiFayezDev" },
  ] satisfies ContactLink[],
};
