"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Folder, ExternalLink, ArrowUpRight } from "lucide-react"

export function Projects() {
    const t = useTranslations('Projects')
    const projects = t.raw('items') as any[]

    return (
        <section id="projects" className="py-32 relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center mb-16 text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-mono text-sm tracking-wider uppercase"
                    >
                        Portfolio
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        {t('title')}
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="h-full group"
                        >
                            <Card className="h-full flex flex-col bg-card/40 backdrop-blur-md border border-border/50 hover:border-primary/40 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-primary/10 relative">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <CardHeader className="relative z-10">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                            <Folder size={20} />
                                        </div>
                                        <ExternalLink className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
                                    </div>
                                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                                        {project.title}
                                    </CardTitle>
                                    <CardDescription className="text-base pt-2">
                                        {project.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="flex-grow space-y-6 relative z-10">
                                    <p className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-4 italic">
                                        "{project.metrics}"
                                    </p>
                                </CardContent>

                                <CardFooter className="relative z-10 pt-0">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech: string) => (
                                            <Badge
                                                key={tech}
                                                variant="secondary"
                                                className="bg-secondary/50 hover:bg-primary/20 transition-colors text-xs font-mono"
                                            >
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}