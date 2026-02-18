"use client";

import { useEffect, useRef } from "react";
import { useMousePosition, useParticleConnections, useWindowSize } from "@/hooks";

export function ParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { x: mouseX, y: mouseY } = useMousePosition();
    const { isMobile, width, height } = useWindowSize();

    const { initParticles, startAnimation, stopAnimation } = useParticleConnections({
        canvasRef,
        mouseX,
        mouseY,
        isMobile,
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const resizeCanvas = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            initParticles(rect.width, rect.height);
        };

        resizeCanvas();
        startAnimation();

        window.addEventListener("resize", resizeCanvas);
        return () => {
            stopAnimation();
            window.removeEventListener("resize", resizeCanvas);
        };
    }, [initParticles, startAnimation, stopAnimation]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none"
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />
            {/* Gradient overlays removed for white theme */}
        </div>
    );
}
