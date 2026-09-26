"use client";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import Link from "next/link";
import React, { createContext, useContext, useState } from "react";

// Aceternity UI — Resizable Navbar, rebuilt as a floating glass pill for TOGL.
// The pill starts wide and airy, then springs into a compact frosted capsule
// once the page scrolls. Its bottom edge doubles as a scroll-progress line.

const NavbarContext = createContext({ visible: false });
export const useNavbar = () => useContext(NavbarContext);

export const Navbar = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 40);
  });

  return (
    <NavbarContext.Provider value={{ visible }}>
      <header
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-4 md:pt-4",
          className,
        )}
      >
        {children}
      </header>
    </NavbarContext.Provider>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return (
    <motion.span
      aria-hidden
      style={{ scaleX }}
      className="bg-gradient-orbit absolute inset-x-6 bottom-0 h-[1.5px] origin-left rounded-full"
    />
  );
};

const glassBase =
  "pointer-events-auto relative mx-auto w-full rounded-full transition-[background-color,box-shadow] duration-500 [-webkit-backdrop-filter:saturate(180%)_blur(20px)] [backdrop-filter:saturate(180%)_blur(20px)]";

export const NavBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { visible } = useNavbar();
  return (
    <motion.nav
      aria-label="Main"
      initial={false}
      animate={{ maxWidth: visible ? 940 : 1240, y: visible ? 4 : 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 32 }}
      className={cn(
        glassBase,
        "hidden grid-cols-[1fr_auto_1fr] items-center px-2.5 py-2 lg:grid",
        visible
          ? "bg-white/65 shadow-glass"
          : "bg-white/35 shadow-[0_0_0_1px_rgba(15,26,46,0.04)]",
        className,
      )}
    >
      {/* Top sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
      />
      {children}
      {visible && <ScrollProgress />}
    </motion.nav>
  );
};

export const NavItems = ({
  items,
  activeHref,
  className,
  onItemClick,
}: {
  items: { name: string; href: string }[];
  activeHref?: string | null;
  className?: string;
  onItemClick?: () => void;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn("flex items-center justify-center gap-0.5", className)}
    >
      {items.map((item, idx) => {
        const active = item.href === activeHref;
        return (
          <Link
            key={item.href}
            href={item.href}
            onMouseEnter={() => setHovered(idx)}
            onFocus={() => setHovered(idx)}
            onClick={onItemClick}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative rounded-full px-4 py-2 text-caption transition-colors duration-200",
              active ? "text-ink" : "text-ink-muted hover:text-ink",
            )}
          >
            {hovered === idx && (
              <motion.span
                layoutId="nav-hover"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="absolute inset-0 rounded-full bg-ink/[0.06]"
              />
            )}
            <span className="relative z-10">{item.name}</span>
            {active && (
              <motion.span
                layoutId="nav-active"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="bg-gradient-orbit absolute bottom-[3px] left-1/2 h-[3px] w-4 -translate-x-1/2 rounded-full"
              />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export const MobileNav = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { visible } = useNavbar();
  return (
    <nav
      aria-label="Main"
      className={cn(
        glassBase,
        "px-2.5 py-2 lg:hidden",
        visible
          ? "bg-white/70 shadow-glass"
          : "bg-white/45 shadow-[0_0_0_1px_rgba(15,26,46,0.05)]",
        className,
      )}
    >
      {children}
      {visible && <ScrollProgress />}
    </nav>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  id: string;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        id={id}
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "glass pointer-events-auto mx-auto mt-2 w-full origin-top rounded-panel bg-white/80 p-3 lg:hidden",
          className,
        )}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export const MobileNavToggle = ({
  isOpen,
  onClick,
  controls,
}: {
  isOpen: boolean;
  onClick: () => void;
  controls: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-expanded={isOpen}
    aria-controls={controls}
    aria-label={isOpen ? "Close menu" : "Open menu"}
    className="press relative flex h-10 w-10 items-center justify-center rounded-full bg-ink/[0.05] text-ink"
  >
    <motion.span
      animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
      className="absolute h-[1.5px] w-4 rounded-full bg-current"
    />
    <motion.span
      animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
      className="absolute h-[1.5px] w-4 rounded-full bg-current"
    />
  </button>
);
