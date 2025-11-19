"use client"

import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Download } from "lucide-react"

export function Hero() {
    const t = useTranslations('Hero')
    const locale = useLocale()
    const cvHref = locale === 'pt' ? '/cv-pt.pdf' : '/cv-en.pdf'

    return (
        <section className="min-h-screen flex items-center justify-center pt-16">
            <div className="container mx-auto px-4 flex flex-col items-center text-center gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/20"
                >
                    <div className="w-full h-full bg-gradient-to-br from-primary to-purple-600" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-4"
                >
                    <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">
                        {t('role')}
                    </h2>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
                        Yago Andrade <span className="text-gradient">Daoud</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
                        {t('description')}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <Button size="lg" className="gap-2" asChild>
                        <a href="#contact">
                            <Mail className="w-4 h-4" />
                            {t('contactMe')}
                        </a>
                    </Button>
                    <Button size="lg" variant="outline" className="gap-2" asChild>
                        <a href={cvHref} download>
                            <Download className="w-4 h-4" />
                            {t('downloadCv')}
                        </a>
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center gap-6 text-muted-foreground"
                >
                    <a href="https://github.com/yagodaoud" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        <Github className="w-6 h-6" />
                    </a>
                    <a href="https://www.linkedin.com/in/yago-andrade-dev?locale=en_US" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        <Linkedin className="w-6 h-6" />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
