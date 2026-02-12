import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#about", label: "About" },
  { href: "#team", label: "Team" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#enterprises", label: "Enterprises" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      // Small timeout to allow menu close animation to start
      setTimeout(() => {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 md:top-4 left-0 right-0 z-50 mx-auto w-full md:w-[99%] max-w-full transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? "bg-card/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-b md:border border-white/20 rounded-none md:rounded-2xl"
          : "bg-card/50 backdrop-blur-md border-b md:border border-white/10 rounded-none md:rounded-2xl shadow-lg"
      }`}
    >
      <div className="px-1 md:px-2">
        <nav className="flex items-center justify-between h-20">
          <motion.a
            href="#"
            className="flex items-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="h-12 flex items-center">
              <img
                src="/logo.png"
                alt="Aashita Technosoft Logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1 bg-background/50 backdrop-blur-sm px-2 py-1.5 rounded-full border border-white/10 shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 xl:px-5 py-2 text-xs xl:text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-white/10 rounded-full transition-all duration-300 relative group whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-4">
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="px-4 xl:px-6 py-2.5 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-full font-medium text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2 text-foreground bg-background/50 rounded-full backdrop-blur-sm border border-white/10 cursor-pointer relative z-50 hover:bg-background/80 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, margin: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            exit={{ opacity: 0, height: 0, margin: 0 }}
            className="xl:hidden overflow-hidden rounded-b-2xl border-t border-white/10"
          >
            <div className="px-6 pb-6 pt-2 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-foreground font-medium hover:bg-white/5 rounded-xl transition-colors"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4">
                <a
                  href="#contact"
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-xl font-medium shadow-lg shadow-primary/20"
                  onClick={(e) => handleNavClick(e, "#contact")}
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
