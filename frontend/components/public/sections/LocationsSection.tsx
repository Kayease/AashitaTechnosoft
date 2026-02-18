"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Location01Icon,
  GlobalIcon,
  Home01Icon,
  OfficeIcon,
  ArrowRight01Icon,
  Mouse01Icon,
} from "@hugeicons/react";

const locations = [
  {
    id: "india",
    country: "India",
    city: "Jaipur",
    type: "Global Headquarters",
    region: "South Asia",
    details:
      "Our central hub for strategic operations and enterprise software development.",
    icon: Home01Icon,
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: "china",
    country: "China",
    city: "Shanghai",
    type: "R&D Center",
    region: "East Asia",
    details:
      "Focused on cutting-edge research in AI, IoT, and hardware-software integration.",
    icon: OfficeIcon,
    color: "from-indigo-500 to-blue-400",
  },
  {
    id: "vietnam",
    country: "Vietnam",
    city: "Ho Chi Minh City",
    type: "Regional Office",
    region: "Southeast Asia",
    details:
      "A key delivery center specializing in agile development and mobile solutions.",
    icon: Location01Icon,
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "indonesia",
    country: "Indonesia",
    city: "Jakarta",
    type: "Support Hub",
    region: "Southeast Asia",
    details:
      "Our dedicated regional center for cloud managed services and 24/7 technical support.",
    icon: GlobalIcon,
    color: "from-blue-600 to-indigo-400",
  },
];

export function LocationsSection() {
  const [activeLoc, setActiveLoc] = useState(locations[0]);

  return (
    <section className="relative py-20 md:py-32 bg-brand-light/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-6 py-2 bg-white border border-blue-100 rounded-full shadow-sm mb-8">
            <span className="text-brand-navy font-bold tracking-[0.15em] uppercase text-xs">
              Global <span className="text-brand-blue">Operations</span>
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4 tracking-tight">
            Our Strategic <span className="text-brand-blue">Ecosystem</span>
          </h2>

          <p className="text-brand-navy/60 text-lg max-w-2xl mx-auto">
            An interactive look at our high-performance delivery centers across
            the globe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT LIST */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setActiveLoc(loc)}
                className={`group text-left transition-all duration-300 ${
                  activeLoc.id === loc.id
                    ? "translate-x-2"
                    : "hover:translate-x-1"
                }`}
              >
                <div
                  className={`relative p-5 rounded-2xl border transition-all duration-300 ${
                    activeLoc.id === loc.id
                      ? "bg-white border-blue-100 shadow-lg"
                      : "bg-white/60 border-transparent hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl ${
                        activeLoc.id === loc.id
                          ? "bg-brand-blue text-white"
                          : "bg-blue-50 text-brand-blue"
                      }`}
                    >
                      <loc.icon size={22} variant="duotone" />
                    </div>

                    <div>
                      <h4 className="font-semibold text-brand-navy mb-1">
                        {loc.country}
                      </h4>
                      <p className="text-[11px] font-semibold text-brand-blue uppercase tracking-widest">
                        {loc.region}
                      </p>
                    </div>

                    {activeLoc.id === loc.id && (
                      <motion.div layoutId="activeArrow" className="ml-auto">
                        <ArrowRight01Icon
                          size={20}
                          className="text-brand-blue"
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* RIGHT DETAIL CARD */}
          <div className="lg:col-span-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLoc.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="relative bg-white rounded-[40px] border border-blue-50 shadow-[0_40px_80px_rgba(15,23,42,0.08)] overflow-hidden"
              >
                <div className="relative px-20 py-16 bg-gradient-to-br from-blue-50/40 to-white flex flex-col justify-between min-h-[500px]">
                  
                  {/* Subtle moving background country name */}
                  <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none">
                    <motion.h1 
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ 
                            duration: 15, 
                            repeat: Infinity, 
                            ease: "linear",
                            delay: 0
                        }}
                        className="text-[18vw] font-black text-brand-blue/[0.04] uppercase whitespace-nowrap leading-none"
                    >
                        {activeLoc.country} &nbsp; {activeLoc.country}
                    </motion.h1>
                  </div>

                  {/* TOP CONTENT */}
                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <p className="text-brand-blue font-bold uppercase tracking-[0.3em] text-[10px] mb-3">
                        Current View
                      </p>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy leading-[1.1] tracking-tight">
                        {activeLoc.city},<br />
                        <span className="text-brand-blue">
                          {activeLoc.country}
                        </span>
                      </h3>
                    </div>

                    <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center border border-blue-50">
                      <activeLoc.icon
                        size={30}
                        className="text-brand-blue"
                        variant="duotone"
                      />
                    </div>
                  </div>

                  {/* BOTTOM INFO CARD */}
                  <div className="relative z-10 max-w-md">
                    <div className="p-6 md:p-8 bg-white border border-blue-50 rounded-3xl shadow-sm">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/5 rounded-full mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                        <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">
                          {activeLoc.type}
                        </span>
                      </div>

                      <p className="text-brand-navy/70 text-base md:text-lg leading-relaxed mb-6">
                        {activeLoc.details}
                      </p>

                      <div className="flex items-center gap-4 pt-4 border-t border-blue-50">
                        <div className="flex -space-x-3">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-semibold text-brand-blue"
                            >
                              {i}+
                            </div>
                          ))}
                        </div>

                        <p className="text-[10px] font-semibold text-brand-navy/50 uppercase tracking-[0.2em]">
                          Active Team In {activeLoc.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative glow */}
                  <div
                    className={`absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br ${activeLoc.color} opacity-10 blur-3xl`}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}