"use client"

import { useState, MouseEvent } from "react"
import { motion, AnimatePresence, useMotionValue } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Folder, ExternalLink, ChevronLeft, ChevronRight, Code2, BarChart3, Github } from "lucide-react"
import { ProjectData } from "./types"
import { Spotlight } from "./spotlight"
import { ProjectModal } from "./project-modal"
import { useTranslations } from "next-intl"

export function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
    const t = useTranslations('Projects')
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [showModal, setShowModal] = useState(false)

    // Mouse position for spotlight effect
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
    }

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
    }

    const isComandae = project.title === "Comandaê"

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-full cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setShowModal(true)}
            >
                {/* Spotlight Effect */}
                <Spotlight mouseX={mouseX} mouseY={mouseY} />

                <Card className="h-full flex flex-col overflow-hidden bg-card/40 backdrop-blur-md border-border/50 relative z-10 transition-colors duration-500 group-hover:border-primary/30">

                    {/* Top 60% - Image Carousel */}
                    <div className="relative h-64 md:h-72 w-full overflow-hidden bg-white dark:bg-black transition-colors duration-300">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={project.images[currentImageIndex]}
                                alt={`${project.title} preview ${currentImageIndex + 1}`}
                                className={`absolute inset-0 w-full h-full ${isComandae ? 'object-contain p-4' : 'object-cover'}`}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{
                                    opacity: 1,
                                    scale: isHovered && !isComandae ? 1.05 : 1
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            />
                        </AnimatePresence>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

                        {/* Navigation Arrows - Visible on Hover or Mobile */}
                        <div className="absolute inset-0 flex items-center justify-between p-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={prevImage}
                                className="p-2 rounded-full bg-black/50 text-white hover:bg-primary/80 transition-colors backdrop-blur-sm cursor-pointer"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="p-2 rounded-full bg-black/50 text-white hover:bg-primary/80 transition-colors backdrop-blur-sm cursor-pointer"
                                aria-label="Next image"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Pagination Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                            {project.images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setCurrentImageIndex(idx)
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex
                                        ? "bg-primary w-6"
                                        : "bg-white/50 hover:bg-white"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Bottom 40% - Content */}
                    <div className="flex flex-col flex-grow p-6">
                        <CardHeader className="p-0 mb-4">
                            {/* Top row: Project badge (left) and GitHub icon (right) */}
                            <div className="flex justify-between items-center mb-3">
                                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                    <Folder size={12} className="mr-1" />
                                    {t('projectBadge')}
                                </Badge>
                                {project.repoUrl && (
                                    <a
                                        href={project.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-primary transition-colors z-20"
                                        onClick={(e) => e.stopPropagation()}
                                        aria-label="View GitHub repository"
                                    >
                                        <Github size={20} />
                                    </a>
                                )}
                            </div>

                            {/* Title row */}
                            <div className="flex justify-between items-start mb-2">
                                <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                                    {project.title}
                                </CardTitle>
                            </div>
                            <CardDescription className="line-clamp-2 mt-2 text-base">
                                {project.description}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-0 flex-grow space-y-4">
                            <div className="flex items-start gap-2 text-sm text-muted-foreground bg-secondary/20 p-3 rounded-lg border border-border/50">
                                <BarChart3 size={18} className="mt-0.5 text-primary shrink-0" />
                                <span className="italic">{project.metrics}</span>
                            </div>
                        </CardContent>

                        <CardFooter className="p-0 mt-6 pt-4 border-t border-border/50">
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech, idx) => (
                                    <motion.div
                                        key={tech}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + (idx * 0.05) }}
                                    >
                                        <Badge
                                            variant="secondary"
                                            className="bg-secondary/50 hover:bg-primary/20 transition-colors text-xs font-mono border border-transparent hover:border-primary/30"
                                        >
                                            {tech}
                                        </Badge>
                                    </motion.div>
                                ))}
                            </div>
                        </CardFooter>
                    </div>
                </Card>
            </motion.div>

            <ProjectModal
                project={project}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    )
}
