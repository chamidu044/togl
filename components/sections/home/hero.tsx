import { FlipWords } from "@/components/ui/flip-words";
import { HeroShowcase } from "@/components/sections/home/hero-showcase";
import { PillLink } from "@/components/ui/pill-link";
import { company } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas pb-16 md:pb-24">
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
          Your trusted partner for
          <br />
          <FlipWords
            words={["sea freight", "air freight", "customs brokerage", "warehousing"]}
            align="center"
            className="font-semibold text-brand-navy"
          />
          <br />
          from Colombo, Sri Lanka, since {company.founded}.
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

      <HeroShowcase />
    </section>
  );
}
