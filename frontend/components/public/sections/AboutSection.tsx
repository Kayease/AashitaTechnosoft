"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight01Icon,
  CallIcon,
  Layers01Icon,
  SecurityCheckIcon,
  Rocket01Icon,
} from "@hugeicons/react";

// --- Configuration for the Floating "Value" Pills ---
const values = [
  { icon: Layers01Icon, label: "Scalable Architecture", delay: 0 },
  { icon: Rocket01Icon, label: "Rapid Innovation", delay: 0.2 },
  { icon: SecurityCheckIcon, label: "Enterprise Security", delay: 0.4 },
];

/**
 * About Section Component
 *
 * Uses Claymorphism (Soft UI) principles:
 * 1. Light backgrounds with double shadows (light top-left, dark bottom-right).
 * 2. Rounded corners (large border-radius).
 * 3. Pastel/Soft colors (Blues and Whites).
 */
export function AboutSection() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden bg-slate-50 selection:bg-blue-100">
      {/* =========================================
          BACKGROUND LAYER
      ========================================= */}

      {/* 1. The Translucent Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* We use CSS gradients to draw the grid lines */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px", // Size of the grid squares
          }}
        />

        {/* Vignette Mask: Fades the grid out at the edges for a clean look */}
        <div className="absolute inset-0 bg-slate-50 [mask-image:radial-gradient(transparent_0%,white_100%)]" />
      </div>

      {/* 2. Soft Ambient Orbs (Floating Blobs) */}
      <motion.div
        animate={{ y: [0, -40, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[120px] -z-10"
      />
      <motion.div
        animate={{ y: [0, 40, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-200/30 rounded-full blur-[100px] -z-10"
      />

      {/* =========================================
          CONTENT LAYER
      ========================================= */}
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* --- 1. The Badge (Clay Style) --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            {/* 
               Clay Badge breakdown:
               - shadow-[...] creates the 3D lift.
               - border-white/50 adds a glossy edge.
            */}
            <div
              className="
              px-6 py-2 rounded-full 
              bg-white/80 backdrop-blur-md border border-white/60
              shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff]
            "
            >
              <span className="text-xs font-black tracking-[0.2em] uppercase text-blue-500">
                Who We Are
              </span>
            </div>
          </motion.div>

          {/* --- 2. The Headline --- */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-800 mb-8 leading-[1.15]"
          >
            We don't just write code.
            <br />
            We{" "}
            <span className="relative inline-block text-blue-600">
              Scuplt
              {/* Decorative underline for emphasis */}
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-blue-200"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </span>{" "}
            Digital Experiences.
          </motion.h2>

          {/* --- 3. The Paragraph --- */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto font-medium"
          >
            At Aashita.ai, we fuse engineering precision with artistic vision.
            Our mission is to simplify complex challenges into elegant,
            <span className="text-slate-800 font-semibold">
              {" "}
              user-centric software{" "}
            </span>
            that stands the test of time.
          </motion.p>

          {/* --- 4. Floating Value Pills (New Creative Element) --- */}
          {/* This adds visual interest and breaks up the text */}
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            {values.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  opacity: { delay: 0.3 + item.delay },
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 1.5,
                  },
                }}
                className="
                  flex items-center gap-3 px-5 py-3 rounded-2xl
                  bg-[#F0F4F8] border border-white/50
                  shadow-[8px_8px_16px_rgba(166,180,200,0.3),-8px_-8px_16px_rgba(255,255,255,1)]
                "
              >
                <item.icon size={18} className="text-blue-500" variant="bulk" />
                <span className="text-sm font-bold text-slate-600">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* --- 5. CTA Buttons (High Clay Style) --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {/* Primary Button: Blue Clay */}
            <Link
              href="/contact"
              className="group relative flex items-center gap-3 px-10 py-4 rounded-[2rem] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
            >
              {/* Button Background (Absolute to handle complex shadows) */}
              <div
                className="absolute inset-0 rounded-[2rem] bg-blue-600 
                shadow-[10px_10px_20px_rgba(37,99,235,0.3),-10px_-10px_20px_rgba(255,255,255,0.8)]
              "
              />

              {/* Inner highlight for "Glossy" plastic look */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/20 to-transparent opacity-50" />

              {/* Text & Icon */}
              <div className="relative z-10 flex items-center gap-2 text-white font-bold tracking-wide">
                <CallIcon size={20} variant="bulk" />
                <span>Let's Talk</span>
              </div>
            </Link>

            {/* Secondary Button: White/Inset Clay */}
            <Link
              href="/about"
              className="group relative flex items-center gap-3 px-10 py-4 rounded-[2rem] transition-all duration-300 hover:scale-105"
            >
              {/* 
                 White Clay Style:
                 Instead of popping out, this button looks slightly softer/flatter
                 until hovered.
              */}
              <div
                className="absolute inset-0 rounded-[2rem] bg-slate-100 border border-white 
                shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]
                group-hover:shadow-[12px_12px_24px_#d1d5db,-12px_-12px_24px_#ffffff]
                transition-shadow duration-300
              "
              />

              <div className="relative z-10 flex items-center gap-2 text-slate-600 font-bold group-hover:text-blue-600 transition-colors">
                <span>Our Story</span>
                <ArrowRight01Icon
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
