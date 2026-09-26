"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { cn } from "@/lib/utils";

// Aceternity UI — Text Generate Effect, triggered when scrolled into view.
export const TextGenerateEffect = ({
  words,
  className,
  wordClassName,
  filter = true,
  duration = 0.6,
  as: Tag = "p",
}: {
  words: string;
  className?: string;
  wordClassName?: string;
  filter?: boolean;
  duration?: number;
  as?: "p" | "h2" | "h3";
}) => {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: true, margin: "0px 0px -15% 0px" });
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (!inView) return;
    animate(
      "span",
      { opacity: 1, filter: filter ? "blur(0px)" : "none" },
      { duration, delay: stagger(0.06) },
    );
  }, [inView, animate, filter, duration]);

  return (
    <Tag ref={scope} className={cn(className)} aria-label={words}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          aria-hidden
          className={cn("opacity-0", wordClassName)}
          style={{ filter: filter ? "blur(10px)" : "none" }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </Tag>
  );
};
