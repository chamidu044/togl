"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

// Aceternity UI — Sticky Scroll Reveal, adapted to follow page scroll
// (instead of an inner scroll box) with a sticky image panel.

type Step = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const StickyScroll = ({
  content,
  className,
}: {
  content: Step[];
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(
      content.length - 1,
      Math.max(0, Math.floor(latest * content.length)),
    );
    setActive(next);
  });

  return (
    <div
      ref={ref}
      className={cn("relative grid gap-10 lg:grid-cols-2 lg:gap-20", className)}
    >
      {/* Sticky visual */}
      <div className="hidden lg:block">
        <div className="sticky top-28 aspect-[4/5] w-full overflow-hidden rounded-panel bg-hairline shadow-product">
          <AnimatePresence initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={content[active].image}
                alt={content[active].imageAlt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-tile-navy/70 to-transparent p-7 pt-24">
            <p className="text-caption-strong text-white/70">
              Step {active + 1} of {content.length}
            </p>
            <p className="text-tagline mt-1 text-white">{content[active].title}</p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="relative">
        <div className="absolute top-2 bottom-2 left-[19px] w-px bg-hairline" aria-hidden />
        <motion.div
          aria-hidden
          className="absolute top-2 bottom-2 left-[19px] w-px origin-top [background-image:linear-gradient(180deg,#a7d046,#00a558_30%,#1d6b91_60%,#243f7a)]"
          style={{ scaleY: progress }}
        />
        <ol className="space-y-6 lg:space-y-0">
          {content.map((item, index) => {
            const isActive = index === active;
            return (
              <li
                key={item.title}
                className="relative flex gap-6 lg:min-h-[46vh] lg:pb-16"
              >
                <motion.span
                  animate={{
                    backgroundColor: isActive ? "#243f7a" : "#ffffff",
                    color: isActive ? "#ffffff" : "#647082",
                    scale: isActive ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline text-caption-strong"
                >
                  {index + 1}
                </motion.span>
                <div>
                  <motion.h3
                    animate={{ color: isActive ? "#0f1a2e" : "#647082" }}
                    transition={{ duration: 0.3 }}
                    className="text-display-md max-lg:text-ink!"
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    animate={{ color: isActive ? "#4f5a6d" : "#647082" }}
                    transition={{ duration: 0.3 }}
                    className="text-body mt-3 max-w-md max-lg:text-ink-muted!"
                  >
                    {item.description}
                  </motion.p>
                  <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-card lg:hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
