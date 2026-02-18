"use client";

import { useMemo, useState, useEffect } from "react";
import { FloatingRobot } from "./FloatingRobot";
import { useMousePosition } from "@/hooks/useMousePosition";

export function FloatingRobotsBackground() {
  const { x: mouseX, y: mouseY } = useMousePosition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const icons = useMemo(() => {
    if (!mounted) return [];

    const types: ("chip" | "gear" | "circuit")[] = ["chip", "gear", "circuit"];
    const iconCount = 20;

    // Create a grid-based distribution that avoids center (where text is)
    const gridCols = 6;
    const gridRows = 4;
    const icons = [];

    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        if (icons.length >= iconCount) break;

        // No exclusion zone needed for asymmetric layout - let icons float everywhere
        // The opacity is low enough to not interfere with text

        // Calculate cell boundaries
        const cellWidth = 100 / gridCols;
        const cellHeight = 100 / gridRows;

        // Add randomness within each cell (10-90% of cell to avoid edges)
        const x = col * cellWidth + (Math.random() * 0.8 + 0.1) * cellWidth;
        const y = row * cellHeight + (Math.random() * 0.8 + 0.1) * cellHeight;

        icons.push({
          id: icons.length,
          x,
          y,
          delay: Math.random() * 5,
          duration: 8 + Math.random() * 4,
          size: 35 + Math.random() * 25,
          iconType: types[icons.length % types.length],
        });
      }
    }

    return icons;
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon) => (
        <FloatingRobot
          key={icon.id}
          x={icon.x}
          y={icon.y}
          delay={icon.delay}
          duration={icon.duration}
          size={icon.size}
          iconType={icon.iconType}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      ))}
    </div>
  );
}
