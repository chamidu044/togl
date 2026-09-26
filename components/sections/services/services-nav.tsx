"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/** Sticky glass chip bar that tracks which service section is in view. */
export function ServicesNav({ items }: { items: { slug: string; title: string }[] }) {
  const [active, setActive] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          setActive((prev) => (entry.isIntersecting ? id : prev === id ? null : prev));
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const { slug } of items) {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  // Keep the active chip visible on small screens.
  useEffect(() => {
    if (!active) return;
    const chip = scrollerRef.current?.querySelector<HTMLElement>(`[data-slug="${active}"]`);
    chip?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return (
    <div className="sticky top-[84px] z-30 md:top-[92px]">
      <div className="container-page">
        <nav aria-label="Services" className="glass mx-auto w-fit max-w-full rounded-full p-1.5">
          <div
            ref={scrollerRef}
            className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item) => {
              const isActive = item.slug === active;
              return (
                <a
                  key={item.slug}
                  href={`#${item.slug}`}
                  data-slug={item.slug}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative shrink-0 rounded-full px-4 py-2 text-caption whitespace-nowrap transition-colors",
                    isActive ? "text-white" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="services-chip"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-brand-navy"
                    />
                  )}
                  <span className="relative z-10">{item.title}</span>
                </a>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
