"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <Button variant="ghost" size="icon" className="w-9 h-9" />
    }

    const isDark = resolvedTheme === "dark"

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative w-9 h-9 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm hover:bg-accent hover:border-primary/50 transition-colors cursor-pointer overflow-hidden"
        >
            <motion.div
                initial={false}
                animate={{
                    scale: isDark ? 0 : 1,
                    rotate: isDark ? -90 : 0,
                    opacity: isDark ? 0 : 1
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            </motion.div>

            <motion.div
                initial={false}
                animate={{
                    scale: isDark ? 1 : 0,
                    rotate: isDark ? 0 : 90,
                    opacity: isDark ? 1 : 0
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <Moon className="h-[1.2rem] w-[1.2rem] text-primary" />
            </motion.div>
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}