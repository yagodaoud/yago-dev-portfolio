"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export function About() {
    const t = useTranslations('About')

    return (
        <section id="about" className="py-20 bg-secondary/5">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto space-y-8"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-center">
                        {t('title')}
                    </h2>
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                        <CardContent className="p-8 text-lg leading-relaxed text-muted-foreground text-center">
                            {t('content')}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}
