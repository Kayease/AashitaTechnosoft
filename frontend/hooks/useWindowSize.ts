"use client";

import { useState, useEffect } from "react";
import { BREAKPOINTS } from "@/constants";

interface WindowSize {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

/**
 * Custom hook to track window size and device type
 */
export function useWindowSize(): WindowSize {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: 0,
        height: 0,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
    });

    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            const height = window.innerHeight;

            setWindowSize({
                width,
                height,
                isMobile: width < BREAKPOINTS.tablet,
                isTablet: width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop,
                isDesktop: width >= BREAKPOINTS.desktop,
            });
        }

        // Set initial size
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}
