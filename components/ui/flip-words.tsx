"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

// Aceternity UI — Flip Words, themed for TOGL.
export const FlipWords = ({
  words,
  duration = 2600,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAnimating) return;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % words.length);
      setIsAnimating(true);
    }, duration);
    return () => clearTimeout(id);
  }, [isAnimating, duration, words.length]);

  const currentWord = words[index];

  return (
    <span className="relative inline-block">
      {/* Reserve width of the longest word so the line never jumps */}
      <span aria-hidden className="invisible whitespace-nowrap">
        {words.reduce((a, b) => (b.length > a.length ? b : a), "")}
      </span>
      <AnimatePresence onExitComplete={() => setIsAnimating(false)}>
        <motion.span
          key={currentWord}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          exit={{
            opacity: 0,
            y: -32,
            x: 24,
            filter: "blur(8px)",
            scale: 1.6,
            position: "absolute",
          }}
          className={cn(
            "absolute inset-y-0 left-0 z-10 inline-block whitespace-nowrap text-left",
            className,
          )}
        >
          {currentWord.split("").map((letter, i) => (
            <motion.span
              key={currentWord + i}
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: i * 0.05, duration: 0.2 }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
};
