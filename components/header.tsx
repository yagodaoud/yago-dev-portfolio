"use client"

import * as React from "react"
import { Link, usePathname, useRouter } from "@/i18n/routing"
import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
    const t = useTranslations('Nav')
    const pathname = usePathname()
    const router = useRouter()
    const locale = useLocale()
    const [isOpen, setIsOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const toggleLanguage = () => {
        const nextLocale = locale === 'pt' ? 'en' : 'pt'
        router.replace(pathname, { locale: nextLocale })
    }

    const navItems = [
        { name: t('about'), href: '#about' },
        { name: t('experience'), href: '#experience' },
        { name: t('projects'), href: '#projects' },
        { name: t('contact'), href: '#contact' },
    ]

    return (
        <header
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50" : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tighter hover:text-primary transition-colors">
                    Yago<span className="text-primary">.dev</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            {item.name}
                        </a>
                    ))}
                    <Button variant="ghost" size="sm" onClick={toggleLanguage} className="font-mono">
                        {locale === 'pt' ? 'EN' : 'PT'}
                    </Button>
                </nav>

                {/* Mobile Nav Toggle */}
                <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border/50 p-4 flex flex-col gap-4"
                >
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </a>
                    ))}
                    <Button variant="ghost" size="sm" onClick={toggleLanguage} className="justify-start font-mono">
                        Switch to {locale === 'pt' ? 'English' : 'Português'}
                    </Button>
                </motion.div>
            )}
        </header>
    )
}
