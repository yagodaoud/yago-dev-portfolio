"use client"

import { motion, MotionValue, useMotionTemplate } from "framer-motion"

export function Spotlight({ mouseX, mouseY }: { mouseX: MotionValue<number>; mouseY: MotionValue<number> }) {
    return (
        <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-30"
            style={{
                background: useMotionTemplate`
          radial-gradient(
            circle 650px at ${mouseX}px ${mouseY}px,
            var(--spotlight),
            transparent 80%
          )
        `,
            }}
        />
    )
}
