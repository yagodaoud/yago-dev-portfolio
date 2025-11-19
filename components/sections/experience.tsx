"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Experience() {
    const t = useTranslations('Experience')
    const jobs = t.raw('jobs') as any[]

    return (
        <section id="experience" className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    {t('title')}
                </h2>
                <div className="max-w-3xl mx-auto space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary before:to-transparent">
                    {jobs.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                        >
                            {/* Dot on the line */}
                            <div className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full border-4 border-background bg-primary flex items-center justify-center shadow-lg z-10 md:-translate-x-1/2">
                                <div className="w-3 h-3 rounded-full bg-white" />
                            </div>

                            {/* Content Card */}
                            <Card className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] ml-12 md:ml-0 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
                                <CardHeader>
                                    <div className="flex flex-col gap-1">
                                        <CardTitle className="text-xl font-bold text-primary">
                                            {job.role}
                                        </CardTitle>
                                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                                            <span className="font-semibold text-foreground">{job.company}</span>
                                            <span>{job.period}</span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {job.description && job.description.length > 0 && (
                                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                            {job.description.map((desc: string, i: number) => (
                                                <li key={i}>{desc}</li>
                                            ))}
                                        </ul>
                                    )}
                                    <div className="flex flex-wrap gap-2">
                                        {job.tech.map((tech: string) => (
                                            <Badge key={tech} variant="secondary" className="text-xs">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
