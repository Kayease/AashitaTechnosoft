"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useTime,
} from "framer-motion";
import {
  ArrowRight01Icon,
  CpuIcon,
  Globe02Icon,
  ZapIcon,
  Layers01Icon,
  Rocket01Icon,
  UserGroupIcon,
  ComputerVideoIcon,
  Certificate01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  StarIcon,
  SmileIcon,
  CodeCircleIcon,
  PaintBoardIcon,
  ArrowUpRight01Icon,
  PassportIcon,
  Database01Icon,
  SecurityIcon, // Added SecurityIcon
  AiCloud01Icon,
  Search01Icon, // Added Search01Icon
  Settings02Icon,
} from "@hugeicons/react";
import Stepper, { Step } from "@/components/ui/Stepper/Stepper";
import PixelBlast from "@/components/creative/PixelBlast/PixelBlast";
import BounceCards from "@/components/creative/BounceCards";
import { gsap } from "gsap";

// --- Configuration ---
const ROLES = [
  {
    title: "Software Developer",
    icon: CpuIcon,
    color: "from-blue-600 to-indigo-700",
    description: "Build logic, scale systems.",
  },
  {
    title: "Data Scientist",
    icon: Globe02Icon,
    color: "from-teal-500 to-emerald-700",
    description: "Insights from raw data.",
  },
  {
    title: "ML Engineer",
    icon: ZapIcon,
    color: "from-indigo-600 to-violet-800",
    description: "Train the future AI.",
  },
  {
    title: "Cyber Security",
    icon: Layers01Icon,
    color: "from-rose-500 to-red-700",
    description: "Protect the ecosystem.",
  },
  {
    title: "Cloud Architect",
    icon: CpuIcon,
    color: "from-amber-500 to-orange-700",
    description: "Scalable infra master.",
  },
  {
    title: "DevOps Expert",
    icon: ZapIcon,
    color: "from-cyan-500 to-sky-700",
    description: "Efficiency at scale.",
  },
  {
    title: "UI/UX Designer",
    icon: Globe02Icon,
    color: "from-violet-600 to-purple-800",
    description: "Crafting experiences.",
  },
  {
    title: "Product Head",
    icon: Layers01Icon,
    color: "from-emerald-500 to-teal-700",
    description: "Leading the vision.",
  },
  {
    title: "AI Researcher",
    icon: CpuIcon,
    color: "from-slate-800 to-slate-950",
    description: "Pushing AI limits.",
  },
];

const GRID_ITEMS = Array.from({ length: 9 }).map((_, i) => {
  const row = Math.floor(i / 3) + 1;
  const col = (i % 3) + 1;
  return {
    id: i,
    image: `/aashita grid images/row-${row}-column-${col}.png`,
    ...ROLES[i],
  };
});

const JOB_ROLES = [
  {
    id: 1,
    title: "AI Lead",
    icon: AiCloud01Icon,
    color: "#3B82F6",
    desc: "Orchestrate next-gen neural ecosystems.",
    gradient: "from-blue-500/20 to-blue-500/5",
  },
  {
    id: 2,
    title: "Cloud Ops",
    icon: Globe02Icon,
    color: "#A855F7",
    desc: "Build the invisible elastic backbone.",
    gradient: "from-purple-500/20 to-purple-500/5",
  },
  {
    id: 3,
    title: "UX Vision",
    icon: PaintBoardIcon,
    color: "#F43F5E",
    desc: "Define the aesthetic of automation.",
    gradient: "from-rose-500/20 to-rose-500/5",
  },
  {
    id: 4,
    title: "Security",
    icon: SecurityIcon,
    color: "#10B981",
    desc: "Guard the fort against entropy.",
    gradient: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    id: 5,
    title: "Product",
    icon: Layers01Icon,
    color: "#F59E0B",
    desc: "Vision from concept to deployment.",
    gradient: "from-amber-500/20 to-amber-500/5",
  },
  {
    id: 6,
    title: "ML Engineer",
    icon: CpuIcon,
    color: "#6366F1",
    desc: "Teach the machine to think deeper.",
    gradient: "from-indigo-500/20 to-indigo-500/5",
  },
];

// Cover + Culture pages for the 3D book
const BOOK_PAGES = [
  {
    id: 0,
    type: "cover",
    title: "Life Here Isn't Corporate.",
    subtitle: "It's A Story We Write Together.",
    desc: "Open the book to explore our culture and values.",
  },
  {
    id: 1,
    type: "content",
    title: "Collaborative Spirit",
    desc: "We don't work in silos. We build together. Cross-functional teams unite to create breakthrough innovations and transformative solutions.",
    icon: UserGroupIcon,
    gradient: "from-blue-400 via-blue-500 to-indigo-600",
    accentColor: "#3b82f6",
  },
  {
    id: 2,
    type: "content",
    title: "Innovation First",
    desc: "Hackathons every month. New ideas win. We celebrate creative problem-solving, encourage experimentation, and reward breakthrough thinking.",
    icon: ZapIcon,
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    accentColor: "#06b6d4",
  },
  {
    id: 3,
    type: "content",
    title: "Flexible Life",
    desc: "Remote-first options. Work where you thrive. Balance is not a perk or a luxury—it's the very foundation of our culture.",
    icon: Globe02Icon,
    gradient: "from-teal-400 via-cyan-500 to-blue-600",
    accentColor: "#14b8a6",
  },
  {
    id: 4,
    type: "content",
    title: "Growth Mindset",
    desc: "Paid certifications and mentorship programs. Continuous learning opportunities. Your professional success is our collective investment.",
    icon: Rocket01Icon,
    gradient: "from-indigo-400 via-blue-500 to-cyan-600",
    accentColor: "#6366f1",
  },
];

// --- CLAYMORPHISM UTILITY STYLES ---
const CLAY_CARD_CLASSES =
  "bg-white rounded-[2rem] shadow-[10px_10px_30px_rgba(174,174,192,0.4),-10px_-10px_30px_rgba(255,255,255,1)] border border-white/40 relative overflow-hidden";
const CLAY_BUTTON_CLASSES =
  "relative px-8 py-4 rounded-[1.5rem] bg-gradient-to-b from-blue-500 to-blue-600 text-white font-bold shadow-[8px_8px_16px_rgba(59,130,246,0.3),-4px_-4px_12px_rgba(255,255,255,0.2)] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)] transition-all active:scale-95";

