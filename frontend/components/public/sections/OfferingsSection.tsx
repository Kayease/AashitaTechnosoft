"use client";

import { motion } from "framer-motion";
import {
  CodeIcon,
  AiCloud01Icon,
  SmartPhone01Icon,
  CloudServerIcon,
  WebDesign01Icon,
  Cursor01Icon,
  ArrowRight01Icon,
  Layers01Icon,
} from "@hugeicons/react";

// Defined distinct cool-tone color palettes for each card to create visual variety while staying professional
const offerings = [
  {
    title: "Custom Software",
    description:
      "Bespoke digital engines engineered for your specific business logic.",
    icon: CodeIcon,
    delay: 0.1,
    // Blue Theme
    accentColor: "text-blue-600",
    bgHover: "hover:bg-blue-50",
    borderHover: "hover:border-blue-200",
    iconBgHover: "group-hover:bg-blue-600 group-hover:text-white",
    shadowHover: "hover:shadow-blue-200/50",
  },
  {
    title: "AI & Intelligence",
    description: "Predictive algorithms that automate complex decision-making.",
    icon: AiCloud01Icon,
    delay: 0.2,
    // Indigo Theme
    accentColor: "text-indigo-600",
    bgHover: "hover:bg-indigo-50",
    borderHover: "hover:border-indigo-200",
    iconBgHover: "group-hover:bg-indigo-600 group-hover:text-white",
    shadowHover: "hover:shadow-indigo-200/50",
  },
  {
    title: "Mobile Ecosystems",
    description:
      "High-fidelity native experiences for iOS and Android platforms.",
    icon: SmartPhone01Icon,
    delay: 0.3,
    // Sky Theme
    accentColor: "text-sky-600",
    bgHover: "hover:bg-sky-50",
    borderHover: "hover:border-sky-200",
    iconBgHover: "group-hover:bg-sky-600 group-hover:text-white",
    shadowHover: "hover:shadow-sky-200/50",
  },
  {
    title: "Cloud Infrastructure",
    description:
      "Resilient, auto-scaling server architecture built for the future.",
    icon: CloudServerIcon,
    delay: 0.4,
    // Violet Theme
    accentColor: "text-violet-600",
    bgHover: "hover:bg-violet-50",
    borderHover: "hover:border-violet-200",
    iconBgHover: "group-hover:bg-violet-600 group-hover:text-white",
    shadowHover: "hover:shadow-violet-200/50",
  },
  {
    title: "Web Experiences",
    description: "Performant web applications that feel like native software.",
    icon: WebDesign01Icon,
    delay: 0.5,
    // Cyan Theme
    accentColor: "text-cyan-600",
    bgHover: "hover:bg-cyan-50",
    borderHover: "hover:border-cyan-200",
    iconBgHover: "group-hover:bg-cyan-600 group-hover:text-white",
    shadowHover: "hover:shadow-cyan-200/50",
  },
  {
    title: "Product Design",
    description:
      "Human-centric interfaces that bridge technical complexity and user ease.",
    icon: Cursor01Icon,
    delay: 0.6,
    // Teal Theme
    accentColor: "text-teal-600",
    bgHover: "hover:bg-teal-50",
    borderHover: "hover:border-teal-200",
    iconBgHover: "group-hover:bg-teal-600 group-hover:text-white",
    shadowHover: "hover:shadow-teal-200/50",
  },
];

export function OfferingsSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#ecf0f3] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-400/10 blur-[100px] -z-10" />

      <div className="container relative mx-auto px-6 max-w-6xl">
        {/* --- HEADER --- */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="p-1 rounded-lg bg-white shadow-sm border border-blue-100 overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Aashita.ai Logo"
                  className="w-4 h-4 object-contain"
                />
              </div>
              <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                Our Expertise
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-none"
            >
              Solutions that <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Redefine Scale.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-500 text-sm md:text-base font-medium max-w-sm leading-relaxed"
          >
            We don't just write code; we architect digital ecosystems designed
            for stability, security, and speed.
          </motion.p>
        </div>

        {/* --- GRID: BENTO STYLE --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {offerings.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: offer.delay }}
              className="group h-full perspective-1000"
            >
              <div
                className={`
                relative h-full p-8 rounded-[2rem]
                bg-[#ecf0f3] 
                ${offer.bgHover}
                ${offer.borderHover}
                border border-white/60
                
                shadow-[9px_9px_18px_#d1d9e6,-9px_-9px_18px_#ffffff]
                
                hover:-translate-y-2
                transition-all duration-300 ease-out
                flex flex-col
                group-hover:shadow-xl
              `}
              >
                {/* Header: Icon & Index */}
                <div className="flex justify-between items-start mb-6">
                  {/* 
                      Icon Container: 
                      Starts as an "Inset" (hole in the clay).
                      On hover, becomes a "Solid Button" (pops out with color).
                    */}
                  <div
                    className={`
                        w-14 h-14 rounded-2xl flex items-center justify-center
                        bg-[#ecf0f3] ${offer.accentColor}
                        shadow-[inset_5px_5px_10px_#d1d9e6,inset_-5px_-5px_10px_#ffffff]
                        transition-all duration-300 ease-in-out
                        ${offer.iconBgHover}
                        group-hover:shadow-none
                        group-hover:scale-110
                    `}
                  >
                    <offer.icon size={26} variant="bulk" />
                  </div>

                  {/* Subtle Index Number */}
                  <span className="text-6xl font-black text-slate-200/60 pointer-events-none select-none -mt-4 -mr-2 transition-colors group-hover:text-slate-300/60">
                    0{index + 1}
                  </span>
                </div>

                {/* Content */}
                <h3
                  className={`text-xl font-bold text-slate-800 mb-3 transition-colors ${offer.accentColor}`}
                >
                  {offer.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed font-medium mb-8 group-hover:text-slate-600 transition-colors">
                  {offer.description}
                </p>

                {/* Interactive Footer */}
                <div className="mt-auto flex items-center justify-between border-t border-slate-200/60 pt-4 group-hover:border-slate-300 transition-colors">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase group-hover:text-slate-500">
                    Explore
                  </span>

                  {/* Small Arrow Button */}
                  <div
                    className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        text-slate-400 
                        shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff]
                        transition-all duration-300 cursor-pointer
                        group-hover:scale-110 group-hover:bg-white
                        ${offer.accentColor}
                    `}
                  >
                    <ArrowRight01Icon
                      size={14}
                      className="transform group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
