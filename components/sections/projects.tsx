"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Layers } from "lucide-react"
import { ProjectCard } from "@/components/projects/project-card"
import { ProjectData } from "@/components/projects/types"
import { MOCK_IMAGES, DEFAULT_IMAGES } from "@/components/projects/mock-data"

export function Projects() {
    const t = useTranslations('Projects')
    const rawProjects = t.raw('items') as any[]

    // Map raw data to ProjectData interface
    const projects: ProjectData[] = rawProjects.map((p) => ({
        title: p.title,
        description: p.description,
        tech: p.tech,
        metrics: p.metrics,
        images: MOCK_IMAGES[p.title] || DEFAULT_IMAGES
    }))

    return (
        <section id="projects" className="py-32 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center mb-20 text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-primary font-mono text-sm tracking-wider uppercase bg-primary/10 px-4 py-1.5 rounded-full"
                    >
                        <Layers size={14} />
                        Portfolio
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        {t('title')}
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        A selection of projects that demonstrate my passion for building scalable, user-centric solutions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}