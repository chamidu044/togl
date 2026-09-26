import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import { SectionHeading } from "@/components/layout/section-heading";
import { PillLink } from "@/components/ui/pill-link";
import { services, type Service } from "@/lib/content";

function ServiceDetail({ service }: { service: Service }) {
  return (
    <div className="grid gap-8 md:grid-cols-5 md:gap-10">
      <div className="md:col-span-3">
        <p className="text-lead text-ink">{service.summary}</p>
        {service.body.map((p) => (
          <p key={p} className="text-body mt-4 text-ink-muted">
            {p}
          </p>
        ))}
        <div className="mt-8 flex flex-wrap gap-3">
          <PillLink href={`/contact?service=${service.slug}`}>
            Get a quote for {service.title.toLowerCase()}
          </PillLink>
          <PillLink href={`/services#${service.slug}`} variant="secondary">
            Read more
          </PillLink>
        </div>
      </div>
      <div className="md:col-span-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(min-width: 768px) 320px, 100vw"
            className="object-cover"
          />
        </div>
        <h3 className="text-caption-strong mt-6 text-ink">What&apos;s included</h3>
        <ul className="mt-3 space-y-2.5">
          {service.includes.map((item) => (
            <li key={item} className="text-caption flex gap-2.5 text-ink-muted">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ServicesCarousel() {
  const cards = services.map((service, index) => (
    <Card
      key={service.slug}
      index={index}
      card={{
        src: service.image,
        alt: service.imageAlt,
        title: service.title,
        category: service.category,
        content: <ServiceDetail service={service} />,
      }}
    />
  ));

  return (
    <section id="services" className="section-y overflow-hidden bg-canvas">
      <div className="container-page flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          title="Services built around your cargo."
          lead="From a single urgent air shipment to regular ocean containers and dangerous goods, we plan each move around what you're shipping."
        />
        <Link
          href="/services"
          className="text-body shrink-0 text-brand-blue underline-offset-4 hover:underline"
        >
          See all services
        </Link>
      </div>
      <Carousel items={cards} />
    </section>
  );
}
