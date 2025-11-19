"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Projects() {
    const t = useTranslations('Projects')
    const projects = t.raw('items') as any[]

    return (
        <section id="projects" className="py-20 bg-secondary/5">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    {t('title')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="h-full"
                        >
                            <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 overflow-hidden group">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                                        {project.title}
                                    </CardTitle>
                                    <CardDescription className="text-base">
                                        {project.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-4">
                                    <p className="text-sm text-muted-foreground">
                                        {project.metrics}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech: string) => (
                                            <Badge key={tech} variant="outline" className="text-xs">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
