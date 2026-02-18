"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook02Icon,
  InstagramIcon,
  Linkedin01Icon,
  TwitterIcon,
  SentIcon,
  ArrowRight01Icon,
  ArrowUp01Icon,
  CpuIcon,
  CloudIcon,
  CursorMagicSelection02Icon,
} from "@hugeicons/react";
import { COMPANY_INFO } from "@/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const footerLinks = [
    {
      title: "Capabilities",
      links: ["Custom Dev", "AI/ML Solutions", "Cloud Infra", "UI/UX Design"],
    },
    {
      title: "Company",
      links: ["Our Mission", "Careers", "Engineering Blog", "Contact"],
    },
  ];

  return (
    <footer className="relative bg-[#f8faff] pt-24 pb-12 overflow-hidden border-t border-blue-100">
      {/* --- BACKGROUND DECORATIVE ELEMENTS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        {/* Tech Grid Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(#3b82f6 0.5px, transparent 0.5px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Large Decorative Blue Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200/50 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-blue-100/50 to-transparent" />
      </div>

      {/* Floating Tech Icons (The "Characters" of our tech footer) */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[15%] text-blue-300 opacity-20 hidden lg:block"
      >
        <CpuIcon size={120} variant="stroke" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          {/* --- LEFT SECTION: Branding & Links --- */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand Identity */}
            <div className="md:col-span-1 space-y-6">
              <Link href="/" className="flex items-center gap-2 group">
                <Image
                  src="/logo.png"
                  alt={COMPANY_INFO.name}
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <span className="text-xl font-black text-slate-800 tracking-tighter uppercase">
                  {COMPANY_INFO.name}
                </span>
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Engineering digital foundations for the next generation of
                global enterprises.
              </p>
              <div className="flex gap-3">
                {[Linkedin01Icon, TwitterIcon, InstagramIcon].map((Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-blue-100 text-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Columns */}
            {footerLinks.map((group, idx) => (
              <div key={idx} className="space-y-6">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600/60">
                  {group.title}
                </h4>
                <ul className="space-y-4">
                  {group.links.map((link, j) => (
                    <li key={j}>
                      <Link
                        href="#"
                        className="text-slate-600 hover:text-blue-600 text-[15px] font-semibold transition-all hover:pl-1 flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all" />
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* --- RIGHT SECTION: Large CTA (Reference style) --- */}
          <div className="lg:col-span-5 relative">
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-blue-600 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                  <CursorMagicSelection02Icon size={16} /> Get Started
                </span>
                <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[0.9] tracking-tight">
                  Send your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                    Enquiry
                  </span>
                </h2>
              </div>

              {/* High-End Newsletter/Search Style Input */}
              <div className="relative max-w-md group">
                <input
                  type="email"
                  placeholder="Enter your work email..."
                  className="w-full bg-white border-2 border-blue-50 py-5 px-6 rounded-2xl shadow-xl shadow-blue-100/50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-all"
                />
                <button className="absolute right-2 top-2 bottom-2 aspect-square bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-600/30">
                  <ArrowRight01Icon size={24} />
                </button>
              </div>

              <p className="text-slate-400 text-sm font-medium">
                Join 200+ companies building on our tech stack.
              </p>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION: Legal & Tech Stack --- */}
        <div className="mt-24 pt-10 border-t border-blue-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8">
            <p className="text-slate-400 text-[13px] font-bold tracking-tight">
              © {currentYear} {COMPANY_INFO.name}. Built with Precision.
            </p>
            <div className="hidden md:flex gap-6">
              <Link
                href="#"
                className="text-[11px] font-black uppercase text-slate-400 hover:text-blue-600 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-[11px] font-black uppercase text-slate-400 hover:text-blue-600 transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>

          {/* Right: Status & Back to Top */}
          <div className="flex items-center gap-4">
            {/* Minimalist Floating Tech Pill */}
            <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-blue-100 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                System Status: Optimal
              </span>
            </div>

            {/* Back To Top Button */}
            <motion.button
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="group flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
              title="Back to Top"
            >
              <ArrowUp01Icon
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400" />
    </footer>
  );
}
