"use client";

import { motion } from "framer-motion";
import {
  CodeIcon,
  DatabaseIcon,
  AiCloud01Icon,
  Settings02Icon,
  CpuIcon,
  Blockchain01Icon,
  GlobalIcon,
  BrowserIcon,
} from "@hugeicons/react";

const icons = [
  CodeIcon,
  DatabaseIcon,
  AiCloud01Icon,
  Settings02Icon,
  CpuIcon,
  Blockchain01Icon,
  GlobalIcon,
  BrowserIcon,
];

export default function FloatingTechIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {[...Array(12)].map((_, i) => {
        const Icon = icons[i % icons.length];
        const size = 20 + Math.random() * 40;
        const duration = 15 + Math.random() * 25;
        const delay = Math.random() * -20;

        return (
          <motion.div
            key={i}
            className="absolute text-[#CCC1FF]"
            initial={{
              x: Math.random() * 100 + "%",
              y: "110%",
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              y: "-10%",
              rotate: 360,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}
            style={{
              left: i * 8 + "%",
            }}
          >
            <Icon size={size} strokeWidth={1} />
          </motion.div>
        );
      })}
    </div>
  );
}
