"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingIconProps {
    x: number;
    y: number;
    delay: number;
    duration: number;
    size?: number;
    iconType: "chip" | "gear" | "circuit";
    mouseX: number;
    mouseY: number;
}

const TechIcon = ({ type, className }: { type: "chip" | "gear" | "circuit"; className?: string }) => {
    if (type === "chip") {
        return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                <rect x="8" y="8" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <path d="M6 10h2M6 14h2M16 10h2M16 14h2M10 6v2M14 6v2M10 16v2M14 16v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        );
    }

    if (type === "gear") {
        return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 1v3m0 16v3M4.22 4.22l2.12 2.12m11.32 11.32l2.12 2.12M1 12h3m16 0h3M4.22 19.78l2.12-2.12m11.32-11.32l2.12-2.12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <circle cx="6" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="18" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
};

export function FloatingRobot({ x, y, delay, duration, size = 40, iconType, mouseX, mouseY }: FloatingIconProps) {
    const [elementPos, setElementPos] = useState({ x: 0, y: 0 });

    const offsetX = useMotionValue(0);
    const offsetY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150 };
    const springX = useSpring(offsetX, springConfig);
    const springY = useSpring(offsetY, springConfig);

    // Assign colors based on icon type - matching the new blue/cyan layout theme
    const iconColor = iconType === "chip"
        ? "text-brand-blue/40"
        : iconType === "gear"
            ? "text-brand-navy/30"
            : "text-brand-cyan/40";

    useEffect(() => {
        if (typeof window === "undefined") return;

        const viewportX = (x / 100) * window.innerWidth;
        const viewportY = (y / 100) * window.innerHeight;

        const dx = mouseX - viewportX;
        const dy = mouseY - viewportY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const pushDistance = 150;

        if (distance < pushDistance && distance > 0) {
            const force = (pushDistance - distance) / pushDistance;
            const pushX = -(dx / distance) * force * 80;
            const pushY = -(dy / distance) * force * 80;

            offsetX.set(pushX);
            offsetY.set(pushY);
        } else {
            offsetX.set(0);
            offsetY.set(0);
        }
    }, [mouseX, mouseY, x, y, offsetX, offsetY]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: [0.25, 0.45, 0.25],
                y: [0, -15, 0],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className="absolute pointer-events-none"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width: size,
                height: size,
                x: springX,
                y: springY,
            }}
        >
            <TechIcon type={iconType} className={`w-full h-full ${iconColor}`} />
        </motion.div>
    );
}
