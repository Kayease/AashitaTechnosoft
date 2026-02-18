"use client";

import { FloatingRobotsBackground } from "@/components/public/background/FloatingRobotsBackground";
import { HeroTextBlock } from "./HeroTextBlock";
import { HeroVisualBlock } from "./HeroVisualBlock";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroContainer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse move for holographic spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* --- HOLOGRAPHIC GRID BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Base Grid Layer */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0B2D5C 1px, transparent 1px),
              linear-gradient(to bottom, #0B2D5C 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)' // Fade out at bottom
          }}
        />

        {/* Interactive Spotlight Grid Layer (Reveal effect) */}
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #2563EB 1px, transparent 1px),
              linear-gradient(to bottom, #2563EB 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
            WebkitMaskImage: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          }}
        />
        
        {/* Holographic Sheen Animation */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
             <div className="absolute top-0 -left-1/2 w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-cyan-100/20 to-transparent animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        </div>
      </div>

      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/50 opacity-60 z-0" />

      {/* Decorative Orbs (Reduced intensity) */}
      <div
        className="absolute top-20 right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ animationDuration: "8s" }}
      />
      <div
        className="absolute bottom-40 left-20 w-72 h-72 bg-cyan-100 rounded-full blur-3xl opacity-10 animate-pulse"
        style={{ animationDuration: "10s" }}
      />

      {/* Floating Animated Background */}
      <FloatingRobotsBackground />

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Grid Layout - Increased top padding to compensate for floating navbar */}
        <div className="flex-1 container mx-auto px-6 md:px-12 lg:px-16 pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
            {/* Left: Large Text Block */}
            <div className="flex items-center">
              <HeroTextBlock />
            </div>

            {/* Right: Visual Element with Text Below */}
            <div className="flex flex-col justify-center space-y-8">
              <HeroVisualBlock />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
