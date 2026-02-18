"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  AnimatePresence,
  PanInfo,
} from "framer-motion";
import Image from "next/image";
import {
  CodeIcon,
  SmartPhone01Icon,
  AiCloud01Icon,
  CloudServerIcon,
  SecurityIcon,
  Layers01Icon,
  ArrowRight01Icon,
  RocketIcon,
  Database01Icon,
  Configuration01Icon,
  Cancel01Icon,
  CpuIcon,
} from "@hugeicons/react";

// --- HELPERS ---
const useMousePosition = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return { mouseX, mouseY };
};

// --- 1. ENHANCED HERO SECTION ---
function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [introPhase, setIntroPhase] = useState(1); // 1: Starts already flipped (back side visible)
  const { mouseX, mouseY } = useMousePosition();

  React.useEffect(() => {
    // 1. Start Expand BG and Scaling Text immediately after mount
    const timer1 = setTimeout(() => setIntroPhase(2), 100);
    // 2. Retract back to front (Main shape)
    const timer2 = setTimeout(() => setIntroPhase(3), 2500);
    // 3. Move to side and reveal hero text
    const timer3 = setTimeout(() => setIntroPhase(4), 3700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <section className="relative w-full h-screen bg-[#f8fafc] overflow-hidden flex items-center justify-center font-sans">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]" />
      </div>

      {/* 0. Full Screen Expansion Background (Liquid Effect) */}
      <motion.div
        animate={{
          scale: introPhase === 2 ? 15 : 0,
          opacity: introPhase === 2 ? 1 : 0,
        }}
        transition={{
          duration: 1.2,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="absolute w-[200px] h-[200px] bg-slate-900 rounded-full z-40 pointer-events-none"
      />

      {/* 2. HERO CONTENT CONTAINER */}
      <div className="relative z-[100] w-full max-w-7xl px-6 flex flex-col md:flex-row-reverse items-center justify-center gap-12 md:gap-10">
        {/* LOGO DISK CONTAINER */}
        <motion.div
          animate={{
            x: introPhase === 4 ? (window.innerWidth > 768 ? 80 : 0) : 0,
            y: introPhase === 4 ? (window.innerWidth <= 768 ? -80 : 0) : 0,
            scale: introPhase === 4 ? 0.75 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 45,
            damping: 20,
            mass: 1.2,
          }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            animate={{
              opacity:
                isHovered || (introPhase > 0 && introPhase < 3) ? 0.4 : 1,
              scale: introPhase === 2 ? 3 : isHovered ? 1.2 : 1,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px]"
          />

          <div
            className="relative w-64 h-64 md:w-80 md:h-80 perspective-1000 cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              animate={{
                rotateY: introPhase === 1 || introPhase === 2 ? 180 : 0,
                scale: introPhase === 2 ? 1.5 : 1,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="relative w-full h-full rounded-full transform-style-3d"
            >
              {/* FRONT */}
              <div className="absolute inset-0 flex items-center justify-center bg-white rounded-full p-8 clay-disk backface-hidden z-20">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={400}
                  height={400}
                  className="w-full h-auto p-4 scale-150"
                />
              </div>

              {/* BACK */}
              <div className="absolute inset-0 flex items-center justify-center rotateY-180 backface-hidden">
                <div className="absolute inset-0 rounded-full bg-slate-900 border-4 border-blue-500/20 clay-disk-dark overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 via-transparent to-transparent opacity-50" />
                </div>
                <motion.div
                  animate={{
                    scale: introPhase === 2 ? 1.8 : 1,
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative z-10 text-center"
                >
                  <motion.h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none italic">
                    AASHITA <br />
                    <span className="text-blue-400 not-italic text-2xl tracking-[0.3em] block mt-2">
                      IS FUTURE
                    </span>
                  </motion.h2>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* HERO TEXT BLOCK (Appears in Phase 4) */}
        <AnimatePresence>
          {introPhase === 4 && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.25,
                    delayChildren: 0.6,
                  },
                },
              }}
              className="flex-1 text-center md:text-left"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Leading Digital Evolution
              </motion.div>

              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 50, filter: "blur(12px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                      duration: 1.6,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.1,
                    },
                  },
                }}
                className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]"
              >
                Empowering the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Digital Frontier
                </span>
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="text-xl text-slate-600 mb-10 max-w-2xl font-medium leading-relaxed"
              >
                Aashita Technosoft delivers next-generation AI, cloud solutions,
                and custom product engineering to transform your vision into
                scalable digital reality.
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 1.2, ease: "easeOut" },
                  },
                }}
                className="flex flex-wrap items-center justify-center md:justify-start gap-4"
              >
                <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">
                  View Our Services
                </button>
                <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all hover:border-blue-200">
                  Contact Us
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotateY-180 {
          transform: rotateY(180deg);
        }
        .clay-disk {
          box-shadow:
            inset 0 -10px 20px rgba(0, 0, 0, 0.05),
            inset 0 10px 20px rgba(255, 255, 255, 1),
            0 30px 60px rgba(0, 0, 0, 0.15);
        }
        .clay-disk-dark {
          box-shadow:
            inset 0 -10px 20px rgba(0, 0, 0, 0.8),
            inset 0 2px 10px rgba(255, 255, 255, 0.1),
            0 30px 60px rgba(0, 0, 0, 0.5);
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
    </section>
  );
}

