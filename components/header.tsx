"use client"

import * as React from "react"
import { Link, usePathname, useRouter } from "@/i18n/routing"
import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Menu, X, Languages } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
    const t = useTranslations('Nav')
    const pathname = usePathname()
    const router = useRouter()
    const locale = useLocale()
    const [isOpen, setIsOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
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
                "fixed top-0 w-full z-50 transition-all duration-300 border-b",
                scrolled
                    ? "bg-background/70 backdrop-blur-xl border-border/40 shadow-sm py-2"
                    : "bg-transparent border-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="group flex items-center gap-1 text-xl font-bold tracking-tighter">
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md group-hover:bg-primary/90 transition-colors">Y</span>
                    <span className="text-foreground">ago</span>
                    <span className="text-primary">.dev</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                        </a>
                    ))}

                    <div className="h-6 w-px bg-border/50 mx-2" />

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleLanguage}
                            className="font-mono text-xs border border-border/50 h-9"
                        >
                            <Languages className="w-3 h-3 mr-2" />
                            {locale.toUpperCase()}
                        </Button>
                        <ThemeToggle />
                    </div>
                </nav>

                {/* Mobile Nav Toggle */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <button className="p-2" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden absolute top-[calc(100%+1px)] left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border/50 p-6 flex flex-col gap-4 shadow-2xl"
                >
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </a>
                    ))}
                    <hr className="border-border/50" />
                    <Button variant="outline" onClick={toggleLanguage} className="justify-between">
                        <span>{locale === 'pt' ? 'Mudar para Inglês' : 'Switch to Portuguese'}</span>
                        <Languages className="w-4 h-4" />
                    </Button>
                </motion.div>
            )}
        </header>
    )
}