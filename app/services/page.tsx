import type { Metadata } from "next";
import Image from "next/image";
import {
  Building2,
  Container,
  Package,
  Route,
  ShoppingCart,
  Stamp,
  Check,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeading } from "@/components/layout/section-heading";
import { ServicesNav } from "@/components/sections/services/services-nav";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { PillLink } from "@/components/ui/pill-link";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { modes, services, solutions } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Air freight, sea freight (FCL and LCL), hazardous cargo, cross trade, service parts and document logistics, plus customs brokerage and warehousing from Colombo, Sri Lanka.",
  alternates: { canonical: "/services" },
};

const solutionIcons = [Stamp, Route, ShoppingCart, Package, Container, Building2];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Freight forwarding, end to end."
        lead="Six specialist services and a complete set of supply chain solutions, planned around your cargo, your timeline and your budget."
      />

      <ServicesNav items={services.map(({ slug, title }) => ({ slug, title }))} />

      <div className="bg-canvas pt-10 md:pt-16">
        {services.map((service, i) => {
          const flip = i % 2 === 1;
          return (
            <section
              key={service.slug}
              id={service.slug}
              aria-labelledby={`${service.slug}-title`}
              className="section-y scroll-mt-40"
            >
              <div className="container-page grid items-center gap-10 md:grid-cols-2 md:gap-16">
                <div className={cn("relative", flip && "md:order-2")}>
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-panel shadow-product">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      priority={i === 0}
                      sizes="(min-width: 768px) 600px, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-caption-strong text-brand-teal">{service.category}</p>
                  <h2 id={`${service.slug}-title`} className="text-display-xl mt-2 text-ink">
                    {service.title}
                  </h2>
                  <p className="text-lead mt-5 text-ink">{service.summary}</p>
                  {service.body.map((p) => (
                    <p key={p} className="text-body mt-4 text-ink-muted">
                      {p}
                    </p>
                  ))}
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {service.includes.map((item) => (
                      <li key={item} className="text-caption flex gap-2.5 text-ink">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <PillLink href={`/contact?service=${service.slug}`} className="mt-8">
                    Get a quote for {service.title.toLowerCase()}
                  </PillLink>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Modes */}
      <section className="section-y bg-mist">
        <div className="container-page">
          <SectionHeading
            title="Four ways to move."
            lead="We combine sea, air, road and rail to balance speed and cost for every shipment."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {modes.map((mode, i) => (
              <Reveal as="li" key={mode.name} delay={i * 0.06}>
                <div className="group overflow-hidden rounded-panel bg-canvas">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={mode.image}
                      alt={mode.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-tagline text-ink">{mode.name}</h3>
                    <p className="text-body mt-1 text-ink-muted">{mode.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Supply chain solutions */}
      <section className="section-y bg-canvas">
        <div className="container-page">
          <SectionHeading
            title="Complete supply chain solutions."
            lead="Beyond freight, we handle the steps before and after the journey."
          />
          <BentoGrid className="mt-12 md:auto-rows-auto">
            {solutions.map((s, i) => {
              const Icon = solutionIcons[i];
              return (
                <BentoGridItem
                  key={s.title}
                  title={s.title}
                  description={s.description}
                  icon={<Icon className="h-5 w-5" strokeWidth={1.8} />}
                />
              );
            })}
          </BentoGrid>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
