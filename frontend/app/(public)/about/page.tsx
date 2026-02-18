"use client";

import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  motion,
  AnimatePresence,
  wrap,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  CpuIcon,
  Globe02Icon,
  Rocket01Icon,
  ZapIcon,
  UserGroupIcon,
  ArrowRight01Icon,
  IdeaIcon,
  StarIcon,
  ArrowLeft01Icon,
} from "@hugeicons/react";

// --- Configuration Data (All 8 Members) ---
const SLIDES = [
  {
    id: 1,
    role: "Founder & Visionary",
    name: "Pankaj Gupta",
    headline: "35+ Years: Pioneering Tech Excellence",
    description:
      "Leading the charge with decades of industry wisdom, transforming complex business challenges into scalable, future-proof technological legacies.",
    image: "/pankajsir.png",
    baseColor: "bg-blue-600",
    textColor: "text-blue-600",
    palette: ["#2563eb", "#1d4ed8", "#1e40af", "#3b82f6", "#60a5fa"],
  },
  {
    id: 2,
    role: "Chief Technology Officer",
    name: "Sunny Dhalia",
    headline: "15+ Years: Architecting Intelligence",
    description:
      "Mastermind behind our core infrastructure. turning abstract concepts into robust, high-performance systems that drive global innovation.",
    image: "/sunnysir.png",
    baseColor: "bg-indigo-600",
    textColor: "text-indigo-600",
    palette: ["#4f46e5", "#4338ca", "#3730a3", "#6366f1", "#818cf8"],
  },
  {
    id: 3,
    role: "General Manager",
    name: "Rohita Manu",
    headline: "12+ Years: Operational Mastery",
    description:
      "The heartbeat of our operations, ensuring seamless execution, cross-functional synergy, and a culture of continuous delivery.",
    image: "/rohita.png",
    baseColor: "bg-rose-600",
    textColor: "text-rose-600",
    palette: ["#e11d48", "#be123c", "#9f1239", "#f43f5e", "#fb7185"],
  },
  {
    id: 4,
    role: "Lead Full Stack Developer",
    name: "Rustam Khan",
    headline: "5+ Years: Engineering Ecosystems",
    description:
      "Bridging the gap between server-side logic and client-side beauty. Building scalable architectures that handle millions of requests.",
    image: "/rustam.png",
    baseColor: "bg-emerald-600",
    textColor: "text-emerald-600",
    palette: ["#059669", "#047857", "#065f46", "#10b981", "#34d399"],
  },
  {
    id: 5,
    role: "Lead UI/UX Designer",
    name: "Anurag Sharma",
    headline: "Design That Speaks Human",
    description:
      "Crafting intuitive digital experiences where aesthetics meet functionality. Turning user journeys into delightful visual stories.",
    image: "/anurag.png",
    baseColor: "bg-violet-600",
    textColor: "text-violet-600",
    palette: ["#7c3aed", "#6d28d9", "#5b21b6", "#8b5cf6", "#a78bfa"],
  },
  {
    id: 6,
    role: "AI Backend Developer",
    name: "G.Kirtika",
    headline: "Powering The Core",
    description:
      "Optimizing database efficiency and API security. Ensuring that the engine behind your application runs smooth, fast, and unbroken.",
    image: "/kirtika.png",
    baseColor: "bg-cyan-600",
    textColor: "text-cyan-600",
    palette: ["#0891b2", "#0e7490", "#155e75", "#06b6d4", "#22d3ee"],
  },
  {
    id: 7,
    role: "Business Analyst",
    name: "Chanda Kumawat",
    headline: "Decoding Business Data",
    description:
      "Translating complex market requirements into clear technical roadmaps. Bridging the gap between stakeholders and development teams.",
    image: "/chanda.png",
    baseColor: "bg-amber-500",
    textColor: "text-amber-600",
    palette: ["#d97706", "#b45309", "#92400e", "#f59e0b", "#fbbf24"],
  },
  {
    id: 8,
    role: "Flutter Developer",
    name: "Surekh Nagar",
    headline: "Cross-Platform Excellence",
    description:
      "Building fluid, native-like mobile experiences for iOS and Android from a single codebase. Innovation in the palm of your hand.",
    image: "/surekh.png",
    baseColor: "bg-teal-500",
    textColor: "text-teal-600",
    palette: ["#0d9488", "#0f766e", "#115e59", "#14b8a6", "#2dd4bf"],
  },
];

const INTERNS = [
  {
    id: 1,
    name: "Chiranshi Sharma",
    role: "Developer",
    image: "/chiranshi.png",
  },
  {
    id: 2,
    name: "Charvi Koolwal",
    role: "Developer",
    image: "/charvi.png",
  },
  {
    id: 3,
    name: "Saurabh Sharma",
    role: "QA",
    image: "/saurab.png",
  },
  {
    id: 4,
    name: "Pooja",
    role: "Developer",
    image: "/pooja.png",
  },
];