// --- 2. REDESIGNED SERVICES CAROUSEL (3D Swipeable) ---
const SERVICES = [
  {
    title: "Web Solutions",
    desc: "Next-gen web apps built with speed and scalability.",
    icon: CodeIcon,
    color: "from-blue-400 to-indigo-300",
    id: "web",
    shadow: "shadow-blue-400/10",
  },
  {
    title: "Mobile Ecology",
    desc: "Native-feel experiences across iOS and Android.",
    icon: SmartPhone01Icon,
    color: "from-rose-400 to-orange-300",
    id: "mobile",
    shadow: "shadow-rose-400/10",
  },
  {
    title: "AI & Intelligence",
    desc: "Data-driven automation and smart algorithms.",
    icon: AiCloud01Icon,
    color: "from-purple-400 to-violet-300",
    id: "ai",
    shadow: "shadow-purple-400/10",
  },
  {
    title: "Cloud Ops",
    desc: "Resilient infrastructure for 99.99% uptime.",
    icon: CloudServerIcon,
    color: "from-cyan-400 to-blue-300",
    id: "cloud",
    shadow: "shadow-cyan-400/10",
  },
  {
    title: "Cyber Security",
    desc: "Protecting your digital assets with advanced protocols.",
    icon: SecurityIcon,
    color: "from-emerald-400 to-teal-300",
    id: "security",
    shadow: "shadow-emerald-400/10",
  },
];

