"use client";

import { motion } from "framer-motion";

interface BlurRevealProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
}

/**
 * Premium text reveal animation using blur and staggered opacity.
 * Words slide up and unblur for a modern, high-end feel.
 */
export function BlurReveal({ text, className = "", delay = 0, duration = 0.5 }: BlurRevealProps) {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: delay,
            },
        },
    };

    const child = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(10px)",
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: duration,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className={`inline-block ${className}`}
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    key={index}
                    className="inline-block mr-[0.25em] last:mr-0"
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}
