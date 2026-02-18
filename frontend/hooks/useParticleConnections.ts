"use client";

import { useCallback, useRef, RefObject } from "react";
import { ANIMATION_CONFIG, BRAND_COLORS } from "@/constants";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
}

interface UseParticleConnectionsProps {
    canvasRef: RefObject<HTMLCanvasElement | null>;
    mouseX: number;
    mouseY: number;
    isMobile: boolean;
}

/**
 * Custom hook to manage particle system with connection lines
 * CPU-optimized Canvas 2D implementation
 */
export function useParticleConnections({
    canvasRef,
    mouseX,
    mouseY,
    isMobile,
}: UseParticleConnectionsProps) {
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number | null>(null);
    const { connectionDistance, speed, baseRadius, glowRadius } = ANIMATION_CONFIG.particle;
    const particleCount = isMobile ? ANIMATION_CONFIG.particle.mobileCount : ANIMATION_CONFIG.particle.count;

    const initParticles = useCallback((width: number, height: number) => {
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * speed,
            vy: (Math.random() - 0.5) * speed,
            radius: baseRadius + Math.random() * 2,
            opacity: 0.3 + Math.random() * 0.5,
        }));
    }, [particleCount, speed, baseRadius]);

    const drawParticles = useCallback(
        (ctx: CanvasRenderingContext2D, width: number, height: number) => {
            ctx.clearRect(0, 0, width, height);
            const particles = particlesRef.current;

            // Update and draw particles
            particles.forEach((particle) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > height) particle.vy *= -1;

                // Keep in bounds
                particle.x = Math.max(0, Math.min(width, particle.x));
                particle.y = Math.max(0, Math.min(height, particle.y));

                // Draw glow
                const gradient = ctx.createRadialGradient(
                    particle.x,
                    particle.y,
                    0,
                    particle.x,
                    particle.y,
                    glowRadius * 2
                );
                gradient.addColorStop(0, `rgba(37, 99, 235, ${particle.opacity * 0.8})`);
                gradient.addColorStop(0.5, `rgba(47, 183, 196, ${particle.opacity * 0.4})`);
                gradient.addColorStop(1, "rgba(37, 99, 235, 0)");

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, glowRadius * 2, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Draw core
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(37, 99, 235, ${particle.opacity * 0.6})`;
                ctx.fill();
            });

            // Draw connections near mouse
            particles.forEach((p1, i) => {
                // Mouse proximity connections
                const distToMouse = Math.sqrt(
                    Math.pow(p1.x - mouseX, 2) + Math.pow(p1.y - mouseY, 2)
                );

                if (distToMouse < connectionDistance * 0.8) {
                    particles.slice(i + 1).forEach((p2) => {
                        const dist = Math.sqrt(
                            Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
                        );

                        if (dist < connectionDistance) {
                            const opacity = (1 - dist / connectionDistance) * 0.3;
                            ctx.beginPath();
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    });
                }
            });
        },
        [mouseX, mouseY, connectionDistance, glowRadius]
    );

    const startAnimation = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        const animate = () => {
            drawParticles(ctx, width, height);
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();
    }, [canvasRef, drawParticles]);

    const stopAnimation = useCallback(() => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
    }, []);

    return {
        initParticles,
        startAnimation,
        stopAnimation,
        particles: particlesRef.current,
    };
}
