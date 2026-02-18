"use client";

import { ReactNode } from "react";

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

/**
 * Bento grid container with responsive layout
 */
export function BentoGrid({ children, className = "" }: BentoGridProps) {
    return (
        <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[240px] gap-4 md:gap-6 ${className}`}
        >
            {children}
        </div>
    );
}

type BentoSize = "1x1" | "1x2" | "2x1" | "2x2";

interface BentoCardProps {
    children: ReactNode;
    size?: BentoSize;
    className?: string;
}

const sizeClasses: Record<BentoSize, string> = {
    "1x1": "md:col-span-1 md:row-span-1",
    "1x2": "md:col-span-1 md:row-span-2",
    "2x1": "md:col-span-2 md:row-span-1",
    "2x2": "md:col-span-2 md:row-span-2",
};

/**
 * Individual bento grid card with flexible sizing
 */
export function BentoCard({ children, size = "1x1", className = "" }: BentoCardProps) {
    return <div className={`${sizeClasses[size]} ${className}`}>{children}</div>;
}
