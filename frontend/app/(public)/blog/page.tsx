"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import { SectionContainer } from "@/components/public/sections";
import {
  AiInnovation03Icon,
  CodeIcon,
  Configuration01Icon,
  ArrowRight01Icon,
  Search01Icon,
  FilterIcon,
  Calendar01Icon,
  FavouriteIcon,
} from "@hugeicons/react";
import Threads from "@/components/ui/Threads";

// --- DATA ---
const BLOG_POSTS = [
  {
    title: "The Future of AI in Enterprise Software",
    excerpt:
      "Exploring how artificial intelligence is reshaping business operations and decision-making on a global scale.",
    date: "Feb 15, 2026",
    category: "AI & ML",
    readTime: "8 min read",
    author: "Elena Vance",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Cloud Migration Best Practices for 2026",
    excerpt:
      "A comprehensive guide to moving legacy infrastructure to modern cloud-native ecosystems without downtime.",
    date: "Feb 10, 2026",
    category: "Cloud Ops",
    readTime: "12 min read",
    author: "Marc Kincaid",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
  },
  {
    title: "Building Scalable Microservices with Rust",
    excerpt:
      "Why performance-critical systems are moving towards Rust for distributed backends.",
    date: "Feb 05, 2026",
    category: "Development",
    readTime: "10 min read",
    author: "Sarah Connor",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "The Evolution of Digital Transformation",
    excerpt:
      "Insights into how digital-first strategies are no longer optional for small to mid-sized firms.",
    date: "Feb 01, 2026",
    category: "Strategy",
    readTime: "6 min read",
    author: "James Holden",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
  },
];

const CATEGORIES = [
  "All Insights",
  "AI & ML",
  "Cloud Ops",
  "Development",
  "Strategy",
  "UI/UX",
];

// --- HERO COMPONENT ---
function InteractiveBlogHero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative pt-40 pb-32 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0 opacity-10">
        <Threads
          amplitude={1.5}
          distance={0.2}
          enableMouseInteraction
          color1={[0.1, 0.4, 0.9]}
          color2={[0.2, 0.8, 0.8]}
        />
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8"
          >
            Insights into the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-[length:200%_auto] animate-gradient">
              Next Reality.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 max-w-2xl leading-relaxed"
          >
            Deep dives into artificial intelligence, cloud infrastructure, and
            the engineering philosophies that drive Aashita Technosoft.
          </motion.p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 5s ease infinite;
        }
      `}</style>
    </section>
  );
}

// --- MAIN PAGE ---
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Insights");

  return (
    <main className="min-h-screen bg-white">
      <InteractiveBlogHero />

      {/* FILTER & FEED SECTION */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300
                    ${
                      activeCategory === cat
                        ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20"
                        : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative group">
              <Search01Icon
                className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Search vision hub..."
                className="pl-16 pr-8 py-4 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-100 focus:bg-white transition-all text-sm font-bold w-full md:w-[320px]"
              />
            </div>
          </div>

          {/* Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {BLOG_POSTS.map((post, i) => (
              <BlogCard key={i} post={post} index={i} />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-32 flex flex-col items-center">
            <div className="w-16 h-[2px] bg-slate-100 mb-8" />
            <p className="text-slate-300 font-black uppercase tracking-[0.4em] text-[10px] mb-12">
              More Intelligence Loading
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 rounded-3xl border-2 border-slate-900 text-slate-900 font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
            >
              Sync Older Records
            </motion.button>
          </div>
        </div>
      </section>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function BlogCard({ post, index }: { post: any; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-500">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="absolute top-6 left-6">
          <span className="px-4 py-1.5 rounded-full bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest shadow-lg">
            {post.category}
          </span>
        </div>
      </div>

      <div className="space-y-4 px-2">
        <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>

        <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
          {post.title}
        </h3>

        <p className="text-slate-500 line-clamp-2 leading-relaxed font-medium">
          {post.excerpt}
        </p>

        <div className="pt-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-white shadow-sm flex items-center justify-center text-[10px] font-black text-blue-600">
            {post.author.charAt(0)}
          </div>
          <span className="text-xs font-bold text-slate-600">
            {post.author}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