// --- Animation Variants for Directional Sliding ---
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9,
  }),
};

// --- 1. The Dynamic Grid Component (Restored ORIGINAL Motion) ---
const WaveShapeGrid = ({ activeIndex }: { activeIndex: number }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Grid Dimensions
  const rows = 10;
  const cols = 20;
  const totalBlocks = rows * cols;

  const isPartOfShape = (r: number, c: number) => {
    const center = 10;
    return Math.abs(c - center) <= r; // Simple pyramid
  };

  // Memoize grid structure
  const gridItems = useMemo(() => {
    return Array.from({ length: totalBlocks }).map((_, i) => {
      const r = Math.floor(i / cols);
      const c = i % cols;
      return { i, r, c, active: isPartOfShape(r, c) };
    });
  }, []);

  const slideIndex = wrap(0, SLIDES.length, activeIndex);
  const currentPalette = SLIDES[slideIndex].palette;

  return (
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] lg:w-full h-[500px] grid pointer-events-none z-30"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {gridItems.map(({ i, r, c, active }) => {
        if (!active) return <div key={i} />;

        const isHovered = hoveredIndex === i;
        const color = currentPalette[i % currentPalette.length];

        return (
          <motion.div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            // Animate properties (White on hover)
            animate={{
              opacity: 1,
              scale: isHovered ? 1.1 : 1,
              backgroundColor: isHovered ? "#ffffff" : color,
              zIndex: isHovered ? 50 : 1,
            }}
            // The "Magic" Transition (Preserved exactly as requested)
            transition={{
              scale: { duration: 0.2 },
              backgroundColor: {
                // If hovering, change instantly.
                // If slide changes, ripple color from RIGHT to LEFT.
                // (cols - c) calculates distance from right edge.
                duration: isHovered ? 0 : 0.5,
                delay: isHovered ? 0 : (cols - c) * 0.04 + r * 0.02,
                ease: "easeInOut",
              },
            }}
            className="border-[0.5px] border-white/5 pointer-events-auto cursor-crosshair relative rounded-sm"
          />
        );
      })}
    </div>
  );
};

