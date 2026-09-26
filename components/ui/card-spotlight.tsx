"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import React, { MouseEvent as ReactMouseEvent } from "react";
import { cn } from "@/lib/utils";

// Aceternity UI — Card Spotlight, themed for TOGL's navy tile.
// The original canvas (three.js) reveal is replaced by a light CSS spotlight
// in the logo gradient to keep the page fast.
export const CardSpotlight = ({
  children,
  radius = 320,
  className,
  ...props
}: {
  radius?: number;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(-radius);
  const mouseY = useMotionValue(-radius);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const mask = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, white, transparent 75%)`;

  return (
    <div
      className={cn(
        "group/spotlight relative overflow-hidden rounded-panel border border-white/10 bg-tile-navy-2/60 p-8 md:p-10",
        className,
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(167,208,70,0.35), transparent 45%), radial-gradient(circle at 80% 30%, rgba(0,165,88,0.3), transparent 50%), radial-gradient(circle at 50% 90%, rgba(43,81,154,0.55), transparent 60%)",
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
