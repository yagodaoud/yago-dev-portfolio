"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send } from "lucide-react"

export function Contact() {
    const t = useTranslations('Contact')

    return (
        <section id="contact" className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto"
                >
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold text-center">
                                {t('title')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col items-center gap-4 text-center mb-8">
                                <a
                                    href="mailto:yagodaouddev@gmail.com"
                                    className="flex items-center gap-2 text-xl text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <Mail className="w-6 h-6" />
                                    yagodaouddev@gmail.com
                                </a>
                            </div>

                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium">{t('name')}</label>
                                        <Input id="name" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">{t('email')}</label>
                                        <Input id="email" type="email" placeholder="john@example.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">{t('message')}</label>
                                    <Textarea id="message" placeholder="Hello..." className="min-h-[120px]" />
                                </div>
                                <Button type="submit" className="w-full gap-2">
                                    <Send className="w-4 h-4" />
                                    {t('send')}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}