// --- 2. The Content Slider (Touch & Drag Enabled) ---
const HeroContent = ({
  page,
  direction,
  paginate,
}: {
  page: number;
  direction: number;
  paginate: (newDirection: number) => void;
}) => {
  const slideIndex = wrap(0, SLIDES.length, page);
  const slide = SLIDES[slideIndex];

  // Drag logic thresholds
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center z-40 overflow-hidden pointer-events-none">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          // --- Enable Dragging ---
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full h-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between px-6"
        >
          {/* TEXT SECTION */}
          <div className="text-center md:text-left mt-10 md:mt-0 order-2 md:order-1 relative z-30 max-w-xl pointer-events-auto select-none">
            <div
              className={`inline-block px-4 py-1.5 rounded-full border bg-white/80 backdrop-blur-md shadow-sm mb-4 ${slide.textColor} border-current opacity-80 font-bold text-xs tracking-widest uppercase`}
            >
              {slide.role}
            </div>

            <h3 className="text-lg md:text-xl font-bold text-slate-500 mb-1">
              {slide.name}
            </h3>

            <h2 className="text-3xl md:text-6xl font-black text-slate-900 leading-tight drop-shadow-sm">
              {slide.headline}
            </h2>

            <p className="mt-4 text-slate-600 text-sm md:text-lg leading-relaxed font-medium">
              {slide.description}
            </p>

            <motion.div
              className={`h-2 w-24 rounded-full mt-6 ${slide.baseColor}`}
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            />
          </div>

          {/* IMAGE SECTION */}
          <div className="order-1 md:order-2 relative h-full flex items-end justify-center w-full md:w-1/2 pointer-events-auto select-none">
            {/* Glowing Backdrop */}
            <div
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[250px] md:w-[400px] h-[250px] md:h-[400px] blur-[90px] opacity-40 rounded-full ${slide.baseColor}`}
            />

            <img
              src={slide.image}
              alt={slide.role}
              draggable="false"
              className="relative h-[300px] md:h-[550px] object-contain drop-shadow-2xl z-20 mb-0"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- 3. Subtle Background ---
const SubtleBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-slate-50">
    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-[100px] animate-pulse" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-indigo-100/40 rounded-full blur-[100px]" />
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

const RiverSplashText = ({ activeIndex }: { activeIndex: number }) => {
  // Use the palette defined in the slide data for the splash effect
  const currentPalette = SLIDES[activeIndex].palette;
  // Create a looped gradient for seamless animation
  const gradient = `linear-gradient(90deg, ${currentPalette.join(
    ", ",
  )}, ${currentPalette[0]}, ${currentPalette[1]})`;

  return (
    <div className="relative z-40 text-center mt-8 mb-4 px-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter pb-2"
      >
        <motion.span
          // Animate the background position to create the flowing/splashing liquid effect
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%"],
          }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            backgroundImage: gradient,
            backgroundSize: "200% auto",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            display: "inline-block",
            // Add a subtle drop shadow to enhance the "pop" of the splash
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
          }}
        >
          Innovation Without Limits.
        </motion.span>
      </motion.h1>
    </div>
  );
};

export default function AboutPage() {
  const [[page, direction], setPage] = useState([0, 0]);

  // We wrap the index so it can go infinitely positive or negative
  const slideIndex = wrap(0, SLIDES.length, page);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
    },
    [page],
  );

  // Auto-cycle slides logic
  useEffect(() => {
    // Timer sets the slide to change every 5 seconds
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    // Clear the interval if the user interacts (paginates),
    // effectively resetting the timer so it doesn't jump immediately after a click.
    return () => clearInterval(interval);
  }, [paginate]); // Re-runs whenever page changes (manual or auto)

  const team = SLIDES.map((s) => ({
    name: s.name,
    role: s.role,
    color: s.baseColor.replace("bg-", "bg-opacity-80 bg-"),
  }));

  return (
    <main className="w-full bg-white font-sans text-slate-900">
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[110vh] min-h-[800px] w-full flex flex-col items-center justify-start overflow-hidden pt-20">
        <SubtleBackground />
        <RiverSplashText activeIndex={slideIndex} />

        {/* --- DYNAMIC HERO AREA --- */}
        <div className="flex-1 w-full relative max-w-[1600px] mx-auto mt-4 lg:mt-10">
          <HeroContent page={page} direction={direction} paginate={paginate} />

          {/* The Grid with the exact color/motion logic preserved */}
          <WaveShapeGrid activeIndex={slideIndex} />
        </div>
      </section>

      <JourneySection />

      <CoreDNASection />

      {/* ================= TEAM SECTION — Arch Cards ================= */}
      <section className="relative min-h-screen flex flex-col justify-center py-20 px-[5%] overflow-hidden bg-gradient-to-br from-[#f0f9ff] to-[#dbeafe]">
        {/* Animated Tech Grid Background */}
        <div
          className="absolute inset-0 z-0 animate-grid-move"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-[2] max-w-[1400px] mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-black text-5xl md:text-7xl leading-none tracking-tighter text-slate-900 uppercase">
                The Magic
                <br />
                <span className="text-blue-600">Behind the Code</span>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="max-w-sm text-lg text-slate-600 leading-relaxed border-l-[3px] border-blue-600 pl-5 md:border-l-[3px] md:border-t-0"
            >
              A powerhouse of thinkers, builders, and designers who turn
              ambitious ideas into reality. Meet the architects of Aashita.ai.
            </motion.p>
          </div>

          {/* ---- ARCH CARDS (Desktop: row, Tablet: 2-col, Mobile: 1-col) ---- */}
          <div className="flex flex-wrap lg:flex-nowrap justify-center items-end gap-5 lg:h-[600px] pb-5">
            {SLIDES.map((member, i) => {
              const CARD_COLORS = [
                "bg-[#fbcfe8]", // pink
                "bg-[#ccfbf1]", // mint
                "bg-[#e2e8f0]", // cool grey
                "bg-[#fef08a]", // yellow
              ];
              const cardColor = CARD_COLORS[i % 4];
              const isTall = i % 2 === 0;

              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -20 }}
                  className={`arch-card group relative flex flex-col items-center pt-10 cursor-pointer overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] transition-shadow duration-500 hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.25)] ${cardColor}
                    w-full sm:w-[45%] lg:w-[24%]
                    ${isTall ? "lg:h-full h-[500px]" : "lg:h-[85%] h-[450px]"}
                  `}
                >
                  {/* Member Info */}
                  <div className="text-center z-[2]">
                    <h3 className="font-black text-xl uppercase text-slate-900 mb-1 tracking-wide transition-all duration-300 group-hover:tracking-[1px]">
                      {member.name}
                    </h3>
                    <p className="text-sm uppercase tracking-[1px] text-black/60 mb-5 font-medium">
                      {member.role}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="flex-1 w-full flex items-end justify-center overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      draggable={false}
                      className="member-img w-[110%] h-auto max-h-[90%] object-contain select-none"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <a
              href="/careers"
              className="inline-block bg-blue-600 text-white px-10 py-4 rounded-full font-semibold text-base shadow-[0_4px_15px_rgba(37,99,235,0.4)] hover:bg-blue-700 hover:scale-105 hover:shadow-[0_8px_25px_rgba(37,99,235,0.6)] transition-all duration-300"
            >
              Join the Team
            </a>
          </motion.div>
        </div>
      </section>

      {/* ================= INTERNS SECTION — Arch Cards ================= */}
      <section className="relative flex flex-col justify-center py-12 px-[5%] overflow-hidden bg-gradient-to-br from-[#fdf4ff] to-[#ede9fe]">
        {/* Animated Tech Grid Background */}
        <div
          className="absolute inset-0 z-0 animate-grid-move"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-[2] max-w-[1400px] mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-black text-5xl md:text-7xl leading-none tracking-tighter text-slate-900 uppercase">
                Tomorrow&apos;s Leaders,
                <br />
                <span className="text-purple-600">Today&apos;s Builders</span>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="max-w-sm text-lg text-slate-600 leading-relaxed border-l-[3px] border-purple-600 pl-5"
            >
              Fresh talent shaping the future of tech. Our interns don&apos;t
              just learn — they lead, build, and innovate from day one.
            </motion.p>
          </div>

          {/* ---- INTERN ARCH CARDS ---- */}
          <div className="flex flex-wrap lg:flex-nowrap justify-center items-end gap-5 lg:h-[400px] pb-5">
            {INTERNS.map((intern, i) => {
              const CARD_COLORS = [
                "bg-[#e9d5ff]", // lavender
                "bg-[#ccfbf1]", // mint
                "bg-[#fef08a]", // yellow
                "bg-[#e2e8f0]", // cool grey
              ];
              const cardColor = CARD_COLORS[i % 4];
              const isTall = i % 2 === 0;

              return (
                <motion.div
                  key={intern.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -20 }}
                  className={`arch-card group relative flex flex-col items-center pt-8 cursor-pointer overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] transition-shadow duration-500 hover:shadow-[0_25px_50px_-12px_rgba(139,92,246,0.25)] ${cardColor}
                    w-full sm:w-[42%] lg:w-[18%]
                    ${isTall ? "lg:h-full h-[380px]" : "lg:h-[85%] h-[320px]"}
                  `}
                >
                  {/* Member Info */}
                  <div className="text-center z-[2]">
                    <h3 className="font-black text-lg uppercase text-slate-900 mb-0.5 tracking-wide transition-all duration-300 group-hover:tracking-[1px]">
                      {intern.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[1px] text-black/60 mb-3 font-medium">
                      {intern.role}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="flex-1 w-full flex items-end justify-center overflow-hidden">
                    <img
                      src={intern.image}
                      alt={intern.name}
                      draggable={false}
                      className={`member-img h-auto max-h-[95%] object-contain select-none transition-transform duration-300 ${
                        intern.id === 2 || intern.id === 4
                          ? "w-[160%] scale-125"
                          : "w-[140%] scale-110"
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA — Custom Grid Background */}
      <section className="relative py-16 text-center overflow-hidden bg-slate-950">
        {/* === CUSTOM GRID BACKGROUND === */}
        {/* Main grid lines */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Grid intersection dots */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(148,163,184,0.15) 1.5px, transparent 1.5px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Animated accent grid highlight — shifting glow patch */}
        <motion.div
          className="absolute z-0 pointer-events-none"
          style={{
            width: "350px",
            height: "350px",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{
            x: ["-10%", "60%", "30%", "-10%"],
            y: ["-20%", "20%", "50%", "-20%"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute z-0 pointer-events-none"
          style={{
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
            filter: "blur(50px)",
            right: "10%",
            bottom: "10%",
          }}
          animate={{
            x: ["10%", "-40%", "20%", "10%"],
            y: ["10%", "-30%", "40%", "10%"],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Highlighted grid rows — brighter accent lines */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59,130,246,0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139,92,246,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "180px 180px",
            backgroundPosition: "30px 30px",
          }}
        />

        {/* Floating micro-dots / particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`cta-particle-${i}`}
            className="absolute rounded-full z-0 pointer-events-none"
            style={{
              width: `${4 + (i % 3) * 3}px`,
              height: `${4 + (i % 3) * 3}px`,
              background:
                i % 2 === 0 ? "rgba(59,130,246,0.4)" : "rgba(139,92,246,0.35)",
              left: `${10 + i * 15}%`,
              top: `${15 + ((i * 23) % 70)}%`,
              boxShadow:
                i % 2 === 0
                  ? "0 0 12px rgba(59,130,246,0.3)"
                  : "0 0 12px rgba(139,92,246,0.25)",
            }}
            animate={{
              y: [0, -20 - i * 5, 0],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 4 + i * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Edge vignette — radial fade */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(2,6,23,0.7) 100%)",
          }}
        />

        {/* Top/bottom soft fades */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-slate-950 to-transparent z-[1] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-950 to-transparent z-[1] pointer-events-none" />

        {/* === CONTENT === */}
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Subtle label */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-3 rounded-full border border-slate-700 text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-5"
          >
            Let's Connect
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter mb-4"
          >
            <span className="text-white">The future belongs to those</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              who build it.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-slate-400 max-w-lg mx-auto text-sm md:text-base leading-relaxed mb-8"
          >
            Ready to transform your vision into reality? Let's craft something
            extraordinary together.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{
              scale: 1.08,
              boxShadow: "0 0 40px rgba(59,130,246,0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            className="relative px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-base shadow-2xl shadow-blue-500/20 overflow-hidden group"
          >
            {/* Button sheen */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative z-10 flex items-center gap-2">
              Let&apos;s shape the future{" "}
              <ArrowRight01Icon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </div>
      </section>
    </main>
  );
}

// --- Data Configuration ---
// Added "Develop" to make it 7 steps to match A-A-S-H-I-T-A
const JOURNEY_STEPS = [
  {
    letter: "A",
    title: "Analyze", // Mapped loosely to Discover
    subtitle: "Discover",
    desc: "We dive deep into your vision, understanding goals and challenges.",
    color: "blue",
    shadow: "shadow-blue-500/30",
    text: "text-blue-600",
    bg: "bg-blue-50",
    hex: "#3b82f6", // blue-500
  },
  {
    letter: "A",
    title: "Architect", // Mapped loosely to Plan
    subtitle: "Plan",
    desc: "Structuring the roadmap. We align tech stacks with business goals.",
    color: "indigo",
    shadow: "shadow-indigo-500/30",
    text: "text-indigo-600",
    bg: "bg-indigo-50",
    hex: "#6366f1", // indigo-500
  },
  {
    letter: "S",
    title: "Sculpt", // Mapped loosely to Design
    subtitle: "Design",
    desc: "Crafting intuitive UI/UX that users love and engage with.",
    color: "rose",
    shadow: "shadow-rose-500/30",
    text: "text-rose-600",
    bg: "bg-rose-50",
    hex: "#f43f5e", // rose-500
  },
  {
    letter: "H",
    title: "Harden", // Mapped loosely to Develop (New Step)
    subtitle: "Develop",
    desc: "Writing clean, scalable code that brings the design to life.",
    color: "purple",
    shadow: "shadow-purple-500/30",
    text: "text-purple-600",
    bg: "bg-purple-50",
    hex: "#a855f7", // purple-500
  },
  {
    letter: "I",
    title: "Iterate", // Mapped loosely to Test
    subtitle: "Test",
    desc: "Rigorous QA to ensure a bug-free, seamless performance.",
    color: "cyan",
    shadow: "shadow-cyan-500/30",
    text: "text-cyan-600",
    bg: "bg-cyan-50",
    hex: "#06b6d4", // cyan-500
  },
  {
    letter: "T",
    title: "Thrive", // Mapped loosely to Launch
    subtitle: "Launch",
    desc: "Deploying your solution to the world with full confidence.",
    color: "emerald",
    shadow: "shadow-emerald-500/30",
    text: "text-emerald-600",
    bg: "bg-emerald-50",
    hex: "#10b981", // emerald-500
  },
  {
    letter: "A",
    title: "Amplify", // Mapped loosely to Grow
    subtitle: "Grow",
    desc: "Scaling your product beyond launch for continuous success.",
    color: "amber",
    shadow: "shadow-amber-500/30",
    text: "text-amber-600",
    bg: "bg-amber-50",
    hex: "#f59e0b", // amber-500
  },
];

const JourneySection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#f8fafc]">
      {/* --- CUSTOM BACKGROUND: GRID --- */}
      <div
        className="absolute inset-0 z-0 opacity-100 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      >
        {/* Optional: Radial Fade to make grid softer at edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] via-transparent to-[#f8fafc]" />
      </div>

      <div className="container mx-auto px-6 text-center mb-20 relative z-10">
        <span className="inline-block py-2 px-4 rounded-full bg-white border border-slate-200 text-slate-500 font-bold uppercase tracking-widest text-[11px] mb-6 shadow-sm">
          The Process
        </span>
        <h2 className="text-4xl md:text-7xl font-black text-slate-800 tracking-tighter mb-4">
          Built on{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Trust.
          </span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Every letter of our name represents a step in your success story.
        </p>
      </div>

      {/* --- DESKTOP: HANGING CLAY PENDULUMS --- */}
      <div className="hidden xl:flex h-[750px] justify-center items-start overflow-visible w-full px-4">
        <div className="flex justify-between w-full max-w-[1600px] relative">
          {JOURNEY_STEPS.map((step, i) => {
            // Stagger height logic: High, Low, High, Low
            const isShort = i % 2 !== 0;
            const stringHeight = isShort ? 120 : 280;

            return (
              <motion.div
                key={i}
                className="relative flex flex-col items-center group"
                style={{ width: "200px" }} // Fixed width for spacing
                initial="idle"
                whileHover="swing"
                animate="idle"
              >
                {/* 1. THE ANCHOR LETTER (A A S H I T A) */}
                <div className="relative z-20 h-[10rem] flex items-center justify-center">
                  {step.letter === "A" ? (
                    <div className="relative w-40 h-40 group-hover:-translate-y-2 transition-transform duration-500">
                      {/* Outline State */}
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full absolute inset-0"
                      >
                        <path
                          d="M10 90 L40 10 L60 10 L90 90 L75 90 L68 70 L32 70 L25 90 Z M48 30 L38 60 L62 60 L52 30 Z"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="1.5"
                          className="group-hover:opacity-0 transition-opacity duration-500"
                        />
                      </svg>
                      {/* Hover Filled State */}
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full absolute inset-0"
                      >
                        <path
                          d="M10 90 L40 10 L60 10 L90 90 L75 90 L68 70 L32 70 L25 90 Z M48 30 L38 60 L62 60 L52 30 Z"
                          className={`fill-current text-${step.color}-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                          style={{
                            filter: `drop-shadow(0 0 15px var(--tw-color-${step.color}-400))`,
                          }}
                        />
                      </svg>
                    </div>
                  ) : (
                    <>
                      {/* Default State: Outlined (Transparent with Stroke) */}
                      <h1
                        className={`text-[10rem] leading-none font-black text-transparent select-none transition-all duration-500 ease-out group-hover:-translate-y-2`}
                        style={{
                          WebkitTextStroke: "1.5px #475569", // slate-600 solid outline
                        }}
                      >
                        {step.letter}
                      </h1>

                      {/* Hover State: Filled Color Overlay */}
                      <h1
                        className={`absolute inset-0 text-[10rem] leading-none font-black text-${step.color}-600 opacity-0 group-hover:opacity-100 transition-all duration-500 select-none group-hover:-translate-y-2`}
                        style={{
                          textShadow: `0 0 30px var(--tw-color-${step.color}-400)`, // Glow effect
                        }}
                      >
                        {step.letter}
                      </h1>
                    </>
                  )}
                </div>

                {/* 2. THE STRING & PENDULUM WRAPPER */}
                {/* Positioned absolutely so it starts from the bottom center of the letter */}
                <motion.div
                  className="absolute top-[8rem] flex flex-col items-center origin-top z-30"
                  variants={{
                    idle: { rotate: 0 },
                    swing: {
                      rotate: [0, -4, 3, -2, 1, 0],
                      transition: { duration: 2, ease: "easeInOut" },
                    },
                  }}
                >
                  {/* The String */}
                  <div
                    className="w-[2px] bg-slate-300 transition-all duration-500 group-hover:bg-slate-400 group-hover:w-[3px]"
                    style={{ height: `${stringHeight}px` }}
                  />

                  {/* The Connector Knob */}
                  <div
                    className={`w-4 h-4 rounded-full bg-white border-4 border-slate-200 -mt-1 z-10 shadow-sm group-hover:border-${step.color}-400 transition-colors duration-300`}
                  />

                  {/* 3. THE CLAYMORPHISM CARD */}
                  <div
                    className={`relative w-60 h-60 -mt-1 rounded-full flex flex-col items-center justify-center text-center p-6 transition-all duration-500
                    bg-[#eef2f6]
                    ${/* CLAY SHADOWS: Highlight (top-left) + Shadow (bottom-right) + Glow (hover) */ ""}
                    shadow-[inset_-12px_-12px_20px_rgba(255,255,255,1),_inset_12px_12px_20px_rgba(174,174,192,0.2),_10px_20px_30px_rgba(0,0,0,0.05)]
                    group-hover:shadow-[inset_-12px_-12px_20px_rgba(255,255,255,1),_inset_12px_12px_20px_rgba(174,174,192,0.2),_0px_20px_40px_rgba(0,0,0,0.1)]
                    group-hover:scale-105
                    border-[3px] border-white
                  `}
                  >
                    {/* Hover Glow Background inside circle */}
                    <div
                      className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-${step.color}-500`}
                    />

                    {/* Step Number */}
                    <div
                      className={`w-10 h-10 rounded-full ${step.bg} ${step.text} flex items-center justify-center text-lg font-black mb-3 shadow-inner`}
                    >
                      {i + 1}
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-2xl font-black text-slate-700 mb-1 group-hover:${step.text} transition-colors`}
                    >
                      {step.subtitle}
                    </h3>

                    {/* Tiny Divider */}
                    <div
                      className={`w-8 h-1 bg-slate-200 rounded-full mb-3 group-hover:bg-${step.color}-300 transition-colors`}
                    />

                    {/* Description */}
                    <p className="text-xs text-slate-500 font-medium leading-relaxed px-1">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* --- MOBILE/TABLET: HORIZONTAL SCROLL (Clay Cards) --- */}
      <div className="xl:hidden w-full overflow-x-auto pb-12 px-6 no-scrollbar snap-x snap-mandatory">
        <div className="flex gap-6 w-max mx-auto">
          {JOURNEY_STEPS.map((step, i) => (
            <div
              key={i}
              className="snap-center w-[300px] h-[380px] rounded-[3rem] flex flex-col items-center justify-center text-center p-8 relative
                bg-[#eef2f6]
                shadow-[inset_-10px_-10px_20px_rgba(255,255,255,0.9),_inset_10px_10px_20px_rgba(174,174,192,0.2),_5px_10px_20px_rgba(0,0,0,0.05)]
                border border-white
              "
            >
              {/* Letter Watermark */}
              <div className="absolute top-4 right-6 w-24 h-24 select-none opacity-40">
                {step.letter === "A" ? (
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full fill-slate-300"
                  >
                    <path d="M10 90 L40 10 L60 10 L90 90 L75 90 L68 70 L32 70 L25 90 Z M48 30 L38 60 L62 60 L52 30 Z" />
                  </svg>
                ) : (
                  <div className="text-8xl font-black text-slate-200/60 leading-none">
                    {step.letter}
                  </div>
                )}
              </div>

              <div
                className={`w-14 h-14 rounded-full ${step.bg} ${step.text} flex items-center justify-center text-xl font-bold mb-6 shadow-inner relative z-10`}
              >
                {i + 1}
              </div>
              <h3 className="text-3xl font-black text-slate-800 mb-3 relative z-10">
                {step.subtitle}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed relative z-10">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Swipe Indicator */}
        <div className="flex justify-center items-center gap-2 mt-8 opacity-40">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce delay-75" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce delay-150" />
        </div>
      </div>
    </section>
  );
};

// --- CORE DNA SECTION COMPONENTS ---

const DNA_VALUES = [
  {
    id: 1,
    title: "Innovation",
    desc: "Forging the future with relentless curiosity.",
    icon: <Rocket01Icon className="w-8 h-8" />,
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/20",
  },
  {
    id: 2,
    title: "Integrity",
    desc: "Transparency is the bedrock of our code.",
    icon: <StarIcon className="w-8 h-8" />,
    gradient: "from-indigo-500 to-purple-500",
    shadow: "shadow-indigo-500/20",
  },
  {
    id: 3,
    title: "Growth",
    desc: "Scaling systems and skillsets without limits.",
    icon: <ZapIcon className="w-8 h-8" />,
    gradient: "from-fuchsia-500 to-pink-500",
    shadow: "shadow-fuchsia-500/20",
  },
  {
    id: 4,
    title: "Global",
    desc: "Borderless thinking for a connected world.",
    icon: <Globe02Icon className="w-8 h-8" />,
    gradient: "from-cyan-500 to-teal-500",
    shadow: "shadow-cyan-500/20",
  },
  {
    id: 5,
    title: "Excellence",
    desc: "Precision engineering in every pixel.",
    icon: <CpuIcon className="w-8 h-8" />,
    gradient: "from-emerald-500 to-green-500",
    shadow: "shadow-emerald-500/20",
  },
];

// Duplicate data to create a seamless infinite loop
const MARQUEE_DATA = [...DNA_VALUES, ...DNA_VALUES, ...DNA_VALUES];

const DNA_CARD_WIDTH = 320;
const DNA_CARD_GAP = 60;

// --- HELPER: Generate SVG Path for Sine Wave ---
const generateSinePath = (
  count: number,
  width: number,
  gap: number,
  centerY: number,
  amplitude: number,
) => {
  let path = `M 0 ${centerY} `;
  let currentX = width / 2;

  for (let i = 0; i < count; i++) {
    const nextX = currentX + width + gap;
    const cpX = (currentX + nextX) / 2;
    const nextY =
      i % 2 === 0 ? centerY + amplitude / 2 : centerY - amplitude / 2;

    path += `Q ${cpX} ${nextY} ${nextX} ${centerY} `;
    currentX = nextX;
  }
  return path;
};

// --- SUB-COMPONENT: 3D GLASS CARD ---
const Glass3DCard = ({
  item,
  index,
  isHovered,
  isBlurred,
}: {
  item: (typeof DNA_VALUES)[0];
  index: number;
  isHovered: boolean;
  isBlurred: boolean;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const stepNum = (index % 5) + 1;
  const formattedStep = stepNum < 10 ? `0${stepNum}` : `${stepNum}`;

  return (
    <motion.div
      style={{
        perspective: 1000,
        filter: isBlurred ? "blur(4px) opacity(0.5)" : "blur(0px) opacity(1)",
        scale: isHovered ? 1.05 : 1,
        zIndex: isHovered ? 50 : 10,
      }}
      className="w-full h-[240px] transition-all duration-500"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-full h-full rounded-[2rem] bg-white backdrop-blur-xl border border-slate-200 overflow-hidden group transition-colors duration-500 shadow-lg shadow-slate-200/50
          ${isHovered ? "border-blue-300 shadow-xl shadow-blue-100/50" : ""}
        `}
      >
        {/* Dynamic Gradient Glow */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${item.gradient}`}
        />

        {/* Large Background Number */}
        <div className="absolute -right-4 -bottom-10 text-[120px] font-black text-slate-100 select-none z-0 group-hover:text-slate-200 transition-colors duration-500">
          {formattedStep}
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-8 flex flex-col h-full">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg
              bg-gradient-to-br ${item.gradient} relative overflow-hidden group-hover:scale-110 transition-transform duration-300
            `}
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="absolute inset-0 bg-white/20 blur-md opacity-50" />
            <div className="relative z-10">{item.icon}</div>
          </div>

          <h3
            className="text-xl font-bold text-slate-900 mb-2"
            style={{ transform: "translateZ(20px)" }}
          >
            {item.title}
          </h3>

          <p
            className="text-slate-500 text-xs leading-relaxed font-medium"
            style={{ transform: "translateZ(10px)" }}
          >
            {item.desc}
          </p>

          {/* Bottom Indicator */}
          <div className="mt-auto flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
            <div
              className={`h-1 w-8 rounded-full bg-gradient-to-r ${item.gradient}`}
            />
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">
              Explore
            </span>
          </div>
        </div>

        {/* Auto Sheen */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-[50%] h-full bg-gradient-to-r from-transparent via-slate-100/40 to-transparent -skew-x-12 animate-shine" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const CoreDNASection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* --- 1. SUBTLE BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-100/40 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 mb-10 relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-200 text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-4"
        >
          Our Core DNA
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4"
        >
          The System of{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Values.
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 max-w-2xl mx-auto text-base"
        >
          Interconnected principles that drive our innovation engine forward.
        </motion.p>
      </div>

      {/* --- 2. INFINITE DNA STRAND (Desktop) --- */}
      <div className="relative w-full h-[420px] hidden lg:flex items-center overflow-hidden z-20">
        {/* Left/Right Vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-30 pointer-events-none" />

        {/* Moving Container */}
        <motion.div
          className="flex items-center relative"
          animate={{
            x: [
              "0px",
              `-${DNA_VALUES.length * (DNA_CARD_WIDTH + DNA_CARD_GAP)}px`,
            ],
          }}
          transition={{
            x: {
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          style={{ width: "max-content", paddingLeft: "50vw" }}
        >
          {/* THE CONNECTING LINE (SVG) */}
          <div className="absolute top-0 left-0 h-full w-full pointer-events-none z-0">
            <svg width="100%" height="100%" className="overflow-visible">
              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={generateSinePath(
                  MARQUEE_DATA.length,
                  DNA_CARD_WIDTH,
                  DNA_CARD_GAP,
                  275,
                  80,
                )}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="8 8"
                className="opacity-60"
              />
            </svg>
          </div>

          {/* THE CARDS */}
          {MARQUEE_DATA.map((item, index) => {
            const isEven = index % 2 === 0;
            const yOffset = isEven ? -80 : 80;

            return (
              <div
                key={index}
                className="relative"
                style={{
                  width: DNA_CARD_WIDTH,
                  marginRight: DNA_CARD_GAP,
                  marginTop: yOffset,
                }}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <Glass3DCard
                  item={item}
                  index={index}
                  isHovered={hoveredIdx === index}
                  isBlurred={hoveredIdx !== null && hoveredIdx !== index}
                />

                {/* Vertical String connecting card to center line */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 w-[1px] bg-slate-700/50 -z-10
                    ${isEven ? "top-full h-[80px]" : "bottom-full h-[80px]"}
                  `}
                />
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* --- 3. MOBILE/TABLET STACK --- */}
      <div className="lg:hidden container mx-auto px-6 mt-8 grid grid-cols-1 gap-4">
        {DNA_VALUES.map((item, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            key={i}
            className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4 shadow-sm"
          >
            <div
              className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} text-white`}
            >
              {item.icon}
            </div>
            <div>
              <h3 className="text-slate-900 font-bold text-lg">{item.title}</h3>
              <p className="text-slate-500 text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
