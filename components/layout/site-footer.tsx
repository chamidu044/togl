import Link from "next/link";
import Image from "next/image";
import { company, contact, services } from "@/lib/content";

const columns = [
  {
    title: "Explore",
    links: [
      { name: "Services", href: "/#services" },
      { name: "How it works", href: "/#process" },
      { name: "Global network", href: "/#network" },
      { name: "About us", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: services.map((s) => ({ name: s.title, href: `/services#${s.slug}` })),
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-mist text-ink-muted">
      <div className="container-page pt-16 pb-10 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Image
              src="/brand/togl-logo.png"
              alt="Trans Orbit Global Logistics — Access to the world"
              width={220}
              height={128}
              className="h-auto w-[200px]"
            />
            <p className="text-caption mt-6 max-w-xs">
              Air and sea freight, customs brokerage and warehousing from
              Colombo, Sri Lanka, since {company.founded}.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="md:col-span-2">
              <h2 className="text-caption-strong text-ink">{col.title}</h2>
              <ul className="mt-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-caption leading-[2.4] transition-colors hover:text-brand-blue"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="md:col-span-4">
            <h2 className="text-caption-strong text-ink">Get in touch</h2>
            <ul className="text-caption mt-3 space-y-1 leading-[2]">
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-brand-blue">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className="hover:text-brand-blue">
                  Tel {contact.phone}
                </a>
              </li>
              <li>Fax {contact.fax}</li>
            </ul>
            <address className="text-caption mt-4 not-italic">
              {contact.offices[0].lines.join(", ")}
            </address>
          </div>
        </div>

        <div className="text-fine mt-14 flex flex-col gap-3 border-t border-hairline pt-6 text-ink-subtle md:flex-row md:items-center md:justify-between">
          <p>
            Copyright © {year} {company.legalName}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a
              href={contact.facebook}
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-blue"
            >
              Facebook
            </a>
            <Link href="/contact" className="hover:text-brand-blue">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
