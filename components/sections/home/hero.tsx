"use client";

import { motion } from "motion/react";
import { Plane, Ship, TrainFront, Truck } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import { Globe } from "@/components/ui/globe";
import { PillLink } from "@/components/ui/pill-link";
import { colombo, company, hubs } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

const modeChips = [
  { name: "Sea", detail: "FCL and LCL", icon: Ship },
  { name: "Air", detail: "Consolidated", icon: Plane },
  { name: "Road", detail: "Door to door", icon: Truck },
  { name: "Rail", detail: "Container rail", icon: TrainFront },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas">
      {/* Dotted field, masked to a soft ellipse around the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(36,63,122,0.16)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_60%_45%_at_50%_30%,black,transparent)]"
      />

      <div className="container-page relative pt-32 text-center md:pt-44">
        <h1 className="text-hero rise mx-auto max-w-4xl text-balance text-ink">
          Access to the world.
        </h1>

        <p className="text-lead-airy rise mx-auto mt-6 max-w-2xl text-pretty text-ink-muted [--rise-blur:0px] [--rise-delay:200ms] [--rise-y:16px]">
          Freight forwarding by{" "}
          <FlipWords
            words={["sea", "air", "road", "rail"]}
            className="font-semibold text-brand-navy"
          />{" "}
          from Colombo, Sri Lanka. Handled by the same experienced team since{" "}
          {company.founded}.
        </p>

        <div className="rise mt-9 flex flex-wrap items-center justify-center gap-3 [--rise-blur:0px] [--rise-delay:350ms] [--rise-y:12px]">
          <PillLink href="/contact" size="lg">
            Get a quote
          </PillLink>
          <PillLink href="/#services" variant="secondary" size="lg">
            Explore services
          </PillLink>
        </div>
      </div>

      {/* Globe window — the globe rises out of the page and is cropped by the next section */}
      <div className="relative mx-auto mt-6 h-[min(100vw,600px)] max-w-[1200px] md:mt-2 md:h-[560px]">
        <div
          aria-hidden
          className="pointer-events-none absolute top-[8%] left-1/2 aspect-square w-[min(120vw,980px)] -translate-x-1/2 rounded-full opacity-60 blur-3xl [background:radial-gradient(circle_at_50%_40%,rgba(143,176,234,0.45),rgba(167,208,70,0.12)_45%,transparent_65%)]"
        />
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.35, ease }}
          className="absolute top-0 left-1/2 w-[min(125vw,940px)] -translate-x-1/2"
        >
          <Globe origin={colombo} destinations={hubs} />
        </motion.div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas"
        />

        {/* Transport modes — glass dock floating over the globe */}
        <motion.ul
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease }}
          aria-label="Transport modes"
          className="glass absolute inset-x-4 bottom-4 mx-auto grid max-w-3xl grid-cols-4 gap-1 rounded-[22px] p-1.5 md:bottom-10 md:rounded-full"
        >
          {modeChips.map(({ name, detail, icon: Icon }) => (
            <li
              key={name}
              className="flex flex-col items-center gap-1.5 rounded-2xl px-1 py-2 transition-colors duration-300 hover:bg-white/80 sm:flex-row sm:gap-3 sm:rounded-full sm:px-3 sm:py-2.5 md:px-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white">
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <span className="text-center leading-tight sm:text-left">
                <span className="text-caption-strong block text-ink">{name}</span>
                <span className="text-fine hidden text-ink-subtle sm:block">{detail}</span>
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
