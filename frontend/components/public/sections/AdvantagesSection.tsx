"use client";

import { motion } from "framer-motion";
import {
  SoftwareLicenseIcon,
  AiCloud01Icon,
  Cursor01Icon,
  AiSecurity01Icon,
  Tick01Icon,
  ArrowRight01Icon,
  StarIcon,
} from "@hugeicons/react";

const advantages = [
  {
    title: "Precision Engineering",
    tag: "ELITE",
    description: "High-performance codebases that stand the test of time.",
    features: [
      "Clean & Documented Code",
      "Infinite Scalability",
      "Low-Latency Performance",
    ],
    icon: SoftwareLicenseIcon,
    // Lighter, fresher blue gradient
    color: "from-blue-400 to-blue-600",
    shadow: "shadow-blue-200",
    delay: 0.1,
  },
  {
    title: "Strategic AI Models",
    tag: "SMART",
    description: "Custom-built neural networks for actionable intelligence.",
    features: [
      "Predictive Analytics",
      "Deep Learning Models",
      "Real-time Processing",
    ],
    icon: AiCloud01Icon,
    // Lighter violet/indigo gradient
    color: "from-violet-400 to-indigo-500",
    shadow: "shadow-indigo-200",
    delay: 0.2,
  },
  {
    title: "Human-Centric UX",
    tag: "DESIGN",
    description: "Intuitive digital experiences designed for conversion.",
    features: [
      "User-First Research",
      "Interactive Prototypes",
      "Seamless Accessibility",
    ],
    icon: Cursor01Icon,
    // Lighter cyan/sky gradient
    color: "from-sky-400 to-cyan-500",
    shadow: "shadow-cyan-200",
    delay: 0.3,
  },
  {
    title: "Ironclad Security",
    tag: "SECURE",
    description: "Enterprise-grade protocols to protect your IP.",
    features: ["256-bit Encryption", "Threat Mitigation", "Compliance Ready"],
    icon: AiSecurity01Icon,
    // Soft slate gradient (less harsh black)
    color: "from-slate-500 to-slate-700",
    shadow: "shadow-slate-200",
    delay: 0.4,
  },
];

export function AdvantagesSection() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-[#F5F7FA]">
      {/* Background Texture: Lighter and cleaner */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.3]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-[#F5F7FA] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_70%,black_100%)]" />
      </div>

      {/* Ambient Glows: Very subtle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-200/20 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white shadow-sm border border-slate-100"
          >
            <StarIcon
              size={14}
              className="text-blue-400 fill-blue-400 animate-pulse"
            />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400">
              The Aashita.ai Standard
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6 tracking-tight">
            Why We Are{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              Different.
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((adv, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: adv.delay }}
              className="h-full"
            >
              {/* 
                                --- THE CARD --- 
                            */}
              <div
                className="group relative h-full bg-[#F5F7FA] rounded-[2.5rem] 
                                shadow-[18px_18px_36px_#E2E8F0,-18px_-18px_36px_#ffffff]
                                hover:shadow-[22px_22px_44px_#E2E8F0,-22px_-22px_44px_#ffffff]
                                transition-all duration-500 flex flex-col overflow-hidden
                                hover:-translate-y-2
                            "
              >
                {/* 
                                   --- THE HEADER (Lighter Colors) --- 
                                */}
                <div
                  className={`
                                    relative h-44 p-7 flex flex-col justify-between
                                    bg-gradient-to-br ${adv.color}
                                    rounded-t-[2.5rem] rounded-bl-[3rem] 
                                    shadow-lg z-10 overflow-hidden
                                `}
                >
                  {/* Subtle noise texture overlay for aesthetics */}
                  <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                  {/* Abstract Circle Decoration */}
                  <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />

                  {/* Top Row: Cleaner Icon & Tag */}
                  <div className="flex justify-between items-start relative z-20">
                    {/* Glassmorphism Icon Circle */}
                    <div
                      className="
                                            w-12 h-12 rounded-full 
                                            bg-white/10 backdrop-blur-md 
                                            border border-white/20 
                                            flex items-center justify-center
                                            shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]
                                            group-hover:rotate-12 transition-transform duration-500
                                        "
                    >
                      {/* Using thinner stroke width for "Clean" look */}
                      <adv.icon
                        size={24}
                        className="text-white"
                        strokeWidth={1.5}
                      />
                    </div>

                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold tracking-widest backdrop-blur-md border border-white/10">
                      {adv.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white relative z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 tracking-wide">
                    {adv.title}
                  </h3>
                </div>

                {/* 
                                   --- THE BODY --- 
                                */}
                <div className="p-8 pt-10 flex flex-col h-full bg-[#F5F7FA] relative">
                  {/* Connector Graphic - Lighter Shadow */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-transparent shadow-[-10px_-10px_0_#F5F7FA] rounded-tl-[2rem] z-20 pointer-events-none transform rotate-180 translate-y-[-1px]" />

                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                    {adv.description}
                  </p>

                  {/* Feature List */}
                  <ul className="space-y-4 mb-8">
                    {adv.features.map((feature, fIndex) => (
                      <li
                        key={fIndex}
                        className="flex items-start gap-3 group/item"
                      >
                        <div
                          className={`
                                                    flex-shrink-0 mt-0.5 w-4 h-4 rounded-full 
                                                    bg-slate-200 flex items-center justify-center
                                                    group-hover/item:bg-gradient-to-r ${adv.color}
                                                    transition-all duration-300
                                                `}
                        >
                          <Tick01Icon
                            size={10}
                            className="text-white opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-sm font-bold text-slate-400 group-hover/item:text-slate-600 transition-colors">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Interactive Footer */}
                  <div className="mt-auto pt-6 border-t border-slate-200/60">
                    <button className="flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-blue-500 transition-colors duration-300 group/btn">
                      Explore Solution
                      <ArrowRight01Icon
                        size={16}
                        className="transform group-hover/btn:translate-x-1.5 transition-transform duration-300"
                      />
                    </button>
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
