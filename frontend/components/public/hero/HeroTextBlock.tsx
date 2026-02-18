"use client";

import { motion } from "framer-motion";
import { HERO_CONTENT } from "@/constants";
import { BlurReveal } from "@/components/ui/BlurReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function HeroTextBlock() {
    return (
        <div className="space-y-6 md:space-y-8 max-w-2xl">
            {/* Headline - Two Lines with Premium Blur Reveal */}
            <div className="relative">
                {/* 1. Radial Gradient Glow for Depth */}
                <div className="absolute -left-20 -top-20 w-[140%] h-[140%] bg-blue-400/20 blur-[100px] rounded-full opacity-50 pointer-events-none" />
                
                <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-brand-navy">
                    <div className="overflow-hidden pb-4 -mb-4 px-1">
                        <BlurReveal
                            text={HERO_CONTENT.headline.line1}
                            delay={0.2}
                            className="block"
                        />
                    </div>
                    <motion.span
                        initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-blue bg-[length:200%_auto] animate-gradient"
                    >
                        {HERO_CONTENT.headline.line2}
                    </motion.span>
                </h1>
            </div>

            {/* Subtext with Locations */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 pt-2"
            >
                <p className="text-base md:text-lg text-brand-navy font-semibold tracking-wide">
                    {HERO_CONTENT.subtext}
                </p>

                {/* Location Badges */}
                <div className="flex flex-wrap gap-3 items-center">
                    {HERO_CONTENT.locations.map((location, index) => (
                        <motion.span
                            key={location}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -2, scale: 1.05 }}
                            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                            className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-blue/5 to-brand-cyan/5 border border-brand-blue/20 text-brand-navy font-semibold text-sm md:text-base cursor-default hover:border-brand-blue/50 hover:shadow-lg hover:shadow-brand-blue/10 hover:bg-white transition-all duration-300"
                        >
                            {location}
                        </motion.span>
                    ))}
                </div>

                <p className="text-sm md:text-base text-brand-navy/60">
                    {HERO_CONTENT.tagline}
                </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4 mt-8"
            >
                <MagneticButton>
                    <button className="bg-brand-blue text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-brand-blue/30 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                        {HERO_CONTENT.ctaText}
                        <span>→</span>
                    </button>
                </MagneticButton>
            </motion.div>
        </div>
    );
}
