"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe02Icon,
  UserMultipleIcon,
  Briefcase01Icon,
  Award01Icon,
  Rocket01Icon,
  Analytics01Icon,
} from "@hugeicons/react";

// --- Stats Data ---
const statsItems = [
  {
    value: "10+",
    label: "Years Experience",
    subtext: "Delivering excellence since 2014.",
    icon: Rocket01Icon,
  },
  {
    value: "250+",
    label: "Global Clients",
    subtext: "Trusted by leaders worldwide.",
    icon: Globe02Icon,
  },
  {
    value: "500+",
    label: "Projects Done",
    subtext: "Successful digital deployments.",
    icon: Briefcase01Icon,
  },
  {
    value: "98%",
    label: "Retention Rate",
    subtext: "Building lasting partnerships.",
    icon: UserMultipleIcon,
  },
  {
    value: "15+",
    label: "Industry Awards",
    subtext: "Recognized for design innovation.",
    icon: Award01Icon,
  },
  {
    value: "200%",
    label: "Avg ROI",
    subtext: "Measurable business growth.",
    icon: Analytics01Icon,
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 60, damping: 15 },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "circOut" },
  },
};

export function RoadmapSection() {
  return (
    <section className="relative w-full h-auto min-h-[650px] flex flex-col justify-center bg-[#F4F8FB] overflow-hidden py-16">
      {/* --- Subtle Background Grid (Lower Opacity) --- */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Radial fade to focus center */}
        <div className="absolute inset-0 bg-[#F4F8FB] [mask-image:radial-gradient(transparent_30%,#F4F8FB_100%)]" />
      </div>

      <div className="container relative mx-auto px-4 lg:px-12 z-10">
        {/* --- Header --- */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-4 rounded-full bg-blue-50 border border-blue-100"
          >
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
              Our Impact
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight"
          >
            Numbers That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Define Us
            </span>
          </motion.h2>
        </div>

        {/* --- Horizontal Timeline Layout --- */}
        <div className="relative w-full max-w-[1400px] mx-auto">
          {/* Central Horizontal Line (Gradient) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={lineVariants}
            className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 z-0 origin-center"
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-6 relative z-10"
          >
            {statsItems.map((item, index) => {
              const isEven = index % 2 === 0; // Top Placement

              return (
                <div
                  key={index}
                  className="relative flex flex-col items-center group px-2"
                >
                  {/* === TOP CARDS (Evens) === */}
                  {isEven ? (
                    <>
                      <StatCard item={item} />
                      <Connector height="h-16" position="top" />
                      <CenterNode />
                      {/* Spacer to balance grid */}
                      <div className="h-[200px] w-full hidden md:block" />
                    </>
                  ) : (
                    /* === BOTTOM CARDS (Odds) === */
                    <>
                      {/* Spacer to balance grid */}
                      <div className="h-[200px] w-full hidden md:block" />
                      <CenterNode />
                      <Connector height="h-16" position="bottom" />
                      <StatCard item={item} />
                    </>
                  )}

                  {/* === MOBILE STACK (Hidden on Desktop) === */}
                  <div className="md:hidden flex flex-col items-center mb-10 w-full">
                    <CenterNode />
                    <div className="h-6 w-[1px] bg-gradient-to-b from-blue-300 to-transparent" />
                    <StatCard item={item} isMobile />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- Sub-Components ---

function StatCard({
  item,
  isMobile = false,
}: {
  item: any;
  isMobile?: boolean;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className={`
        relative w-full bg-white rounded-2xl p-6 border border-white
        shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]
        hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.15)]
        hover:border-blue-100 transition-all duration-300
        group-hover:-translate-y-2
        ${isMobile ? "block" : "hidden md:block"}
      `}
    >
      {/* Decorative Background Icon (Watermark) */}
      <div className="absolute -right-4 -top-4 opacity-[0.03] text-blue-900 group-hover:opacity-[0.06] group-hover:scale-110 transition-all duration-500">
        <item.icon size={100} variant="bulk" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            <item.icon size={22} variant="bulk" />
          </div>
        </div>

        {/* The Big Number */}
        <h3 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tighter mb-1 group-hover:text-blue-600 transition-colors duration-300">
          {item.value}
        </h3>

        <h4 className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-2">
          {item.label}
        </h4>

        <p className="text-xs text-slate-400 font-medium leading-relaxed">
          {item.subtext}
        </p>
      </div>
    </motion.div>
  );
}

function Connector({
  height,
  position,
}: {
  height: string;
  position: "top" | "bottom";
}) {
  return (
    <div
      className={`
      hidden md:flex flex-col items-center justify-center ${height} w-[1px]
      bg-gradient-to-b from-slate-200 to-slate-200
      relative transition-all duration-500 group-hover:bg-blue-200
    `}
    >
      {/* Animated Flow Line */}
      <div
        className={`absolute w-[2px] bg-blue-500 transition-all duration-500 ease-out 
        ${position === "top" ? "bottom-0 h-0 group-hover:h-full" : "top-0 h-0 group-hover:h-full"}
      `}
      />
    </div>
  );
}

function CenterNode() {
  return (
    <div className="relative z-20 flex items-center justify-center flex-shrink-0 w-8 h-8">
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-blue-100 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 opacity-50" />

      {/* Ring */}
      <div className="w-4 h-4 rounded-full bg-white border-[3px] border-slate-300 shadow-sm z-10 transition-colors duration-300 group-hover:border-blue-500 group-hover:scale-110" />

      {/* Active Dot Center */}
      <div className="absolute w-1.5 h-1.5 bg-blue-600 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 z-20" />
    </div>
  );
}
