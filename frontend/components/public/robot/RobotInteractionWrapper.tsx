"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useMousePosition, useRobotTracking, useWindowSize } from "@/hooks";
import { ANIMATION_CONFIG } from "@/constants";

export function RobotInteractionWrapper() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { normalizedX, normalizedY } = useMousePosition(containerRef);
    const { isMobile } = useWindowSize();

    const { headRotateX, headRotateY, neckRotateX, neckRotateY, handRotate } = useRobotTracking({
        normalizedX: isMobile ? 0 : normalizedX,
        normalizedY: isMobile ? 0 : normalizedY,
    });

    const { smoothing } = ANIMATION_CONFIG.robot;

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center"
        >
            {/* Robot Container */}
            <div className="relative w-[280px] h-[400px] md:w-[350px] md:h-[500px] lg:w-[400px] lg:h-[550px]">
                {/* Glow Effect Behind Robot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-brand-cyan/20 blur-3xl animate-pulse" />
                </div>

                {/* Robot SVG with Interactive Parts */}
                <svg
                    viewBox="0 0 400 550"
                    className="absolute inset-0 w-full h-full"
                    style={{ filter: "drop-shadow(0 0 20px rgba(47, 183, 196, 0.3))" }}
                >
                    {/* Body Base */}
                    <motion.g id="robot-body">
                        {/* Torso */}
                        <ellipse cx="200" cy="380" rx="80" ry="100" fill="url(#bodyGradient)" />
                        <ellipse cx="200" cy="380" rx="60" ry="80" fill="url(#innerBodyGradient)" />

                        {/* Chest Circle */}
                        <circle cx="200" cy="340" r="25" fill="#0B2D5C" stroke="#2FB7C4" strokeWidth="2" />
                        <circle cx="200" cy="340" r="15" fill="#2FB7C4" opacity="0.6">
                            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
                        </circle>

                        {/* Shoulder Joints */}
                        <circle cx="120" cy="300" r="18" fill="url(#jointGradient)" stroke="#2FB7C4" strokeWidth="1" />
                        <circle cx="280" cy="300" r="18" fill="url(#jointGradient)" stroke="#2FB7C4" strokeWidth="1" />
                    </motion.g>

                    {/* Neck */}
                    <motion.g
                        id="robot-neck"
                        style={{
                            transformOrigin: "200px 260px",
                        }}
                        animate={{
                            rotateX: neckRotateX,
                            rotateY: neckRotateY,
                        }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    >
                        <rect x="185" y="250" width="30" height="40" rx="5" fill="url(#neckGradient)" />
                        <ellipse cx="200" cy="255" rx="20" ry="8" fill="#1a1a2e" />
                    </motion.g>

                    {/* Head */}
                    <motion.g
                        id="robot-head"
                        style={{
                            transformOrigin: "200px 180px",
                        }}
                        animate={{
                            rotateX: headRotateX,
                            rotateY: headRotateY,
                        }}
                        transition={{ type: "spring", stiffness: 150, damping: 25 }}
                    >
                        {/* Head Shape */}
                        <ellipse cx="200" cy="160" rx="65" ry="75" fill="url(#headGradient)" />
                        <ellipse cx="200" cy="150" rx="55" ry="60" fill="url(#faceGradient)" />

                        {/* Eye Sockets */}
                        <ellipse cx="170" cy="140" rx="18" ry="15" fill="#0B2D5C" />
                        <ellipse cx="230" cy="140" rx="18" ry="15" fill="#0B2D5C" />

                        {/* Eyes - Glowing */}
                        <circle cx="170" cy="140" r="10" fill="#2FB7C4">
                            <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="230" cy="140" r="10" fill="#2FB7C4">
                            <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="170" cy="140" r="4" fill="#fff" />
                        <circle cx="230" cy="140" r="4" fill="#fff" />

                        {/* Head Details */}
                        <circle cx="200" cy="90" r="8" fill="#2FB7C4" opacity="0.8" />
                        <rect x="185" y="185" width="30" height="5" rx="2" fill="#1a1a2e" />

                        {/* Ear Pieces */}
                        <ellipse cx="130" cy="160" rx="12" ry="20" fill="url(#jointGradient)" stroke="#2FB7C4" strokeWidth="1" />
                        <ellipse cx="270" cy="160" rx="12" ry="20" fill="url(#jointGradient)" stroke="#2FB7C4" strokeWidth="1" />
                    </motion.g>

                    {/* Left Arm */}
                    <motion.g
                        id="robot-left-arm"
                        style={{
                            transformOrigin: "120px 300px",
                        }}
                        animate={{
                            rotate: -handRotate * 0.5,
                        }}
                        transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    >
                        {/* Upper Arm */}
                        <rect x="90" y="310" width="30" height="70" rx="10" fill="url(#armGradient)" />
                        {/* Elbow */}
                        <circle cx="105" cy="390" r="12" fill="url(#jointGradient)" stroke="#2FB7C4" strokeWidth="1" />
                        {/* Lower Arm */}
                        <rect x="93" y="400" width="24" height="60" rx="8" fill="url(#armGradient)" />
                        {/* Hand */}
                        <ellipse cx="105" cy="470" rx="15" ry="20" fill="url(#jointGradient)" />
                    </motion.g>

                    {/* Right Arm - Main Interactive */}
                    <motion.g
                        id="robot-right-arm"
                        style={{
                            transformOrigin: "280px 300px",
                        }}
                        animate={{
                            rotate: handRotate,
                        }}
                        transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    >
                        {/* Upper Arm */}
                        <rect x="280" y="310" width="30" height="70" rx="10" fill="url(#armGradient)" />
                        {/* Elbow */}
                        <circle cx="295" cy="390" r="12" fill="url(#jointGradient)" stroke="#2FB7C4" strokeWidth="1" />
                        {/* Lower Arm */}
                        <rect x="283" y="400" width="24" height="60" rx="8" fill="url(#armGradient)" />
                        {/* Hand */}
                        <ellipse cx="295" cy="470" rx="15" ry="20" fill="url(#jointGradient)" />
                    </motion.g>

                    {/* Gradients */}
                    <defs>
                        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e8e8e8" />
                            <stop offset="50%" stopColor="#d0d0d0" />
                            <stop offset="100%" stopColor="#a0a0a0" />
                        </linearGradient>
                        <linearGradient id="innerBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f5f5f5" />
                            <stop offset="100%" stopColor="#e0e0e0" />
                        </linearGradient>
                        <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f0f0f0" />
                            <stop offset="50%" stopColor="#e0e0e0" />
                            <stop offset="100%" stopColor="#c0c0c0" />
                        </linearGradient>
                        <linearGradient id="faceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="100%" stopColor="#f0f0f0" />
                        </linearGradient>
                        <linearGradient id="jointGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#d0d0d0" />
                            <stop offset="100%" stopColor="#909090" />
                        </linearGradient>
                        <linearGradient id="armGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e8e8e8" />
                            <stop offset="100%" stopColor="#b0b0b0" />
                        </linearGradient>
                        <linearGradient id="neckGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#c0c0c0" />
                            <stop offset="100%" stopColor="#808080" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
}
