import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeading } from "@/components/layout/section-heading";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal } from "@/components/motion/reveal";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { CtaBand } from "@/components/sections/cta-band";
import {
  company,
  contact,
  industries,
  leadership,
  principles,
  solutions,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Trans Orbit Global Logistics is a non-asset-based freight forwarder in Colombo, Sri Lanka, founded in 2011 and led by CEO Janaka Alexander. Meet the company, our mission and our people.",
  alternates: { canonical: "/about" },
};

const corporate = [
  { label: "Company name", value: company.legalName },
  { label: "Status", value: company.status },
  { label: "Founded", value: String(company.founded) },
  { label: "Scope of business", value: company.scope },
  ...company.registrations,
  { label: "Operational address", value: contact.offices[0].lines.join(", ") },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Built on people, not assets."
        lead={`Since ${company.founded}, Trans Orbit Global Logistics has delivered reliable freight solutions worldwide, specialising in air and sea freight, customs brokerage, warehousing and transport.`}
      />

      <div className="container-page">
        <ParallaxImage
          src="/images/port-cranes.jpg"
          alt="Gantry cranes loading containers onto a ship at a busy port"
          className="aspect-[16/10] md:aspect-[21/9]"
          priority
        />
      </div>

      {/* Story */}
      <section className="section-y bg-canvas">
        <div className="container-page">
          <SectionHeading
            title="Our story."
            lead="A Colombo company that grew by earning trust one shipment at a time."
          />
        </div>
        <TracingBeam className="mt-12 px-6 md:mt-16">
          <div className="space-y-16 pl-6 md:pl-10">
            <article>
              <h3 className="text-display-md text-ink">What we offer</h3>
              <p className="text-body mt-4 text-ink-muted">
                We aim to create real value for the companies we support. Over the
                years we have widened what we do by personalising our offer for
                both international mid-sized companies and key accounts.
              </p>
            </article>
            <article>
              <h3 className="text-display-md text-ink">Where we work</h3>
              <p className="text-body mt-4 text-ink-muted">
                We move cargo for a wide range of sectors, including{" "}
                {industries.slice(0, -1).join(", ").toLowerCase()} and{" "}
                {industries[industries.length - 1].toLowerCase()}.
              </p>
              <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-card">
                <Image
                  src="/images/port-terminal.jpg"
                  alt="Stacks of colourful containers at a container terminal"
                  fill
                  sizes="(min-width: 768px) 720px, 100vw"
                  className="object-cover"
                />
              </div>
            </article>
            <article>
              <h3 className="text-display-md text-ink">What we know</h3>
              <p className="text-body mt-4 text-ink-muted">
                We understand the complexity of customs, and the regulations and
                documentation a smooth clearance depends on.
              </p>
              <p className="text-lead mt-6 text-ink">
                Together, our staff bring{" "}
                <PointerHighlight rectangleClassName="rounded-md">
                  <span className="relative z-10 px-1.5 font-semibold text-brand-navy">
                    over 100 years
                  </span>
                </PointerHighlight>{" "}
                of customs brokerage know-how for import and export.
              </p>
            </article>
          </div>
        </TracingBeam>
      </section>

      {/* Company description */}
      <section className="section-y bg-mist">
        <div className="container-page grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h2 className="text-display-xl text-balance text-ink">A full-service 3PL.</h2>
          </Reveal>
          <div className="text-body space-y-5 text-ink-muted md:col-span-7">
            <p className="text-lead text-ink">
              We provide supply chain management solutions, including international
              and domestic transportation, warehousing, and customs brokerage and
              trade consulting.
            </p>
            <p>
              We operate from two offices in Sri Lanka, offering transportation and
              international services that span the globe. Every solution is
              supported by fully web-enabled technology that gives real-time
              visibility of products throughout the supply chain.
            </p>
            <p>
              Our solutions are flexible and scalable. Our mission is to support the
              changing demands within our clients&apos; supply chains, and we
              operate with honesty and integrity.
            </p>
            <ul className="grid gap-x-8 gap-y-3 pt-2 sm:grid-cols-2">
              {solutions.map((s) => (
                <li key={s.title} className="flex items-center gap-3 text-ink">
                  <span className="bg-gradient-orbit h-1.5 w-1.5 shrink-0 rounded-full" />
                  {s.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Mission, vision, objective */}
      <section className="section-y relative overflow-hidden bg-tile-navy text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[url('/maps/world-dots-light.svg')] bg-[length:120%_auto] bg-center bg-no-repeat opacity-[0.07]"
        />
        <div className="container-page relative">
          <SectionHeading
            tone="dark"
            title="What drives us."
            lead="Three commitments that shape how we work with every client."
          />
          <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
            {principles.map((p) => (
              <CardSpotlight key={p.title} className="h-full">
                <h3 className="text-tagline text-white">{p.title}</h3>
                <p className="text-body mt-4 text-white/70">{p.body}</p>
              </CardSpotlight>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-y bg-canvas">
        <div className="container-page grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <SectionHeading
              title="Leadership."
              lead="Led by an industry veteran and governed by a board of directors."
            />
          </div>
          <Reveal className="md:col-span-7">
            <div className="relative overflow-hidden rounded-panel border border-hairline bg-canvas p-7 md:p-10">
              <span aria-hidden className="bg-gradient-orbit absolute inset-x-0 top-0 h-1" />
              <p className="text-caption-strong text-brand-teal">{leadership.ceo.title}</p>
              <h3 className="text-display-lg mt-2 text-ink">Mr. {leadership.ceo.name}</h3>
              <p className="text-lead mt-4 text-ink">{leadership.ceo.summary}</p>
              <p className="text-body mt-4 text-ink-muted">
                Under his leadership our team provides seamless, cost-effective supply
                chain solutions tailored to each client&apos;s needs, with deep expertise
                in air and sea freight, LCL consolidation, customs brokerage and
                warehousing.
              </p>
              <ul className="mt-8 space-y-3 border-t border-hairline pt-6">
                {leadership.structure.map((line) => (
                  <li key={line} className="text-body flex gap-3 text-ink-muted">
                    <span className="bg-gradient-orbit mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                    {line}
                  </li>
                ))}
              </ul>
              <p className="text-tagline mt-8 text-brand-navy">{company.promise}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* People */}
      <section className="section-y bg-mist">
        <div className="container-page grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-panel shadow-product">
            <Image
              src="/images/team-warehouse.jpg"
              alt="Two members of staff walking through a warehouse aisle"
              fill
              sizes="(min-width: 768px) 600px, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              title="Our people."
              lead="A dedicated team of experienced professionals, most of whom have worked with us for almost a decade."
            />
            <p className="text-body mt-6 max-w-xl text-ink-muted">
              We identify and design logistics solutions that meet the exact needs
              of each customer, and make sure cargo is delivered safely from origin
              to destination, efficiently and cost-effectively.
            </p>
          </div>
        </div>
      </section>

      {/* Corporate information */}
      <section className="section-y bg-canvas">
        <div className="container-text">
          <Reveal>
            <h2 className="text-display-lg text-ink">Corporate information</h2>
          </Reveal>
          <dl className="mt-8 divide-y divide-hairline rounded-panel border border-hairline bg-pearl px-6 md:px-8">
            {corporate.map((row) => (
              <div key={row.label} className="grid gap-1 py-5 sm:grid-cols-3 sm:gap-6">
                <dt className="text-caption text-ink-subtle">{row.label}</dt>
                <dd className="text-body text-ink sm:col-span-2">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand
        title="Let's move something together."
        lead="Whether it's one urgent shipment or a regular trade lane, we'd like to hear about it."
      />
    </>
  );
}
