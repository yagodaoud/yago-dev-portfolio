"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useSpring } from "framer-motion"

export function SpotlightBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    // Use springs for smooth movement
    const smoothX = useSpring(0, { damping: 20, stiffness: 100 })
    const smoothY = useSpring(0, { damping: 20, stiffness: 100 })

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            smoothX.set(e.clientX)
            smoothY.set(e.clientY)
        }

        window.addEventListener("mousemove", updateMousePosition)
        return () => window.removeEventListener("mousemove", updateMousePosition)
    }, [smoothX, smoothY])

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] dark:opacity-[0.2]" />

            {/* Dynamic Spotlight */}
            <motion.div
                className="absolute w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_var(--spotlight),_transparent_70%)] rounded-full blur-3xl"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            {/* Ambient Glows for "Outstanding" feel */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-20 animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] opacity-20" />
        </div>
    )
}