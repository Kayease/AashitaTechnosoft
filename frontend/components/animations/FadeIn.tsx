"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface FadeInProps {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    duration?: number;
    className?: string;
}

/**
 * Wrapper component for scroll-triggered fade-in animations
 */
export function FadeIn({
    children,
    direction = "up",
    delay = 0,
    duration = 0.6,
    className = "",
}: FadeInProps) {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

    const directions = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 },
    };

    const initial = {
        opacity: 0,
        ...directions[direction],
    };

    const animate = isVisible
        ? {
            opacity: 1,
            x: 0,
            y: 0,
        }
        : initial;

    return (
        <motion.div
            ref={ref as any}
            initial={initial}
            animate={animate}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