export default function CareerPage() {
  const [activeHireStep, setActiveHireStep] = useState(1);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const absX = useMotionValue(0);
  const absY = useMotionValue(0);

  const STEP_COLORS = ["#3b82f6", "#14b8a6", "#f97316", "#4f46e5"];

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const springAbsX = useSpring(absX, { stiffness: 100, damping: 30 });
  const springAbsY = useSpring(absY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
      absX.set(e.clientX);
      absY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, absX, absY]);

  const glowX = useTransform(springX, (v) => v * 100);
  const glowY = useTransform(springY, (v) => v * 100);
  const spotlightHue = useTransform(springAbsX, [0, 2000], [0, 360]);

  return (
    <main className="bg-[#f0f4f8] text-slate-800 font-sans selection:bg-sky-200 selection:text-sky-900">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center justify-center py-20 lg:py-0 overflow-hidden">
        {/* INTERACTIVE BACKGROUND */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            style={{
              x: springAbsX,
              y: springAbsY,
              filter: useTransform(spotlightHue, (h) => `hue-rotate(${h}deg)`),
            }}
            className="fixed inset-0 pointer-events-none z-10 opacity-60"
          >
            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-400/20 rounded-full blur-[100px]" />
            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-400/20 rounded-full blur-[60px]" />
          </motion.div>

          <motion.div
            style={{ x: glowX, y: glowY, opacity: 0.05 }}
            className="absolute inset-[-10%] z-0"
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `linear-gradient(#0ea5e9 1.5px, transparent 1.5px), linear-gradient(90deg, #0ea5e9 1.5px, transparent 1.5px)`,
                backgroundSize: "60px 60px",
              }}
            />
          </motion.div>
        </div>

        <div className="container relative z-20 mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
            {/* LEFT: FLIPPING GRID */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute -top-10 -left-10 w-full h-full bg-blue-100/40 rounded-full blur-3xl -z-10" />
              <div className="grid grid-cols-3 gap-2 max-w-[550px] mx-auto p-4 bg-white/20 backdrop-blur-sm rounded-[2.5rem] shadow-xl border border-white/40">
                {GRID_ITEMS.map((item) => (
                  <FlipTile key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* RIGHT: TYPOGRAPHY */}
            <div className="order-1 lg:order-2 space-y-10">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-6xl md:text-[5.5rem] font-black tracking-tight text-slate-900 leading-[0.9] uppercase drop-shadow-sm">
                  BUILD THE
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-500 to-indigo-600">
                    FUTURE
                  </span>
                  <br />
                  OF AI.
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-6 max-w-lg"
              >
                <p className="text-lg text-slate-500 leading-relaxed pl-6 border-l-[6px] border-sky-200 rounded-sm">
                  Join a culture of engineering excellence. Architect the next
                  generation of{" "}
                  <span className="font-bold text-slate-900">
                    intelligent systems
                  </span>
                  .
                </p>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-10 py-5 rounded-[2rem] bg-slate-900 text-white font-bold uppercase tracking-wider shadow-2xl overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      View Open Roles{" "}
                      <ArrowRight01Icon
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY JOIN US ================= */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader
            title="Why Work With Us?"
            subtitle="More than just a job. It's a calling."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <FeatureCard
              icon={Rocket01Icon}
              title="Real Impact"
              desc="Your work ships. Your ideas matter. No cog-in-the-machine feelings here."
              delay={0}
            />
            <FeatureCard
              icon={UserGroupIcon}
              title="Growth First"
              desc="We invest in learning, mentorship, and real career progression."
              delay={0.1}
            />
            <FeatureCard
              icon={Certificate01Icon}
              title="Ownership"
              desc="No micromanagement. Just trust, accountability, and freedom."
              delay={0.2}
            />
            <FeatureCard
              icon={ComputerVideoIcon}
              title="Modern Tech"
              desc="Work with the latest tools and AI stacks, not outdated legacy systems."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ================= CULTURE YIN-YANG LIGHT SECTION ================= */}
      <CultureYinYangSection />

      {/* ================= HOW WE HIRE SECTION ================= */}
      <section className="py-24 bg-[#f8faff] relative overflow-hidden">
        {/* --- PREMIUM BACKGROUND SYSTEM --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Modern Dot Grid */}
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1.2px)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Linear Geometric Grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1.2px), linear-gradient(90deg, #3b82f6 1px, transparent 1.2px)`,
              backgroundSize: "96px 96px",
            }}
          />

          {/* Cinematic Radial Mask */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#f8faff_95%)]" />

          {/* Animated Glow Sources */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] mix-blend-multiply"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-100 rounded-full blur-[100px] mix-blend-multiply"
          />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-slate-800 tracking-tight mb-4">
              How We <span className="text-blue-600">Hire</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto text-lg">
              Our journey together begins with a transparent and thoughtful
              process.
            </p>
          </div>

          <div className="mt-16">
            <Stepper
              initialStep={1}
              onStepChange={(step) => setActiveHireStep(step)}
              onFinalStepCompleted={() => setActiveHireStep(1)}
              indicatorColors={STEP_COLORS}
              nextButtonText="Next"
              background={
                <PixelBlast
                  variant="square"
                  pixelSize={10}
                  color={STEP_COLORS[activeHireStep - 1] || STEP_COLORS[0]}
                  patternScale={2}
                  patternDensity={1.2}
                  pixelSizeJitter={0.1}
                  enableRipples={true}
                  rippleSpeed={0.4}
                  rippleThickness={0.12}
                  rippleIntensityScale={2}
                  liquid={true}
                  liquidStrength={0.1}
                  liquidRadius={1.5}
                  speed={0.5}
                  edgeFade={0.4}
                  transparent={true}
                  style={{ opacity: 0.6 }}
                />
              }
            >
              {/* --- STEP 1 --- */}
              <Step>
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    {/* Claymorphic Icon Container */}
                    <div
                      className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center mb-8 
                                  shadow-[20px_20px_40px_#d1d9e6,-20px_-20px_40px_#ffffff] 
                                  border-4 border-blue-500/50 relative z-10 transition-transform duration-300 group-hover:scale-110"
                    >
                      <div className="text-blue-500 transform -rotate-12 group-hover:rotate-0 transition-transform">
                        <Rocket01Icon size={56} variant="bulk" />
                      </div>
                    </div>
                    {/* Accent Blob */}
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full shadow-lg z-0" />
                  </div>

                  <div
                    className="max-w-4xl bg-white/60 backdrop-blur-md p-10 rounded-[3rem] 
                                shadow-[15px_15px_30px_#cad2e0,inset_5px_5px_10px_#ffffff] 
                                border border-white/40 text-center relative overflow-hidden"
                  >
                    {/* Creative Background Accents */}
                    <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl" />
                    <div className="absolute -top-12 -left-12 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl" />
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

                    <h3 className="text-3xl font-extrabold text-slate-900 mb-4 relative z-10">
                      Application Review
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed font-medium relative z-10">
                      We don't just look for buzzwords. We look for{" "}
                      <span className="text-blue-600 font-bold">passion</span>,
                      curiosity, and a deep understanding of your craft. Our
                      engineering team reviews every application personally.
                    </p>
                  </div>
                </div>
              </Step>

              {/* --- STEP 2 --- */}
              <Step>
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div
                      className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center mb-8 
                                  shadow-[20px_20px_40px_#d1d9e6,-20px_-20px_40px_#ffffff] 
                                  border-4 border-teal-500/50 z-10 transition-all duration-300 group-hover:rotate-6"
                    >
                      <div className="text-teal-500">
                        <Globe02Icon size={56} variant="bulk" />
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-teal-400 rounded-2xl rotate-12 shadow-lg" />
                  </div>

                  <div
                    className="max-w-4xl bg-white/60 backdrop-blur-md p-10 rounded-[3rem] 
                                shadow-[15px_15px_30px_#cad2e0,inset_5px_5px_10px_#ffffff] 
                                border border-white/40 text-center relative overflow-hidden"
                  >
                    {/* Creative Background Accents */}
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl" />
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

                    <h3 className="text-3xl font-extrabold text-slate-900 mb-4 relative z-10">
                      Discovery Call
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed font-medium relative z-10">
                      A quick chat with a teammate to discuss your career
                      aspirations and our mission.
                      <span className="block mt-2 text-teal-600 italic">
                        No trick questions—just an honest conversation.
                      </span>
                    </p>
                  </div>
                </div>
              </Step>

              {/* --- STEP 3 --- */}
              <Step>
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div
                      className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center mb-8 
                                  shadow-[20px_20px_40px_#d1d9e6,-20px_-20px_40px_#ffffff] 
                                  border-4 border-orange-500/50 z-10 group-hover:scale-105 transition-all"
                    >
                      <div className="text-orange-500">
                        <ZapIcon size={56} variant="bulk" />
                      </div>
                    </div>
                    <div className="absolute top-1/2 -right-6 w-14 h-14 bg-orange-100 rounded-full blur-xl animate-pulse" />
                  </div>

                  <div
                    className="max-w-4xl bg-white/60 backdrop-blur-md p-10 rounded-[3rem] 
                                shadow-[15px_15px_30px_#cad2e0,inset_5px_5px_10px_#ffffff] 
                                border border-white/40 text-center relative overflow-hidden"
                  >
                    {/* Creative Background Accents */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-200/20 rounded-full blur-[80px]" />
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

                    <h3 className="text-3xl font-extrabold text-slate-900 mb-4 relative z-10">
                      Technical Deep-Dive
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed font-medium relative z-10">
                      Show us how you build. We value{" "}
                      <span className="bg-orange-100 px-2 py-1 rounded-lg text-orange-700">
                        problem-solving
                      </span>
                      over memorizing algorithms. Collaborate on real-world
                      challenges with us.
                    </p>
                  </div>
                </div>
              </Step>

              {/* --- STEP 4 --- */}
              <Step>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div
                      className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[2.5rem] flex items-center justify-center mb-8 
                                  shadow-[0_20px_40px_rgba(79,70,229,0.3)] border-4 border-indigo-500/50 overflow-hidden"
                    >
                      <div className="text-white">
                        <CheckmarkCircle02Icon size={56} variant="bulk" />
                      </div>
                      {/* Inner light glare for clay effect */}
                      <div className="absolute top-2 left-4 w-8 h-4 bg-white/20 rounded-full blur-sm" />
                    </div>
                  </div>

                  <div
                    className="max-w-4xl bg-white/60 backdrop-blur-md p-10 rounded-[3rem] 
                                shadow-[15px_15px_30px_#cad2e0,inset_5px_5px_10px_#ffffff] 
                                border border-white/40 text-center relative overflow-hidden"
                  >
                    {/* Creative Background Accents */}
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-500/10 to-transparent" />
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-500/5 to-transparent" />
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

                    <h3 className="text-3xl font-extrabold text-slate-900 mb-4 relative z-10">
                      Culture Fit & Offer
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed font-medium relative z-10">
                      The final step is meeting our leadership team. If there's
                      a match, we'll extend an offer to welcome you to the{" "}
                      <span className="text-indigo-600 font-black">
                        Aashita ecosystem!
                      </span>
                    </p>
                  </div>
                </div>
              </Step>
            </Stepper>
          </div>
        </div>
      </section>

      {/* ================= GROWTH & BENEFITS ================= */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50" />
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-100/20 rounded-full blur-[140px]" />

          {/* Subtle Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(#4f46e5 0.5px, transparent 0.5px)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <SectionHeader
            title="More Than Just a Job"
            subtitle="Perks that fuel your life and your career."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <BenefitCard
              title="Competitive Compensation"
              icon={StarIcon}
              color="bg-amber-100 text-amber-600"
            />
            <BenefitCard
              title="Performance Growth"
              icon={Rocket01Icon}
              color="bg-rose-100 text-rose-600"
            />
            <BenefitCard
              title="Learning Support"
              icon={Certificate01Icon}
              color="bg-indigo-100 text-indigo-600"
            />
            <BenefitCard
              title="Flexible Leave Policy"
              icon={Clock01Icon}
              color="bg-teal-100 text-teal-600"
            />
            <BenefitCard
              title="Health & Wellness"
              icon={CheckmarkCircle02Icon}
              color="bg-emerald-100 text-emerald-600"
            />
            <BenefitCard
              title="Remote Options"
              icon={Globe02Icon}
              color="bg-sky-100 text-sky-600"
            />
          </div>
        </div>
      </section>

      {/* ================= OPEN POSITIONS (COLORFUL GRID VERSION) ================= */}
      <section className="py-32 relative z-10 overflow-hidden bg-[#f0f4f8]">
        {/* INTERACTIVE BACKGROUND (MATCHING HERO) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            style={{
              x: useTransform(glowX, (v) => v * 5),
              y: useTransform(glowY, (v) => v * 5),
              filter: useTransform(spotlightHue, (h) => `hue-rotate(${h}deg)`),
            }}
            className="absolute inset-0 pointer-events-none z-10 opacity-60 flex items-center justify-center"
          >
            <div className="absolute w-[600px] h-[600px] bg-sky-400/20 rounded-full blur-[100px] -translate-x-1/4 -translate-y-1/4" />
            <div className="absolute w-[300px] h-[300px] bg-indigo-400/20 rounded-full blur-[60px] translate-x-1/4 translate-y-1/4" />
          </motion.div>

          <motion.div
            style={{ x: glowX, y: glowY, opacity: 0.05 }}
            className="absolute inset-[-10%] z-0"
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `linear-gradient(#0ea5e9 1.5px, transparent 1.5px), linear-gradient(90deg, #0ea5e9 1.5px, transparent 1.5px)`,
                backgroundSize: "60px 60px",
              }}
            />
          </motion.div>
        </div>
        <div className="container mx-auto px-6 max-w-7xl relative z-20">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-slate-100"
            >
              <Search01Icon size={16} />
              The Career Ecosystem
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-8">
              FIND YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
                DOMAIN.
              </span>
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Explore 6 unique specializations. From neural orchestration to
              cloud architecture—your next chapter starts here.
            </p>
          </div>

          <div className="flex justify-center -mt-12 overflow-visible">
            <BounceCards
              items={JOB_ROLES}
              containerWidth="100%"
              containerHeight={1000}
              animationDelay={0.5}
              animationStagger={0.1}
              enableHover={true}
              initialTransformStyles={[
                "rotate(-10deg) translate(-360px, -20px)",
                "rotate(5deg) translate(-220px, 60px)",
                "rotate(-3deg) translate(-80px, -40px)",
                "rotate(8deg) translate(80px, 40px)",
                "rotate(-5deg) translate(220px, -20px)",
                "rotate(12deg) translate(360px, 60px)",
              ]}
              transformStyles={[
                "translate(-510px, 0px) rotate(0deg)",
                "translate(-170px, -240px) rotate(0deg)",
                "translate(-170px, 240px) rotate(0deg)",
                "translate(170px, -240px) rotate(0deg)",
                "translate(170px, 240px) rotate(0deg)",
                "translate(510px, 0px) rotate(0deg)",
              ]}
              renderItem={(role, idx) => (
                <div key={role.id} className="w-[300px]">
                  <JobRoleCard role={role} index={idx} isStaggered={true} />
                </div>
              )}
            />
          </div>

          <div className="mt-24 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-blue-600 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.1)] active:shadow-inner"
            >
              Submit Open Application
            </motion.button>
          </div>
        </div>
      </section>

      {/* ================= INTERNSHIPS ================= */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div
            className={`${CLAY_CARD_CLASSES} bg-gradient-to-r from-indigo-500 to-purple-600 border-none text-white p-12 lg:p-20 text-center relative`}
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Start Your Career With Us
              </h2>
              <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                We welcome curious minds. Real projects. Real mentorship. Open
                to students and recent graduates.
              </p>
              <button className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
                View Internship Programs
              </button>
            </div>
            {/* Decor */}
            <Globe02Icon className="absolute top-10 left-10 text-white/10 w-32 h-32 rotate-12" />
            <ZapIcon className="absolute bottom-10 right-10 text-white/10 w-40 h-40 -rotate-12" />
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader
            title="From the Team"
            subtitle="Don't just take our word for it."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <TestimonialCard
              quote="I've grown more here in one year than anywhere else. The mentorship is incredible."
              author="Sarah J."
              role="Software Engineer"
            />
            <TestimonialCard
              quote="The trust and ownership culture is unmatched. You truly own your product."
              author="Mark D."
              role="Product Designer"
            />
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-32 text-center bg-[#fcfcfc] overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <h2 className="text-[20vw] font-black tracking-tighter text-slate-900">
            APPLY
          </h2>
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
              READY TO BUILD <br /> THE FUTURE?
            </h2>
            <p className="text-xl text-slate-500 mb-10">
              Your next big opportunity starts here.
            </p>

            <button className={CLAY_BUTTON_CLASSES}>
              <span className="flex items-center gap-3 text-lg">
                Apply Now <ArrowRight01Icon />
              </span>
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto space-y-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-lg text-slate-500 font-medium"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className={`${CLAY_CARD_CLASSES} p-8 flex flex-col items-center text-center group`}
    >
      <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6 shadow-inner group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
        <Icon size={32} variant="bulk" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
    </motion.div>
  );
}

function BenefitCard({ title, icon: Icon, color }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`${CLAY_CARD_CLASSES} p-6 flex items-center gap-5`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} shadow-sm`}
      >
        <Icon size={24} variant="bulk" />
      </div>
      <h4 className="font-bold text-slate-700 text-lg">{title}</h4>
    </motion.div>
  );
}

function JobCard({ title, type, loc, desc }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.01 }}
      className={`${CLAY_CARD_CLASSES} p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer group`}
    >
      <div>
        <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <div className="flex gap-4 mt-2 text-sm font-bold text-slate-400 uppercase tracking-wider">
          <span>{type}</span>
          <span className="w-px h-4 bg-slate-300" />
          <span>{loc}</span>
        </div>
        <p className="mt-4 text-slate-600 max-w-xl">{desc}</p>
      </div>

      <div className="shrink-0">
        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
          <ArrowRight01Icon />
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialCard({ quote, author, role }: any) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`${CLAY_CARD_CLASSES} p-10 relative`}
    >
      <div className="text-6xl text-sky-200 absolute top-4 left-6 font-serif">
        "
      </div>
      <p className="text-xl text-slate-700 font-medium italic relative z-10 pt-4 leading-relaxed">
        {quote}
      </p>
      <div className="mt-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-2 border-white shadow-md" />
        <div>
          <h5 className="font-bold text-slate-900">{author}</h5>
          <span className="text-sm text-sky-600 font-bold uppercase tracking-wide">
            {role}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function FlipTile({ item }: { item: any }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05, z: 50 }}
      className="relative aspect-square w-full perspective-1000 cursor-pointer group z-0 hover:z-10"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
      >
        {/* FRONT */}
        <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-[inset_2px_2px_6px_rgba(255,255,255,0.7),inset_-2px_-2px_6px_rgba(0,0,0,0.1),5px_5px_15px_rgba(0,0,0,0.1)] bg-slate-100 border border-white">
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            {item.image ? (
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover opacity-90 hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-slate-200 animate-pulse" />
            )}
          </div>
        </div>

        {/* BACK */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-2xl flex flex-col items-center justify-center p-3 text-center text-white rotateY-180 bg-gradient-to-br ${item.color} shadow-xl border border-white/20`}
        >
          <div className="mb-2 p-2 bg-white/20 rounded-full backdrop-blur-md">
            <item.icon size={20} variant="bulk" className="text-white" />
          </div>
          <p className="text-[10px] md:text-xs font-black uppercase tracking-wider">
            {item.title}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function JobRoleCard({
  role,
  index,
  isStaggered = false,
}: {
  role: any;
  index: number;
  isStaggered?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={isStaggered ? {} : { opacity: 0, y: 40 }}
      whileInView={isStaggered ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative ${isStaggered ? "w-full h-[450px]" : "h-[420px]"} rounded-[3rem] p-8 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden group border-2 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.02)]`}
      style={{ borderColor: role.color }}
    >
      {/* Dynamic Colorful Spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) =>
              `radial-gradient(600px circle at ${x}px ${y}px, ${role.color}15, transparent 40%)`,
          ),
        }}
      />

      {/* Floating Animated Shapes */}
      <motion.div
        animate={{
          y: isHovered ? [0, -10, 0] : 0,
          rotate: isHovered ? [0, 5, -5, 0] : 0,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <div
          className="w-24 h-24 rounded-[2.5rem] flex items-center justify-center mb-10 transition-all duration-500 relative"
          style={{
            backgroundColor: isHovered ? role.color : "#f8fafc",
            transform: isHovered
              ? "scale(1.1) rotate(8deg)"
              : "scale(1) rotate(0deg)",
            boxShadow: isHovered
              ? `0 20px 40px ${role.color}40, inset 0 2px 4px rgba(255,255,255,0.4)`
              : "0 10px 20px rgba(0,0,0,0.05)",
          }}
        >
          <role.icon
            size={40}
            variant="bulk"
            className={`transition-colors duration-500 ${isHovered ? "text-white" : "text-slate-400"}`}
          />

          {/* Decorative Dot */}
          <motion.div
            animate={{ scale: isHovered ? 1.5 : 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full border-4 border-white"
            style={{ backgroundColor: role.color }}
          />
        </div>
      </motion.div>

      {/* Text Content */}
      <div className="relative z-10 space-y-4">
        <h3 className="text-3xl font-black text-slate-900 tracking-tight transition-transform duration-500 group-hover:scale-105">
          {role.title}
        </h3>

        <p className="text-slate-400 font-medium leading-relaxed max-w-[220px] transition-colors duration-500 group-hover:text-slate-600">
          {role.desc}
        </p>
      </div>

      {/* CTA Button */}
      <motion.div
        animate={{
          y: isHovered ? 0 : 20,
          opacity: isHovered ? 1 : 0,
        }}
        className="absolute bottom-12 flex items-center gap-3 py-3 px-6 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-300"
        style={{
          color: role.color,
          border: `2px solid ${role.color}20`,
          backgroundColor: `${role.color}05`,
        }}
      >
        Explore Role
        <ArrowRight01Icon size={18} />
      </motion.div>

      {/* Subtle Bottom Glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: role.color }}
      />
    </motion.div>
  );
}

// --- ENHANCED 3D BOOK COMPONENT ---

function BookComponent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Auto progress through pages
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex === 0) {
        // Open the book after showing cover
        setIsOpen(true);
        setTimeout(() => {
          setActiveIndex(1);
        }, 1500); // Wait for opening animation
      } else {
        setActiveIndex((prev) => {
          const next = prev + 1;
          if (next >= BOOK_PAGES.length) {
            setIsOpen(false);
            return 0; // Back to cover
          }
          return next;
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleBookClick = () => {
    if (activeIndex === 0) {
      setIsOpen(true);
      setTimeout(() => setActiveIndex(1), 1500);
    } else {
      const next = activeIndex + 1;
      if (next >= BOOK_PAGES.length) {
        setIsOpen(false);
        setActiveIndex(0);
      } else {
        setActiveIndex(next);
      }
    }
  };

  const currentPage = BOOK_PAGES[activeIndex];
  const showCover = activeIndex === 0;

  return (
    <div className="relative w-[600px] h-[700px] md:w-[800px] md:h-[900px]">
      {/* Golden Magic Particles - Only when book is open */}
      {isOpen && activeIndex > 0 && (
        <GoldenMagicParticles activeIndex={activeIndex} />
      )}

      {/* The 3D Book */}
      <motion.div
        className="relative w-full h-full preserve-3d cursor-pointer"
        onClick={handleBookClick}
        style={{
          transformStyle: "preserve-3d",
          perspective: "2500px",
        }}
      >
        {showCover ? (
          <ClosedBookCover page={currentPage} isOpen={isOpen} />
        ) : (
          <OpenBookSpread page={currentPage} />
        )}
      </motion.div>

      {/* Floor Shadow */}
      <div className="absolute -bottom-24 left-24 right-24 h-16 bg-black/20 blur-3xl rounded-[100%]" />

      {/* Page Indicators */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2">
          {BOOK_PAGES.map((_, idx) => (
            <motion.div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 w-10"
                  : "bg-slate-300 w-2 hover:bg-blue-400"
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Closed Book Cover (3D perspective)
function ClosedBookCover({ page, isOpen }: any) {
  return (
    <motion.div
      className="relative w-full h-full"
      initial={{ rotateY: -25, rotateX: 8 }}
      animate={{
        rotateY: isOpen ? 0 : -25,
        rotateX: isOpen ? 0 : 8,
        scale: isOpen ? 1.1 : 1,
      }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Back Cover */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-400 via-slate-300 to-slate-400 rounded-r-3xl rounded-l-lg shadow-[25px_25px_80px_rgba(0,0,0,0.4)]"
        style={{
          transform: "translateZ(-40px)",
        }}
      />

      {/* Spine */}
      <div
        className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-400 rounded-l-lg shadow-[inset_-3px_0_10px_rgba(0,0,0,0.4)]"
        style={{
          transform: "translateZ(20px)",
        }}
      />

      {/* Front Cover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-700 rounded-r-3xl rounded-l-lg overflow-hidden shadow-[0_30px_100px_rgba(59,130,246,0.5)] border-2 border-blue-400/30"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, white 1.5px, transparent 1.5px)`,
              backgroundSize: "35px 35px",
            }}
          />
        </div>

        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-24 right-24 w-48 h-48 bg-cyan-400 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 1.5 }}
          className="absolute bottom-36 left-20 w-64 h-64 bg-purple-400 rounded-full blur-3xl"
        />

        {/* Content */}
        <div className="relative z-10 p-12 md:p-16 flex flex-col h-full justify-between">
          {/* Badge */}
          <div className="inline-block self-start">
            <div className="px-5 py-2.5 bg-white/20 rounded-full text-white/90 text-xs font-bold uppercase tracking-widest backdrop-blur-sm border border-white/30">
              Our Story
            </div>
          </div>

          {/* Main Title */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6"
            >
              {page.title}
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-blue-200 leading-tight"
            >
              {page.subtitle}
            </motion.h3>
          </div>

          {/* Bottom Content */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-white/90 text-lg md:text-xl leading-relaxed mb-8"
            >
              {page.desc}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-3 text-white/80"
            >
              <ArrowRight01Icon className="animate-pulse" size={24} />
              <span className="text-base font-semibold">Click to begin</span>
            </motion.div>
          </div>
        </div>

        {/* Shine Effect */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/20 to-transparent pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

// Open Book Spread (flat view with left and right pages)
function OpenBookSpread({ page }: any) {
  const Icon = page.icon;

  return (
    <motion.div
      className="relative w-full h-full flex"
      initial={{ rotateX: -45, scale: 0.8 }}
      animate={{ rotateX: -15, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "2500px",
      }}
    >
      {/* LEFT PAGE - Heading & Icon */}
      <motion.div
        className="w-1/2 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 relative shadow-[inset_-15px_0_30px_rgba(0,0,0,0.08)] rounded-l-3xl overflow-hidden"
        initial={{ rotateY: -25 }}
        animate={{ rotateY: -8 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "right center",
        }}
      >
        {/* Paper Texture */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url('https://www.transparenttextures.com/patterns/cream-paper.png')`,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 md:p-16">
          {/* Large Gradient Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 1,
              delay: 0.5,
              type: "spring",
              stiffness: 150,
            }}
            className={`mb-10 p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-br ${page.gradient} shadow-[0_20px_60px_rgba(59,130,246,0.4)]`}
          >
            <Icon size={80} variant="bulk" className="text-white" />
          </motion.div>

          {/* Main Heading */}
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-4xl md:text-6xl font-black text-slate-800 text-center leading-tight mb-6"
          >
            {page.title}
          </motion.h3>

          {/* Decorative Underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.7 }}
            className={`h-2 w-32 rounded-full bg-gradient-to-r ${page.gradient}`}
          />
        </div>

        {/* Page Number */}
        <div className="absolute bottom-8 right-8 text-blue-200 font-serif italic text-sm">
          {page.id * 2}
        </div>

        {/* Inner Shadow for depth */}
        <div className="absolute inset-0 shadow-[inset_-10px_0_20px_rgba(0,0,0,0.05)] pointer-events-none rounded-l-3xl" />
      </motion.div>

      {/* SPINE/CENTER LINE */}
      <div className="w-1 bg-gradient-to-b from-transparent via-slate-300/60 to-transparent relative">
        <div className="absolute inset-0 shadow-[0_0_15px_rgba(0,0,0,0.15)]" />
      </div>

      {/* RIGHT PAGE - Description */}
      <motion.div
        className="w-1/2 bg-gradient-to-bl from-white via-indigo-50/30 to-blue-50/40 relative shadow-[inset_15px_0_30px_rgba(0,0,0,0.08)] rounded-r-3xl overflow-hidden"
        initial={{ rotateY: 25 }}
        animate={{ rotateY: 8 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "left center",
        }}
      >
        {/* Paper Texture */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url('https://www.transparenttextures.com/patterns/cream-paper.png')`,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center p-12 md:p-16">
          <div className="max-w-lg">
            {/* Decorative Quote Mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="text-9xl font-serif leading-none mb-6"
              style={{
                background: `linear-gradient(135deg, ${page.accentColor}20, ${page.accentColor}10)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              "
            </motion.div>

            {/* Description Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-2xl md:text-3xl text-slate-700 leading-relaxed font-medium mb-10"
            >
              {page.desc}
            </motion.p>

            {/* Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-4"
            >
              <div
                className={`w-4 h-4 rounded-full bg-gradient-to-r ${page.gradient}`}
              />
              <div
                className={`flex-1 h-1.5 rounded-full bg-gradient-to-r ${page.gradient} opacity-30`}
              />
              <div
                className={`w-4 h-4 rounded-full bg-gradient-to-r ${page.gradient}`}
              />
            </motion.div>
          </div>
        </div>

        {/* Page Number */}
        <div className="absolute bottom-8 left-8 text-blue-200 font-serif italic text-sm">
          {page.id * 2 + 1}
        </div>

        {/* Inner Shadow for depth */}
        <div className="absolute inset-0 shadow-[inset_10px_0_20px_rgba(0,0,0,0.05)] pointer-events-none rounded-r-3xl" />
      </motion.div>

      {/* Shared shadow underneath the open book */}
      <div
        className="absolute -bottom-10 left-1/4 right-1/4 h-20 bg-black/10 blur-2xl rounded-[100%]"
        style={{ transform: "translateZ(-50px)" }}
      />
    </motion.div>
  );
}

// Golden Magic Particles (like the reference image)
function GoldenMagicParticles({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Golden Arc of Particles */}
          {Array.from({ length: 40 }).map((_, i) => {
            const angle = (i / 40) * Math.PI; // Arc from 0 to π
            const radius = 300 + Math.random() * 100;
            const x = Math.cos(angle) * radius;
            const y = -Math.sin(angle) * radius * 0.6; // Flatten the arc
            const delay = i * 0.02;
            const duration = 2 + Math.random() * 2;
            const size = 3 + Math.random() * 4;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  background: `radial-gradient(circle, ${
                    i % 3 === 0
                      ? "#FFD700"
                      : i % 3 === 1
                        ? "#FFA500"
                        : "#FFEC8B"
                  }, transparent)`,
                  boxShadow: `0 0 ${size * 2}px ${
                    i % 3 === 0
                      ? "#FFD700"
                      : i % 3 === 1
                        ? "#FFA500"
                        : "#FFEC8B"
                  }`,
                  left: "50%",
                  top: "50%",
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  x: [0, x * 0.5, x],
                  y: [0, y * 0.5, y],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0.5],
                }}
                transition={{
                  duration,
                  delay,
                  ease: "easeOut",
                  times: [0, 0.4, 1],
                }}
              />
            );
          })}

          {/* Larger Golden Stars */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI;
            const radius = 280 + Math.random() * 80;
            const x = Math.cos(angle) * radius;
            const y = -Math.sin(angle) * radius * 0.6;
            const delay = i * 0.05;

            return (
              <motion.div
                key={`star-${i}`}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0,
                  rotate: 0,
                }}
                animate={{
                  x: [0, x * 0.6, x],
                  y: [0, y * 0.6, y],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  delay,
                  ease: "easeOut",
                }}
              >
                <div className="w-2 h-2 bg-yellow-300 rotate-45 shadow-[0_0_15px_#FFD700]" />
              </motion.div>
            );
          })}

          {/* Glowing Sparkle Trail */}
          {Array.from({ length: 25 }).map((_, i) => {
            const progress = i / 25;
            const angle = progress * Math.PI;
            const radius = 260 + Math.random() * 60;
            const x = Math.cos(angle) * radius;
            const y = -Math.sin(angle) * radius * 0.55;

            return (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-white"
                style={{
                  left: "50%",
                  top: "50%",
                  boxShadow: "0 0 8px #FFFFFF",
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                }}
                animate={{
                  x,
                  y,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.03,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- CULTURE DATA ---
const CULTURE_PAIRS = [
  {
    id: 1,
    yin: {
      word: "LOGIC",
      subtext: "Precision-driven engineering and scalable architecture.",
      fill: "#E0F2FE", // Soft Sky Blue
      textColor: "text-blue-900",
      textConfig: { x: "5%", y: 20, size: "text-xl", anchor: "start" },
    },
    yang: {
      word: "MAGIC",
      subtext: "Creative problem solving and delightful user experiences.",
      fill: "#2563EB", // Brand Blue
      textColor: "text-white",
      textConfig: { x: "10%", y: 20, size: "text-xl", anchor: "start" },
    },
  },
  {
    id: 2,
    yin: {
      word: "SPEED",
      subtext: "Rapid deployment and agile industrial-speed iteration cycles.",
      fill: "#EFF6FF", // Atmospheric White-Blue
      textColor: "text-blue-800",
      textConfig: { x: "5%", y: 20, size: "text-xl", anchor: "start" },
    },
    yang: {
      word: "STABILITY",
      subtext: "Robust systems and industry-grade reliability standards.",
      fill: "#1D4ED8", // Deep Professional Blue
      textColor: "text-white",
      textConfig: { x: "5%", y: 20, size: "text-xl", anchor: "start" },
    },
  },
  {
    id: 3,
    yin: {
      word: "UNITY",
      subtext: "Empathy-driven collaboration and community-first culture.",
      fill: "#DBEAFE", // Subtle Blue
      textColor: "text-blue-900",
      textConfig: { x: "5%", y: 20, size: "text-xl", anchor: "start" },
    },
    yang: {
      word: "AUTONOMY",
      subtext: "Deep technical inquiry and data-backed solo decisions.",
      fill: "#3B82F6", // Medium Bright Blue
      textColor: "text-white",
      textConfig: { x: "5%", y: 20, size: "text-xl", anchor: "start" },
    },
  },
];

function CultureYinYangSection() {
  return (
    <section className="py-32 bg-white overflow-hidden relative font-sans">
      {/* --- PREMIUM BACKGROUND SYSTEM --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Modern Dot Grid */}
        <div
          className="absolute inset-0 opacity-[.6]"
          style={{
            backgroundImage: `radial-gradient(#3b82f6 1.5px, transparent 1.2px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Linear Geometric Grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1.2px), linear-gradient(90deg, #3b82f6 1px, transparent 1.2px)`,
            backgroundSize: "120px 120px",
          }}
        />

        {/* Cinematic Radial Mask */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_90%)]" />

        {/* Ambient Glow Sources */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[100px] mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6"
          >
            OUR <span className="text-blue-600">CULTURE.</span>
          </motion.h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            Explore the dualities that define us. Hover each side to discover
            the balance we strike between rigor and imagination.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-12"
        >
          {CULTURE_PAIRS.map((pair) => (
            <motion.div
              key={pair.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: pair.id * 0.2, duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <CultureOrb pair={pair} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CultureOrb({ pair }: { pair: any }) {
  const [hoverSide, setHoverSide] = useState<null | "yin" | "yang">(null);
  const orbRef = useRef(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isInView = useInView(orbRef, { once: true, amount: 0.3 });

  const handleMouseEnter = (side: "yin" | "yang") => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setHoverSide(side);
    }, 200); // 200ms delay to prevent jitter
  };

  const handleMouseLeaveOrb = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHoverSide(null);
  };

  useEffect(() => {
    if (isInView) {
      // Auto-preview logic for "wow" factor on entry
      const previewTimer = setTimeout(
        () => {
          setHoverSide("yang");
          const resetTimer = setTimeout(() => {
            setHoverSide(null);
          }, 3000);
          return () => clearTimeout(resetTimer);
        },
        1200 + pair.id * 300,
      ); // Staggered reveal
      return () => clearTimeout(previewTimer);
    }
  }, [isInView, pair.id]);

  // SVG Configuration
  const size = 320;
  const center = size / 2;
  const radius = 160;
  const gap = 1; // Space between halves

  // Utility to handle fill color (Hex or Tailwind)
  const getFillStyle = (fillStr: string) => {
    if (fillStr?.startsWith("#") || fillStr?.startsWith("rgb")) {
      return { fill: fillStr };
    }
    return {};
  };

  const getFillClass = (fillStr: string) => {
    return fillStr?.startsWith("#") || fillStr?.startsWith("rgb")
      ? ""
      : fillStr;
  };

  return (
    <div
      ref={orbRef}
      className="relative group perspective-[1000px]"
      onMouseLeave={handleMouseLeaveOrb}
    >
      {/* THE ORB CONTAINER */}
      <motion.div
        className="relative w-80 h-80 flex items-center justify-center cursor-pointer"
        initial={{ opacity: 0, scale: 0, rotate: -720 }}
        animate={{
          opacity: isInView ? 1 : 0,
          scale: isInView ? (hoverSide ? 0.98 : 1) : 0,
          rotate:
            hoverSide === "yin"
              ? 360
              : hoverSide === "yang"
                ? -360
                : isInView
                  ? 0
                  : -720,
        }}
        transition={{
          opacity: { duration: 1 },
          rotate: { duration: 3, ease: "easeInOut" },
          scale: { duration: 1, type: "spring", stiffness: 50 },
        }}
      >
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Claymorphic Filter */}
            <filter
              id={`clay-filter-${pair.id}`}
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              {/* Outer Shadow (already handled by drop-shadow-2xl on svg, but adding inner-clay characteristics here) */}

              {/* Bright Highlight (Inner Top-Left) */}
              <feGaussianBlur
                in="SourceAlpha"
                stdDeviation="6"
                result="blurHighlight"
              />
              <feOffset dx="-8" dy="-8" result="offsetHighlight" />
              <feComposite
                in="SourceAlpha"
                in2="offsetHighlight"
                operator="out"
                result="highlightMask"
              />
              <feFlood
                floodColor="white"
                floodOpacity="0.5"
                result="floodWhite"
              />
              <feComposite
                in="floodWhite"
                in2="highlightMask"
                operator="in"
                result="innerHighlight"
              />

              {/* Deep Shadow (Inner Bottom-Right) */}
              <feGaussianBlur
                in="SourceAlpha"
                stdDeviation="10"
                result="blurShadow"
              />
              <feOffset dx="12" dy="12" result="offsetShadow" />
              <feComposite
                in="SourceAlpha"
                in2="offsetShadow"
                operator="out"
                result="shadowMask"
              />
              <feFlood
                floodColor="black"
                floodOpacity="0.2"
                result="floodBlack"
              />
              <feComposite
                in="floodBlack"
                in2="shadowMask"
                operator="in"
                result="innerShadow"
              />

              <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="innerHighlight" />
                <feMergeNode in="innerShadow" />
              </feMerge>
            </filter>

            {/* Path for Yin (Left Side) Text - S-Curve from Top to Bottom for Pole Alignment */}
            <path
              id={`textPath-yin-${pair.id}`}
              d={`M ${center},${center - radius} A ${radius / 2},${radius / 2} 1 0 1 ${center},${center} A ${radius / 2},${radius / 2} 1 0 0 ${center},${center + radius}`}
              fill="none"
            />
            {/* Path for Yang (Right Side) Text - S-Curve from Bottom to Top for Pole Alignment */}
            <path
              id={`textPath-yang-${pair.id}`}
              d={`M ${center},${center + radius} A ${radius / 2},${radius / 2} 1 0 1 ${center},${center} A ${radius / 2},${radius / 2} 1 0 0 ${center},${center - radius}`}
              fill="none"
            />

            {/* Shape Paths for the Halves */}
            <path
              id={`shape-yin-${pair.id}`}
              d={`M ${center},${center + radius} A ${radius},${radius} 0 0 1 ${center},${center - radius} A ${radius / 2},${radius / 2} 0 0 1 ${center},${center} A ${radius / 2},${radius / 2} 0 0 0 ${center},${center + radius} Z`}
            />
            <path
              id={`shape-yang-${pair.id}`}
              d={`M ${center},${center - radius} A ${radius},${radius} 0 0 1 ${center},${center + radius} A ${radius / 2},${radius / 2} 0 0 1 ${center},${center} A ${radius / 2},${radius / 2} 0 0 0 ${center},${center - radius} Z`}
            />
          </defs>

          {/* Yin Fragment */}
          <motion.g
            onMouseEnter={() => handleMouseEnter("yin")}
            animate={{ x: -gap, y: gap }}
            className="filter hover:brightness-110 transition-all duration-300"
          >
            <use
              href={`#shape-yin-${pair.id}`}
              style={{
                ...getFillStyle(pair.yin.fill),
                filter: `url(#clay-filter-${pair.id})`,
              }}
              className={getFillClass(pair.yin.fill)}
              stroke="#cbd5e1"
              strokeWidth="0.5"
            />
            <text
              dy={pair.yin.textConfig?.y ?? 0}
              className={`${pair.yin.textConfig?.size ?? "text-[10px]"} font-black tracking-[0.3em] uppercase`}
            >
              <textPath
                href={`#textPath-yin-${pair.id}`}
                startOffset={pair.yin.textConfig?.x ?? "50%"}
                textAnchor={pair.yin.textConfig?.anchor ?? "middle"}
                className={`${pair.yin.textColor} fill-current`}
              >
                {pair.yin.word}
              </textPath>
            </text>
          </motion.g>

          {/* Yang Fragment */}
          <motion.g
            onMouseEnter={() => handleMouseEnter("yang")}
            animate={{ x: gap, y: -gap }}
            className="filter hover:brightness-110 transition-all duration-300"
          >
            <use
              href={`#shape-yang-${pair.id}`}
              style={{
                ...getFillStyle(pair.yang.fill),
                filter: `url(#clay-filter-${pair.id})`,
              }}
              className={getFillClass(pair.yang.fill)}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.5"
            />
            <text
              dy={pair.yang.textConfig?.y ?? 0}
              className={`${pair.yang.textConfig?.size ?? "text-[10px]"} font-black tracking-[0.3em] uppercase`}
            >
              <textPath
                href={`#textPath-yang-${pair.id}`}
                startOffset={pair.yang.textConfig?.x ?? "50%"}
                textAnchor={pair.yang.textConfig?.anchor ?? "middle"}
                className={`${pair.yang.textColor} fill-current`}
              >
                {pair.yang.word}
              </textPath>
            </text>
          </motion.g>
        </svg>
      </motion.div>

      {/* REVEAL CONTENT (Subtext Card) */}
      <AnimatePresence>
        {hoverSide && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="w-[85%] h-[85%] rounded-full bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center p-8 text-center backdrop-blur-3xl border border-slate-100">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl ${hoverSide === "yin" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-800"}`}
                  style={{
                    backgroundColor:
                      hoverSide === "yin" ? pair.yin.fill : "#f1f5f9",
                    color: hoverSide === "yin" ? "#fff" : "#1e293b",
                  }}
                >
                  {hoverSide === "yin" ? (
                    <CpuIcon size={28} />
                  ) : (
                    <ZapIcon size={28} />
                  )}
                </div>
                <h4 className="text-sm font-black tracking-[0.2em] uppercase text-slate-400 mb-2">
                  {hoverSide === "yin" ? pair.yin.word : pair.yang.word}
                </h4>
                <p className="text-slate-600 text-sm font-medium leading-relaxed max-w-[200px]">
                  {hoverSide === "yin" ? pair.yin.subtext : pair.yang.subtext}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
