"use client"

import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Download, Terminal, ArrowRight } from "lucide-react"

export function Hero() {
    const t = useTranslations('Hero')
    const locale = useLocale()
    const cvHref = locale === 'pt' ? '/cv-pt.pdf' : '/cv-en.pdf'

    // Typing animation variants
    const typingContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    }

    const typingLetter = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">

            <div className="container mx-auto px-4 flex flex-col items-center text-center gap-8 z-10">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border/50 backdrop-blur-sm text-sm font-medium text-muted-foreground"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    {t('availableForWork')}
                </motion.div>

                {/* Main Text */}
                <div className="space-y-4">
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={typingContainer}
                        className="text-2xl md:text-3xl font-mono text-primary font-semibold"
                    >
                        {t('role').split("").map((char, index) => (
                            <motion.span key={index} variants={typingLetter}>
                                {char}
                            </motion.span>
                        ))}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
                    >
                        Yago Andrade<br className="hidden md:block" />
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed"
                    >
                        {t('description')}
                    </motion.p>
                </div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-col md:flex-row items-center gap-4 mt-4"
                >
                    <Button size="lg" className="h-12 px-8 text-base gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" asChild>
                        <a href="#contact">
                            <Mail className="w-4 h-4" />
                            {t('contactMe')}
                            <ArrowRight className="w-4 h-4 ml-1 opacity-70" />
                        </a>
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base gap-2 border-border/50 hover:bg-secondary/50 hover:border-primary/50 transition-all" asChild>
                        <a href={cvHref} download>
                            <Download className="w-4 h-4" />
                            {t('downloadCv')}
                        </a>
                    </Button>
                </motion.div>

                {/* Socials */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex items-center gap-6 mt-8 text-muted-foreground"
                >
                    <a href="https://github.com/yagodaoud" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:scale-110 transition-all">
                        <Github className="w-6 h-6" />
                    </a>
                    <a href="https://www.linkedin.com/in/yago-andrade-dev?locale=en_US" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:scale-110 transition-all">
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <div className="w-px h-6 bg-border/50" />
                    <Terminal className="w-6 h-6 opacity-50" />
                </motion.div>
            </div>
        </section>
    )
}