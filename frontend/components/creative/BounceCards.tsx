"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./BounceCards.css";

gsap.registerPlugin(ScrollTrigger);

interface BounceCardsProps {
  className?: string;
  items?: any[];
  renderItem?: (item: any, index: number) => React.ReactNode;
  containerWidth?: number | string;
  containerHeight?: number | string;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[]; // Target Grid Layout
  initialTransformStyles?: string[]; // Initial Fan Layout
  enableHover?: boolean;
}

export default function BounceCards({
  className = "",
  items = [],
  renderItem,
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = "elastic.out(1, 0.8)",
  transformStyles = [],
  initialTransformStyles = [],
  enableHover = true,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Scale-in animation
      gsap.fromTo(
        ".card-wrapper",
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay,
        },
      );

      // 2. Scroll-triggered Transition from Fan to Grid
      if (initialTransformStyles.length > 0 && transformStyles.length > 0) {
        // Set initial positions (Fan)
        items.forEach((_, i) => {
          gsap.set(`.card-${i}`, {
            transform: initialTransformStyles[i] || "none",
          });
        });

        // Create scroll animation to Grid
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            // markers: true // Debugging
          },
        });

        items.forEach((_, i) => {
          tl.to(
            `.card-${i}`,
            {
              transform: transformStyles[i] || "none",
              ease: "power2.inOut",
            },
            0,
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [
    animationStagger,
    easeType,
    animationDelay,
    initialTransformStyles,
    transformStyles,
    items,
  ]);

  const getNoRotationTransform = (transformStr: string) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)");
    } else if (transformStr === "none") {
      return "rotate(0deg)";
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform: string, offsetX: number) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === "none"
        ? `translate(${offsetX}px)`
        : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    items.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);

      const baseTransform = transformStyles[i] || "none";

      if (i === hoveredIdx) {
        const noRotationTransform = getNoRotationTransform(baseTransform);
        gsap.to(target, {
          transform: noRotationTransform,
          duration: 0.4,
          ease: "back.out(1.4)",
          overwrite: "auto",
        });
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);

        const distance = Math.abs(hoveredIdx - i);
        const delay = distance * 0.05;

        gsap.to(target, {
          transform: pushedTransform,
          duration: 0.4,
          ease: "back.out(1.4)",
          delay,
          overwrite: "auto",
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    items.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);
      const baseTransform = transformStyles[i] || "none";
      gsap.to(target, {
        transform: baseTransform,
        duration: 0.4,
        ease: "back.out(1.4)",
        overwrite: "auto",
      });
    });
  };

  return (
    <div
      className={`bounceCardsContainer ${className}`}
      ref={containerRef}
      style={
        {
          position: "relative",
          width: containerWidth,
          height: containerHeight,
        } as React.CSSProperties
      }
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`card-wrapper card-${idx}`}
          style={{
            transform:
              initialTransformStyles[idx] || transformStyles[idx] || "none",
            position: "absolute",
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          {renderItem ? (
            renderItem(item, idx)
          ) : (
            <img className="image" src={item} alt={`card-${idx}`} />
          )}
        </div>
      ))}
    </div>
  );
}
