import type { Metadata } from "next";
import { Mail, MapPin, Phone, Printer } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { serviceOptions } from "@/lib/contact-schema";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get a freight quote or ask a question. Email info@trans-orbit.lk, call +94 11 266 4811, or visit our offices in Colombo 10, Sri Lanka.",
  alternates: { canonical: "/contact" },
};

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.56V4.63a20.9 20.9 0 0 0-2.27-.12c-2.25 0-3.79 1.37-3.79 3.9v2.15H7.92v2.94h2.54V21h3.04Z" />
    </svg>
  );
}

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { service } = await searchParams;
  const requested = typeof service === "string" ? service : "";
  const defaultService = serviceOptions.some((o) => o.value === requested) ? requested : "";

  const quick = [
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: "Phone", value: contact.phone, href: contact.phoneHref },
    { icon: Printer, label: "Fax", value: contact.fax },
  ];

  return (
    <>
      <PageHeader
        title="Let's talk about your shipment."
        lead="Tell us what you're moving and where it needs to go. Your message goes straight to our team."
      />

      <section className="bg-canvas pb-16 md:pb-24">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="rounded-panel border border-hairline bg-canvas p-6 shadow-[0_24px_60px_-30px_rgba(14,31,66,0.25)] md:p-10 lg:col-span-7">
            <h2 className="text-display-md text-ink">Send us a message</h2>
            <p className="text-body mt-2 mb-8 text-ink-muted">
              The more detail you share, the more accurate our quote.
            </p>
            <ContactForm defaultService={defaultService} />
          </div>

          <aside className="space-y-4 lg:col-span-5">
            <ul className="grid gap-3">
              {quick.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-canvas text-brand-navy">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <span>
                      <span className="text-caption block text-ink-subtle">{label}</span>
                      <span className="text-body-strong block text-ink">{value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        className="press flex items-center gap-4 rounded-card bg-mist p-4 transition-colors hover:bg-hairline/60"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 rounded-card bg-mist p-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            {contact.offices.map((office) => (
              <div key={office.label} className="flex gap-4 rounded-card bg-mist p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-canvas text-brand-navy">
                  <MapPin className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-caption text-ink-subtle">{office.label}</p>
                  <address className="text-body mt-0.5 not-italic text-ink">
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapQuery)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-caption mt-2 inline-block text-brand-blue hover:underline"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            ))}

            <a
              href={contact.facebook}
              target="_blank"
              rel="noreferrer"
              className="press flex items-center gap-4 rounded-card bg-mist p-4 transition-colors hover:bg-hairline/60"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-canvas text-brand-navy">
                <FacebookIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="text-caption block text-ink-subtle">Facebook</span>
                <span className="text-body-strong block text-ink">Trans Orbit Global Logistics</span>
              </span>
            </a>
          </aside>
        </div>

        <div className="container-page mt-12 md:mt-16">
          <div className="relative overflow-hidden rounded-panel border border-hairline bg-mist">
            <iframe
              title="Map showing the Trans Orbit operations office in Colombo 10"
              src={`https://www.google.com/maps?q=${encodeURIComponent(contact.offices[0].mapQuery)}&z=15&output=embed`}
              className="block h-[380px] w-full [filter:saturate(0.6)_contrast(1.05)] md:h-[460px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
