"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxSectionProps {
    children: ReactNode;
    speed?: number;
    className?: string;
}

/**
 * Section with parallax scrolling effect
 * @param speed Multiplier for parallax speed (0.5 = slower, 1.5 = faster)
 */
export function ParallaxSection({
    children,
    speed = 0.5,
    className = "",
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

    return (
        <div ref={ref} className={className}>
            <motion.div style={{ y }}>{children}</motion.div>
        </div>
    );
}
