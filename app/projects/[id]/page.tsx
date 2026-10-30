import { notFound } from "next/navigation"
import { projects } from "@/lib/portfolio"
import {
  projectContent,
  readProjectMarkdown,
  renderProjectMarkdown,
} from "@/lib/projects-content"
import { ProjectDetail } from "@/components/project-detail"

/** Static build loads every registered project page. */
export function generateStaticParams() {
  return Object.keys(projectContent).map((id) => ({ id }))
}

export const dynamicParams = false

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) notFound()

  const registry = projectContent[id]
  const sections = (registry?.sections ?? []).map((s) => {
    const md = readProjectMarkdown(id, s.file)
    return { ...s, html: renderProjectMarkdown(md) }
  })

  return <ProjectDetail project={project} sections={sections} />
}
