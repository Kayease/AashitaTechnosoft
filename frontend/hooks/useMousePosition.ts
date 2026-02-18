"use client";

import { useState, useEffect, useCallback, RefObject } from "react";

interface MousePosition {
    x: number;
    y: number;
    normalizedX: number;
    normalizedY: number;
}

/**
 * Custom hook to track mouse position
 * Returns both absolute and normalized (-1 to 1) coordinates
 */
export function useMousePosition(
    containerRef?: any
): MousePosition {
    const [position, setPosition] = useState<MousePosition>({
        x: 0,
        y: 0,
        normalizedX: 0,
        normalizedY: 0,
    });

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            const container = containerRef?.current;

            if (container) {
                const rect = container.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const normalizedX = (x / rect.width) * 2 - 1;
                const normalizedY = (y / rect.height) * 2 - 1;

                setPosition({ x, y, normalizedX, normalizedY });
            } else {
                const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
                const normalizedY = (event.clientY / window.innerHeight) * 2 - 1;

                setPosition({
                    x: event.clientX,
                    y: event.clientY,
                    normalizedX,
                    normalizedY,
                });
            }
        },
        [containerRef]
    );

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [handleMouseMove]);

    return position;
}
