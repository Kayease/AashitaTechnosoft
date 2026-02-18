"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageHeroProps {
    title: string;
    subtitle?: string;
    children?: ReactNode;
}

/**
 * Reusable page hero section for public pages
 */
export function PageHero({ title, subtitle, children }: PageHeroProps) {
    return (
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-brand-light">
            {/* Background Elements */}
            <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-brand-cyan/5 blur-3xl" />
            <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-brand-blue/5 blur-3xl" />

            <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy mb-4"
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-brand-navy/70 max-w-2xl mx-auto"
                    >
                        {subtitle}
                    </motion.p>
                )}

                {children && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-8"
                    >
                        {children}
                    </motion.div>
                )}
            </div>
        </section>
    );
}

interface SectionContainerProps {
    children: ReactNode;
    className?: string;
    dark?: boolean;
}

/**
 * Reusable section container with consistent padding
 */
export function SectionContainer({ children, className = "", dark = false }: SectionContainerProps) {
    return (
        <section className={`py-16 md:py-24 ${dark ? "bg-brand-navy" : "bg-brand-light"} ${className}`}>
            <div className="container mx-auto px-4 md:px-8">
                {children}
            </div>
        </section>
    );
}

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    dark?: boolean;
}

/**
 * Reusable section header
 */
export function SectionHeader({ title, subtitle, centered = true, dark = false }: SectionHeaderProps) {
    return (
        <div className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${dark ? "text-white" : "text-brand-navy"}`}>
                {title}
            </h2>
            {subtitle && (
                <p className={`text-lg max-w-2xl ${centered ? "mx-auto" : ""} ${dark ? "text-white/70" : "text-brand-navy/70"}`}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}
