"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Plane, Ship, Stamp, Warehouse, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Inspired by Aceternity UI — Container Scroll Animation: the panel starts
// tilted back in 3D and settles flat as the page scrolls. Inside, a slow
// slideshow of TOGL's four specialisms, driven by the glass tab dock.

type Slide = {
  name: string;
  detail: string;
  caption: string;
  icon: LucideIcon;
  image: string;
  alt: string;
};

const slides: Slide[] = [
  {
    name: "Sea",
    detail: "FCL and LCL",
    caption: "FCL and LCL ocean freight to and from the world's major markets.",
    icon: Ship,
    image: "/images/sea-aerial.jpg",
    alt: "Aerial view of a container ship under way",
  },
  {
    name: "Air",
    detail: "Consolidation",
    caption: "Air consolidation to and from India, even for separate pickups.",
    icon: Plane,
    image: "/images/air-cargo.jpg",
    alt: "Cargo aircraft on an airport apron at sunset",
  },
  {
    name: "Customs",
    detail: "Brokerage",
    caption: "Over 100 years of combined customs brokerage know-how.",
    icon: Stamp,
    image: "/images/team-port.jpg",
    alt: "Two logistics staff in hard hats reviewing a tablet beside shipping containers",
  },
  {
    name: "Warehousing",
    detail: "Storage and transport",
    caption: "Value-added warehousing, fulfilment and transport.",
    icon: Warehouse,
    image: "/images/warehouse-aisle.jpg",
    alt: "Warehouse aisle stocked with cartons",
  },
];

const SLIDE_MS = 5500;

export function HeroShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: "-10% 0px" });
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 25%"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  // Advance the slideshow only while it's on screen.
  useEffect(() => {
    if (!inView) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [active, inView]);

  const slide = slides[active];

  return (
    <div ref={ref} className="container-page relative mt-12 md:mt-16 [perspective:1400px]">
      {/* Soft brand halo behind the panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[10%] -top-10 bottom-10 rounded-full opacity-60 blur-3xl [background:radial-gradient(ellipse_at_50%_40%,rgba(143,176,234,0.5),rgba(167,208,70,0.14)_50%,transparent_70%)]"
      />
      <motion.div
        style={reduced ? undefined : { rotateX, scale, y, transformOrigin: "50% 0%" }}
        className="relative mx-auto max-w-[1180px] rounded-[30px] bg-white/60 p-1.5 shadow-[0_40px_100px_-30px_rgba(14,31,66,0.45),0_0_0_1px_rgba(15,26,46,0.06)] md:rounded-[38px] md:p-2.5"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-tile-navy sm:aspect-[16/10] md:aspect-[16/8] md:rounded-[30px]">
          <AnimatePresence initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: SLIDE_MS / 1000 + 1.2, ease: "linear" }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={active === 0}
                  sizes="(min-width: 1280px) 1180px, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Legibility gradients */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tile-navy/75 via-tile-navy/10 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-tile-navy/35 to-transparent" />

          {/* Caption */}
          <div className="absolute inset-x-0 top-0 p-6 md:p-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                transition={{ duration: 0.5 }}
                className="max-w-md text-[clamp(1.25rem,1rem+1vw,1.75rem)] leading-tight font-semibold tracking-[-0.02em] text-balance text-white"
                aria-live="polite"
              >
                {slide.caption}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Glass tab dock */}
          <div
            role="tablist"
            aria-label="What we specialise in"
            className="glass absolute inset-x-3 bottom-3 mx-auto grid max-w-3xl grid-cols-4 gap-1 rounded-[20px] bg-white/65 p-1.5 md:inset-x-6 md:bottom-6 md:rounded-full"
          >
            {slides.map(({ name, detail, icon: Icon }, i) => {
              const isActive = i === active;
              return (
                <button
                  key={name}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className={cn(
                    "press relative flex flex-col items-center gap-1.5 overflow-hidden rounded-2xl px-1 py-2 text-left transition-colors duration-300 sm:flex-row sm:gap-3 sm:rounded-full sm:px-3 sm:py-2.5 md:px-4",
                    isActive ? "bg-white" : "hover:bg-white/60",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                      isActive ? "bg-brand-navy text-white" : "bg-white/70 text-brand-navy",
                    )}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <span className="text-center leading-tight sm:text-left">
                    <span className="block text-[11px] font-semibold tracking-[-0.01em] text-ink sm:text-caption-strong">{name}</span>
                    <span className="text-fine hidden text-ink-muted sm:block">{detail}</span>
                  </span>
                  {/* Progress to the next slide */}
                  {isActive && inView && !reduced && (
                    <motion.span
                      key={`progress-${active}`}
                      aria-hidden
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                      className="bg-gradient-orbit absolute inset-x-4 bottom-0 h-[2px] origin-left rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
