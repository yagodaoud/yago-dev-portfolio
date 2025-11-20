"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react"
import { ProjectData } from "./types"
import { Badge } from "@/components/ui/badge"

interface ProjectModalProps {
    project: ProjectData
    isOpen: boolean
    onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // Reset image index when modal opens
    useEffect(() => {
        if (isOpen) setCurrentImageIndex(0)
    }, [isOpen])

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    const nextImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation()
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
    }, [project.images.length])

    const prevImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation()
        setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
    }, [project.images.length])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowRight") nextImage()
            if (e.key === "ArrowLeft") prevImage()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, onClose, nextImage, prevImage])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-5xl h-[90vh] max-h-[800px] bg-card border border-border/50 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col md:flex-row"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-primary text-white rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Image Section (Left/Top) */}
                        <div className="w-full md:w-2/3 h-[50%] md:h-full relative bg-black/90 flex items-center justify-center overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImageIndex}
                                    src={project.images[currentImageIndex]}
                                    alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                                    className="max-w-full max-h-full object-contain"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </AnimatePresence>

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-primary text-white rounded-full transition-colors backdrop-blur-sm"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-primary text-white rounded-full transition-colors backdrop-blur-sm"
                            >
                                <ChevronRight size={24} />
                            </button>

                            {/* Pagination Dots */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                {project.images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? "bg-primary w-8" : "bg-white/50 hover:bg-white"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Content Section (Right/Bottom) */}
                        <div className="w-full md:w-1/3 h-[50%] md:h-full bg-card p-6 md:p-8 overflow-y-auto flex flex-col">
                            <div className="mb-6">
                                <h2 className="text-3xl font-bold mb-2 text-foreground">{project.title}</h2>
                                <div className="w-16 h-1 bg-primary rounded-full mb-4" />
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            <div className="space-y-6 flex-grow">
                                <div>
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                                        Technologies
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech) => (
                                            <Badge key={tech} variant="secondary" className="px-3 py-1">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                                        Key Metrics
                                    </h3>
                                    <div className="p-4 bg-secondary/20 rounded-xl border border-border/50">
                                        <p className="text-foreground font-medium italic">
                                            "{project.metrics}"
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-border/50 flex flex-col gap-3">
                                {project.repoUrl && (
                                    <a
                                        href={project.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors font-medium"
                                    >
                                        <Github size={20} />
                                        View Source Code
                                    </a>
                                )}
                                {project.demoUrl && (
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full p-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                                    >
                                        <ExternalLink size={20} />
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
