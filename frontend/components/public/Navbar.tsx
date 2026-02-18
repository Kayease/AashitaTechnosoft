"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, COMPANY_INFO } from "@/constants";
import { useWindowSize } from "@/hooks";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isMobile } = useWindowSize();

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-7xl">
      <nav className="relative bg-gradient-to-br from-white/95 via-blue-50/90 to-white/95 backdrop-blur-xl rounded-full border border-blue-100 shadow-[0_20px_40px_rgba(37,99,235,0.08),inset_0_-4px_10px_rgba(37,99,235,0.02),inset_0_4px_10px_rgba(255,255,255,0.8)] px-6 py-2.5 flex items-center justify-between transition-all duration-300">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src="/logo.png"
              alt="Aashita.ai Logo"
              className="h-[38px] w-[38px] object-contain drop-shadow-[0_2px_4px_rgba(37,99,235,0.2)]"
            />
          </div>
          <span className="hidden sm:block text-brand-navy font-bold text-lg tracking-tight">
            {COMPANY_INFO.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          <ul className="flex items-center gap-1 bg-blue-100/30 rounded-full p-1 border border-blue-50">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 block
                        ${
                          isActive
                            ? "text-brand-blue"
                            : "text-brand-navy/60 hover:text-brand-blue"
                        }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white shadow-[0_4px_10px_rgba(37,99,235,0.1)] rounded-full border border-blue-50"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Get In Touch Button - Blue & White Claymorphism */}
          <Link
            href="/contact"
            className="ml-2 px-6 py-2 rounded-full bg-brand-blue text-white text-sm font-bold shadow-[0_10px_20px_rgba(37,99,235,0.3),inset_0_-4px_6px_rgba(0,0,0,0.2),inset_0_4px_6px_rgba(255,255,255,0.3)] hover:bg-blue-600 hover:scale-105 transition-all duration-300 border border-white/20"
          >
            GET IN TOUCH
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-brand-navy/5 rounded-full"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{
              rotate: isMobileMenuOpen ? 45 : 0,
              y: isMobileMenuOpen ? 6 : 0,
            }}
            className="w-5 h-0.5 bg-brand-navy rounded-full block"
          />
          <motion.span
            animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
            className="w-5 h-0.5 bg-brand-navy rounded-full block"
          />
          <motion.span
            animate={{
              rotate: isMobileMenuOpen ? -45 : 0,
              y: isMobileMenuOpen ? -6 : 0,
            }}
            className="w-5 h-0.5 bg-brand-navy rounded-full block"
          />
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="absolute top-full left-0 right-0 mt-4 mx-2 bg-white/95 backdrop-blur-2xl z-40 rounded-3xl p-8 shadow-2xl border border-white/60"
            >
              <ul className="flex flex-col items-center gap-6">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="w-full text-center"
                    >
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        className={`text-xl font-bold transition-all block py-3 rounded-2xl ${
                          isActive
                            ? "bg-brand-blue/10 text-brand-blue"
                            : "text-brand-navy/80 hover:bg-brand-navy/5"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
                <li className="w-full pt-4">
                  <Link
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="block w-full text-center py-4 bg-brand-blue text-white rounded-2xl font-bold shadow-lg"
                  >
                    GET IN TOUCH
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