const ServiceCardAnimation = ({ id, color }: { id: string; color: string }) => {
  const [particles, setParticles] = React.useState<any[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const newParticles = [...Array(12)].map(() => ({
      x1: Math.random() * 400,
      x2: Math.random() * 400,
      y1: Math.random() * 500,
      y2: Math.random() * 500,
      duration: 5 + Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  // Mapping ids to base tailwind colors for stroke and particles
  const colorMap: Record<string, string> = {
    web: "blue",
    mobile: "rose",
    ai: "purple",
    cloud: "cyan",
    security: "emerald",
  };
  const baseColor = colorMap[id] || "blue";

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20`}
      />

      {/* Wavy Lines Animation */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        {[...Array(3)].map((_, i) => (
          <motion.path
            key={i}
            d={`M -50 ${150 + i * 60} Q 150 ${50 + i * 20} 300 ${200 + i * 30} T 650 ${150 + i * 50}`}
            fill="none"
            stroke="currentColor"
            className={`text-${baseColor}-500/10`}
            strokeWidth="2"
            animate={{
              d: [
                `M -50 ${150 + i * 60} Q 150 ${50 + i * 20} 300 ${200 + i * 30} T 650 ${150 + i * 50}`,
                `M -50 ${200 + i * 50} Q 150 ${250 + i * 40} 300 ${150 + i * 60} T 650 ${200 + i * 40}`,
                `M -50 ${150 + i * 60} Q 150 ${50 + i * 20} 300 ${200 + i * 30} T 650 ${150 + i * 50}`,
              ],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-${baseColor}-400/20 rounded-full`}
            animate={{
              x: [p.x1, p.x2],
              y: [p.y1, p.y2],
              opacity: [0, 0.5, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Dot = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
  const dotRef = useRef<HTMLDivElement>(null);

  const moveX = useSpring(
    useTransform(mouseX, (currX: number) => {
      if (!dotRef.current) return 0;
      const rect = dotRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const dist = currX - centerX;
      const power = 30; // Max displacement
      if (Math.abs(dist) < 150) {
        return (dist / 150) * -power; // Move away from mouse
      }
      return 0;
    }),
    { stiffness: 150, damping: 15 },
  );

  const moveY = useSpring(
    useTransform(mouseY, (currY: number) => {
      if (!dotRef.current) return 0;
      const rect = dotRef.current.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const dist = currY - centerY;
      const power = 30;
      if (Math.abs(dist) < 150) {
        return (dist / 150) * -power;
      }
      return 0;
    }),
    { stiffness: 150, damping: 15 },
  );

  return (
    <motion.div
      ref={dotRef}
      style={{ x: moveX, y: moveY }}
      className="w-1.5 h-1.5 rounded-full bg-slate-200 shadow-sm"
    />
  );
};

function ServicesList() {
  const { mouseX, mouseY } = useMousePosition();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="py-32 bg-white relative overflow-hidden min-h-screen"
    >
      {/* 1. INTERACTIVE MOUSE-FOLLOWING BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Mouse Following Spotlight Glow */}
        <motion.div
          className="absolute inset-0 z-[1] opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(37, 99, 235, 0.15),
                transparent 80%
              )
            `,
          }}
        />

        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-[100px] -mr-48 -mt-48"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-100/60 rounded-full blur-[80px] -ml-32 -mb-32"
        />

        {/* Interactive Magnetic Grid */}
        <div className="absolute inset-0 flex flex-wrap gap-12 p-8 justify-center items-center opacity-60">
          {[...Array(200)].map((_, i) => (
            <Dot key={i} mouseX={mouseX} mouseY={mouseY} />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-sm tracking-widest uppercase mb-6 inline-block border border-blue-100/50">
              Our Expertise
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">
              Solutions that <span className="text-blue-600">Scale.</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed font-medium">
              We combine deep technical expertise with strategic thinking to
              deliver high-impact digital products.
            </p>
          </motion.div>
        </div>

        {/* ALTERNATING PILLS LAYOUT */}
        <div className="max-w-5xl mx-auto flex flex-col gap-12 relative">
          {SERVICES.map((service, index) => {
            const isEven = index % 2 === 0;
            const colorMap: Record<string, string> = {
              web: "blue",
              mobile: "rose",
              ai: "purple",
              cloud: "cyan",
              security: "emerald",
            };
            const themeColor = colorMap[service.id] || "blue";

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`relative flex items-center ${isEven ? "justify-start" : "justify-end"}`}
              >
                {/* Suspension String (Joins Card) */}
                <div
                  className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] bg-slate-200 z-0
                    ${isEven ? "left-[85%] lg:left-[90%] right-0" : "right-[85%] lg:right-[90%] left-0"}
                  `}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full bg-gradient-to-r ${isEven ? `from-${themeColor}-400/50 to-transparent` : `to-${themeColor}-400/50 from-transparent`}`}
                  />
                </div>

                {/* THE PILL CARD (Suspended Look with Animated Border) */}
                <motion.div
                  whileHover={{
                    y: -5,
                    rotate: isEven ? 0.5 : -0.5,
                    scale: 1.005,
                  }}
                  className={`group relative w-full md:w-[85%] lg:w-[90%] rounded-full p-[2px] transition-all duration-500 cursor-pointer
                    ${isEven ? "mr-auto" : "ml-auto"}
                    shadow-lg shadow-slate-200/20
                  `}
                >
                  {/* CONTINUOUS COLOR-CHANGING BORDER LAYER */}
                  <motion.div
                    animate={{
                      background: [
                        `linear-gradient(0deg, var(--c1), var(--c2))`,
                        `linear-gradient(90deg, var(--c1), var(--c2))`,
                        `linear-gradient(180deg, var(--c1), var(--c2))`,
                        `linear-gradient(270deg, var(--c1), var(--c2))`,
                        `linear-gradient(360deg, var(--c1), var(--c2))`,
                      ],
                    }}
                    style={
                      {
                        // Use CSS variables for the theme colors
                        // @ts-ignore
                        "--c1": `var(--tw-color-${themeColor}-400, #3b82f6)`,
                        // @ts-ignore
                        "--c2": `var(--tw-color-${themeColor}-600, #2563eb)`,
                        // Fallback if tailwind vars aren't available in style prop
                        backgroundImage: `linear-gradient(to right, var(--color-1), var(--color-2))`,
                      } as any
                    }
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 rounded-full"
                  />

                  {/* Tailwind doesn't easily expose colors as CSS vars in style prop this way, 
                      so let's use a standard color map for the animation */}
                  {(() => {
                    const colors: Record<string, [string, string, string]> = {
                      blue: ["#60a5fa", "#3b82f6", "#2563eb"],
                      rose: ["#fb7185", "#f43f5e", "#e11d48"],
                      purple: ["#c084fc", "#a855f7", "#9333ea"],
                      cyan: ["#22d3ee", "#06b6d4", "#0891b2"],
                      emerald: ["#34d399", "#10b981", "#059669"],
                    };
                    const [c1, c2, c3] = colors[themeColor] || colors.blue;

                    return (
                      <motion.div
                        animate={{
                          background: [
                            `linear-gradient(0deg, ${c1}, ${c2}, ${c3})`,
                            `linear-gradient(90deg, ${c1}, ${c2}, ${c3})`,
                            `linear-gradient(180deg, ${c1}, ${c2}, ${c3})`,
                            `linear-gradient(270deg, ${c1}, ${c2}, ${c3})`,
                            `linear-gradient(360deg, ${c1}, ${c2}, ${c3})`,
                          ],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 rounded-full"
                      />
                    );
                  })()}

                  {/* Subtle Color Fill on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 z-[1]`}
                  />

                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-12 py-5 px-10 md:py-6 md:px-14 bg-white/95 backdrop-blur-md rounded-full group-hover:bg-white/60 transition-colors">
                    {/* Icon Container */}
                    <div
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-50 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12
                      text-${themeColor}-600 shadow-inner group-hover:bg-white
                    `}
                    >
                      <service.icon size={28} strokeWidth={1.5} />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                        <span
                          className={`text-xs font-bold text-${themeColor}-400 tracking-widest uppercase`}
                        >
                          0{index + 1}
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-slate-800 group-hover:text-blue-700 transition-colors">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                        {service.desc}
                      </p>
                    </div>

                    {/* Attachment Knob */}
                    <div
                      className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-${themeColor}-400 z-20 
                      ${isEven ? "-right-1.5" : "-left-1.5"}
                    `}
                    />

                    <div className="shrink-0 flex items-center justify-center">
                      <motion.div
                        className={`w-12 h-12 rounded-full border-2 border-${themeColor}-100 bg-white text-${themeColor}-600 flex items-center justify-center transition-all duration-500 group-hover:bg-${themeColor}-600 group-hover:text-white group-hover:border-${themeColor}-600 group-hover:shadow-lg group-hover:shadow-${themeColor}-500/30`}
                      >
                        <ArrowRight01Icon size={20} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- 3. REDESIGNED WORK PROCESS (Connected Clay Path) ---
const PROCESS = [
  { title: "Discovery", icon: Layers01Icon, color: "bg-blue-500" },
  { title: "Design", icon: Configuration01Icon, color: "bg-indigo-500" },
  { title: "Build", icon: CodeIcon, color: "bg-cyan-500" },
  { title: "Scale", icon: RocketIcon, color: "bg-blue-600" },
];

function WorkProcess() {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6">
            Our Creative <span className="text-blue-400">Blueprint</span>
          </h2>
          <div className="w-24 h-2 bg-blue-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[40%] left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0" />

          {PROCESS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div
                className={`w-24 h-24 rounded-full ${p.color} flex items-center justify-center mb-6 clay-process shadow-[0_0_40px_rgba(59,130,246,0.3)] group-hover:scale-110 transition-transform`}
              >
                <p.icon size={36} className="text-white" />
              </div>
              <h3 className="text-2xl font-black mb-2 tracking-tight">
                {p.title}
              </h3>
              <p className="text-slate-400 text-sm">Phase 0{i + 1}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .clay-process {
          box-shadow:
            inset 0 -8px 15px rgba(0, 0, 0, 0.2),
            inset 0 8px 15px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
}

// --- 4. TECHNOLOGY MASTERY ---
const TECHS = [
  {
    id: "frontend",
    name: "Frontend",
    tagline: "Immersive User Interfaces",
    items: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Three.js",
      "Framer Motion",
      "TypeScript",
    ],
    icon: <Layers01Icon />,
    color: "#3b82f6",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    id: "backend",
    name: "Backend",
    tagline: "Robust Core Architecture",
    items: ["Node.js", "Go Lang", "Python", "PostgreSQL", "Redis", "GraphQL"],
    icon: <Database01Icon />,
    color: "#6366f1",
    gradient: "from-indigo-500 to-purple-400",
  },
  {
    id: "ai",
    name: "Intelligence",
    tagline: "Neural & Cognitive Power",
    items: ["TensorFlow", "OpenAI API", "PyTorch", "LangChain", "Vector DBs"],
    icon: <AiCloud01Icon />,
    color: "#a855f7",
    gradient: "from-purple-500 to-pink-400",
  },
  {
    id: "infra",
    name: "Infrastructure",
    tagline: "Scalable Cloud Systems",
    items: [
      "AWS",
      "Kubernetes",
      "Docker",
      "Terraform",
      "Nginx",
      "CI/CD Pipelines",
    ],
    icon: <CloudServerIcon />,
    color: "#06b6d4",
    gradient: "from-cyan-500 to-emerald-400",
  },
];

function TechStack() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Prevent scroll when modal is open
  React.useEffect(() => {
    if (selectedId) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [selectedId]);

  const activeTech = TECHS.find((t) => t.id === selectedId);

  return (
    <section className="py-32 bg-[#f8fafc] relative overflow-hidden min-h-screen">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-20 text-center lg:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter"
          >
            Technology <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Mastery.
            </span>
          </motion.h2>
          <p className="mt-6 text-slate-500 text-lg max-w-xl">
            Click on a specialization to explore the cutting-edge tools we use
            to build the future.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TECHS.map((t) => (
            <CategoryCard
              key={t.id}
              data={t}
              onClick={() => setSelectedId(t.id)}
            />
          ))}
        </div>
      </div>

      {/* Pop-up Overlay */}
      <AnimatePresence>
        {selectedId && activeTech && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Expanded Card */}
            <motion.div
              layoutId={selectedId}
              style={{ border: `2px solid ${activeTech.color}33` }}
              className="relative w-full max-w-3xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Left Side: Branding */}
              <div
                className={`w-full md:w-2/5 p-10 bg-gradient-to-br ${activeTech.gradient} text-white flex flex-col justify-between`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center shadow-inner"
                >
                  {React.cloneElement(
                    activeTech.icon as React.ReactElement,
                    { size: 40 } as any,
                  )}
                </motion.div>
                <div>
                  <h3 className="text-4xl font-black mb-2">
                    {activeTech.name}
                  </h3>
                  <p className="text-white/80 font-medium">
                    {activeTech.tagline}
                  </p>
                </div>
              </div>

              {/* Right Side: Tech List */}
              <div className="w-full md:w-3/5 p-10 md:p-14 bg-white relative">
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-900"
                >
                  <Cancel01Icon size={24} />
                </button>

                <h4 className="text-slate-400 uppercase tracking-widest text-xs font-bold mb-8">
                  The Stack
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {activeTech.items.map((item, idx) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-blue-200 hover:bg-white transition-all shadow-sm hover:shadow-md"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
                      <span className="font-bold text-slate-700">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CategoryCard({ data, onClick }: { data: any; onClick: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  return (
    <motion.div
      layoutId={data.id}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        border: `2px solid ${data.color}44`,
        backgroundColor: `${data.color}05`,
      }}
      whileHover={{
        borderColor: `${data.color}99`,
        backgroundColor: `${data.color}08`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onClick={onClick}
      className="relative bg-white p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] cursor-pointer group hover:shadow-[0_40px_80px_rgba(0,0,0,0.07)] transition-all duration-300 overflow-hidden"
    >
      {/* Decorative Gradient Blob */}
      <div
        className={`absolute -top-12 -right-12 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-br ${data.gradient}`}
      />

      <motion.div
        style={{ transform: "translateZ(50px)" }}
        className="w-20 h-20 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner mb-8"
      >
        {React.cloneElement(data.icon, { size: 40 } as any)}
      </motion.div>

      <div style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-3xl font-black text-slate-900 mb-2">{data.name}</h3>
        <p className="text-slate-400 text-sm font-medium mb-6">Expertise Hub</p>

        <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm">
          EXPLORE{" "}
          <ArrowRight01Icon
            size={18}
            className="group-hover:translate-x-2 transition-transform"
          />
        </div>
      </div>
    </motion.div>
  );
}

// --- MAIN PAGE ---
export default function ServicesPage() {
  return (
    <main className="bg-white selection:bg-blue-100 selection:text-blue-900">
      <HeroSection />
      <ServicesList />
      <WorkProcess />
      <TechStack />

      {/* FINAL CTA SECTION - Minimal & Aesthetic */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle Background Interaction */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px]"
          />
        </div>

        <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-blue-500 font-bold tracking-[0.2em] uppercase text-sm mb-6 block">
              Let&apos;s Create Something Great
            </span>
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tight leading-[0.9]">
              Ready to build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 bg-[length:200%_auto] animate-gradient">
                the future?
              </span>
            </h2>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button className="relative group px-12 py-6 bg-slate-900 text-white rounded-full font-bold text-xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)]">
                <span className="relative z-10 flex items-center gap-3">
                  Start Your Project
                  <ArrowRight01Icon className="group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </motion.div>

            <div className="mt-12 flex items-center justify-center gap-8 opacity-40">
              <div className="w-12 h-[1px] bg-slate-400" />
              <p className="text-sm font-medium text-slate-500 tracking-widest uppercase">
                AASHITA IS FUTURE
              </p>
              <div className="w-12 h-[1px] bg-slate-400" />
            </div>
          </motion.div>
        </div>

        <style jsx>{`
          @keyframes gradient {
            0% {
              background-position: 0% center;
            }
            50% {
              background-position: 100% center;
            }
            100% {
              background-position: 0% center;
            }
          }
          .animate-gradient {
            animation: gradient 5s ease infinite;
          }
        `}</style>
      </section>
    </main>
  );
}
