"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { useState } from "react"

export function Contact() {
    const t = useTranslations('Contact')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMessage('')

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error('Failed to send email')
            }

            setStatus('success')
            setFormData({ name: '', email: '', message: '' })

            // Reset success message after 5 seconds
            setTimeout(() => setStatus('idle'), 5000)
        } catch (error) {
            setStatus('error')
            setErrorMessage('Failed to send message. Please try again or email directly.')
        }
    }

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

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium">{t('name')}</label>
                                        <Input
                                            id="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            disabled={status === 'loading'}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">{t('email')}</label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            disabled={status === 'loading'}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">{t('message')}</label>
                                    <Textarea
                                        id="message"
                                        placeholder="Hello..."
                                        className="min-h-[120px]"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        disabled={status === 'loading'}
                                    />
                                </div>

                                {status === 'success' && (
                                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 p-3 rounded-md">
                                        <CheckCircle2 className="w-5 h-5" />
                                        <p className="text-sm">{t('success')}</p>
                                    </div>
                                )}

                                {status === 'error' && (
                                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-3 rounded-md">
                                        <AlertCircle className="w-5 h-5" />
                                        <p className="text-sm">{errorMessage}</p>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full gap-2 cursor-pointer"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                    {status === 'loading' ? t('loading') : t('send')}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}
