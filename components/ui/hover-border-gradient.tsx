"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Aceternity UI — Hover Border Gradient, recoloured with the TOGL logo gradient.

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];

const movingMap: Record<Direction, string> = {
  TOP: "radial-gradient(22% 55% at 50% 0%, #a7d046 0%, rgba(167,208,70,0) 100%)",
  LEFT: "radial-gradient(18% 45% at 0% 50%, #00a558 0%, rgba(0,165,88,0) 100%)",
  BOTTOM: "radial-gradient(22% 55% at 50% 100%, #1d6b91 0%, rgba(29,107,145,0) 100%)",
  RIGHT: "radial-gradient(18% 45% at 100% 50%, #8fb0ea 0%, rgba(143,176,234,0) 100%)",
};

const highlight =
  "radial-gradient(75% 180% at 50% 50%, #00a558 0%, rgba(167,208,70,0.35) 45%, rgba(255,255,255,0) 100%)";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement> &
    Record<string, unknown>
>) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  useEffect(() => {
    if (hovered) return;
    const interval = setInterval(() => {
      setDirection((prev) => {
        const i = directions.indexOf(prev);
        return clockwise
          ? directions[(i - 1 + directions.length) % directions.length]
          : directions[(i + 1) % directions.length];
      });
    }, duration * 1000);
    return () => clearInterval(interval);
  }, [hovered, duration, clockwise]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "press relative flex h-min w-fit flex-col flex-nowrap content-center items-center justify-center overflow-visible rounded-full bg-brand-navy/20 p-px decoration-clone",
        containerClassName,
      )}
      {...props}
    >
      <div
        className={cn(
          "z-10 w-auto rounded-[inherit] bg-brand-navy px-5 py-2.5 text-white",
          className,
        )}
      >
        {children}
      </div>
      <motion.div
        aria-hidden
        className="absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]"
        style={{ filter: "blur(2px)", position: "absolute", width: "100%", height: "100%" }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div className="absolute inset-[2px] z-[1] flex-none rounded-[100px] bg-brand-navy" />
    </Tag>
  );
}
