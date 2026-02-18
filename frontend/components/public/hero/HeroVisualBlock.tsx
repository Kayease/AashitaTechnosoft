"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function HeroVisualBlock() {
    // Mouse tracking for 3D tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 100, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 100, damping: 20 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        // Calculate tilt percentages (-1 to 1)
        x.set((clientX - centerX) / (width / 2));
        y.set((clientY - centerY) / (height / 2));
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    // Transform tilt values to rotation degrees
    const rotateX = useTransform(mouseY, [-1, 1], [10, -10]);
    const rotateY = useTransform(mouseX, [-1, 1], [-10, 10]);

    return (
        <div className="relative perspective-1000 w-full flex items-center justify-center">
            {/* Main Wrapper with Floating Animation */}
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full"
            >
                {/* Interactive Tilt Container */}
                <motion.div
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full cursor-pointer group"
                >
                    {/* Robot Hand Image - Scaled up to make the palm a larger 'cradle' */}
                    <motion.img 
                        src="/robot-hand-side-view-background-presenting-technology-gesture.png"
                        alt="AI Technology"
                        className="w-full h-auto block pointer-events-none scale-135 origin-center"
                        initial={{ opacity: 0, scale: 1.4 }}
                        animate={{ opacity: 0.8, scale: 1.35 }}
                        transition={{ duration: 1.2 }}
                    />

                    {/* --- 3D PRISM ASSEMBLY --- */}
                    {/* Re-positioned to float significantly higher to avoid touching the hand */}
                    <div className="absolute inset-0 flex items-start justify-center pt-0 transform-gpu pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
                        
                        {/* The Central Prism (CSS Cube) */}
                        <motion.div 
                            animate={{ rotateY: 360, rotateX: [10, 30, 10] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="relative w-32 h-32 ml-[-5rem] mt-[-2rem]"
                            style={{ transformStyle: "preserve-3d", transform: "translateZ(120px)" }}
                        >
                            {/* Cube Faces - Blue Shades */}
                            {/* Front */}
                            <div className="absolute w-32 h-32 bg-gradient-to-br from-blue-100/70 to-sky-200/70 backdrop-blur-sm border border-blue-200/50 flex items-center justify-center shadow-lg shadow-blue-200/30"
                                 style={{ transform: "rotateY(0deg) translateZ(64px)" }}>
                                 <div className="w-12 h-12 bg-white/20 rounded-full blur-xl" />
                            </div>
                            {/* Back */}
                            <div className="absolute w-32 h-32 bg-gradient-to-br from-sky-100/70 to-blue-200/70 backdrop-blur-sm border border-sky-200/50 shadow-lg shadow-sky-200/30"
                                 style={{ transform: "rotateY(180deg) translateZ(64px)" }} />
                            {/* Right */}
                            <div className="absolute w-32 h-32 bg-gradient-to-br from-cyan-100/70 to-blue-100/70 backdrop-blur-sm border border-cyan-200/50 shadow-lg shadow-cyan-200/30"
                                 style={{ transform: "rotateY(90deg) translateZ(64px)" }} />
                            {/* Left */}
                            <div className="absolute w-32 h-32 bg-gradient-to-br from-blue-200/70 to-cyan-100/70 backdrop-blur-sm border border-blue-200/50 shadow-lg shadow-blue-200/30"
                                 style={{ transform: "rotateY(-90deg) translateZ(64px)" }} />
                            {/* Top */}
                            <div className="absolute w-32 h-32 bg-gradient-to-br from-sky-200/70 to-blue-100/70 backdrop-blur-sm border border-sky-200/50 shadow-lg shadow-sky-200/30"
                                 style={{ transform: "rotateX(90deg) translateZ(64px)" }} />
                            {/* Bottom */}
                            <div className="absolute w-32 h-32 bg-gradient-to-br from-blue-100/70 to-sky-100/70 backdrop-blur-sm border border-blue-200/50 flex items-center justify-center shadow-lg shadow-blue-200/30"
                                 style={{ transform: "rotateX(-90deg) translateZ(64px)" }}>
                                 <div className="w-16 h-16 bg-white/30 rounded-full blur-md" />
                            </div>

                            {/* Core Data Particle */}
                            <div className="absolute inset-0 flex items-center justify-center"
                                 style={{ transform: "translateZ(0px)" }}>
                                 <motion.div 
                                    animate={{ scale: [0.8, 1.2, 0.8] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-12 h-12 bg-gradient-to-r from-blue-200 via-sky-200 to-cyan-200 rounded-full shadow-[0_0_30px_rgba(186,230,253,0.6)]"
                                 />
                            </div>
                        </motion.div>

                        {/* Floating Data Points */}
                        {[0, 1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute w-3 h-3 bg-white rounded-full shadow-lg"
                                style={{ 
                                    left: `${20 + i * 20}%`, 
                                    top: `${40 + (i % 2) * 30}%`,
                                    transform: `translateZ(${40 + i * 10}px)` 
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
