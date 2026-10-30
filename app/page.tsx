import TerminalHero from "@/components/terminal-hero"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ArchSection } from "@/components/arch-section"

export default function Page() {
  return (
    <main>
      <TerminalHero />
      <ProjectsSection />
      <SkillsSection />
      <ArchSection />
    </main>
  )
}
