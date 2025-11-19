"use client"

import { motion, useMotionTemplate, MotionValue } from "framer-motion"

export function Spotlight({ mouseX, mouseY }: { mouseX: MotionValue<number>; mouseY: MotionValue<number> }) {
    const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`
    const style = { maskImage, WebkitMaskImage: maskImage }

    return (
        <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-20"
            style={style}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-50 blur-xl" />
            <div className="absolute inset-0 border-2 border-primary/50 rounded-xl" />
        </motion.div>
    )
}
