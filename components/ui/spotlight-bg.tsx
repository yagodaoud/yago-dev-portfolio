"use client"

import { useEffect, useState } from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"

const codeSnippets = [
    '<Code />',
    '{ API }',
    'async fn()',
    '<Dev />',
    '() => {}',
    'const x',
    'import *',
    'export {}',
    'return <>',
    'interface',
    'class {}',
    'function',
    '[] map',
    'Promise',
    'enum',
    'await',
    'useState',
    'useEffect',
    'React',
]

export function SpotlightBackground() {
    const [mounted, setMounted] = useState(false)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    useEffect(() => {
        setMounted(true)

        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }

        window.addEventListener("mousemove", updateMousePosition)
        return () => window.removeEventListener("mousemove", updateMousePosition)
    }, [mouseX, mouseY])

    // Generate random positions for code snippets
    const snippetPositions = mounted ? codeSnippets.map((_, i) => ({
        top: `${(i * 37) % 90}%`,
        left: `${(i * 43) % 90}%`,
        rotation: (i * 23) % 30 - 15,
        delay: i * 0.1,
    })) : []

    const background = useMotionTemplate`
        radial-gradient(
            circle 600px at ${mouseX}px ${mouseY}px,
            var(--spotlight),
            transparent 80%
        )
    `

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] dark:opacity-[0.2]" />

            {/* Code Snippets Background */}
            {mounted && snippetPositions.map((pos, i) => (
                <motion.div
                    key={i}
                    className="absolute font-mono text-4xl md:text-5xl lg:text-6xl font-bold opacity-[0.02] dark:opacity-[0.04] select-none"
                    style={{
                        top: pos.top,
                        left: pos.left,
                        rotate: pos.rotation,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: [0.02, 0.04, 0.02],
                        scale: 1
                    }}
                    transition={{
                        opacity: {
                            duration: 4,
                            repeat: Infinity,
                            delay: pos.delay
                        },
                        scale: {
                            duration: 1,
                            delay: pos.delay
                        }
                    }}
                >
                    {codeSnippets[i]}
                </motion.div>
            ))}

            {/* Cursor-following Spotlight */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background,
                }}
            />

            {/* Ambient Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 dark:bg-primary/20 rounded-full blur-[120px] opacity-30 animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[100px] opacity-30 animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }} />
        </div>
    )
}