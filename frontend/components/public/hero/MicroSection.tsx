"use client";

import { motion } from "framer-motion";

interface MicroSectionProps {
    title: string;
    description: string;
    position: "left" | "right";
}

export function MicroSection({ title, description, position }: MicroSectionProps) {
    const delay = position === "left" ? 0.8 : 1.0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay }}
            className="group"
        >
            <div className="relative bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy rounded-2xl p-8 md:p-10 overflow-hidden hover:shadow-2xl hover:shadow-brand-blue/20 transition-all duration-500 hover:-translate-y-2">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-300 rounded-full blur-2xl" />
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-3">
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-wide">
                        {title}
                    </h3>
                    <p className="text-white/70 text-sm md:text-base">
                        {description}
                    </p>

                    {/* Decorative Line */}
                    <div className="pt-4">
                        <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full group-hover:w-24 transition-all duration-500" />
                    </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-cyan/0 to-brand-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </motion.div>
    );
}
