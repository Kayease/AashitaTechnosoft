"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number; // How strong the magnetic pull is (higher = more movement)
    onClick?: () => void;
}

export function MagneticButton({
    children,
    className = "",
    strength = 0.5,
    onClick,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for the movement
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();

        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        x.set(middleX * strength);
        y.set(middleY * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={`inline-block cursor-pointer ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}
