import { Mail, Phone } from "lucide-react";
import { PillLink } from "@/components/ui/pill-link";
import { Reveal } from "@/components/motion/reveal";
import { contact } from "@/lib/content";

export function CtaBand({
  title = "Ready to move your cargo?",
  lead = "Tell us what you're shipping and where. We'll come back with the right route and a clear quote.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-tile-navy text-white">
      {/* Faint world map and a sweep of the logo gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('/maps/world-dots-light.svg')] bg-[length:140%_auto] bg-[position:60%_40%] bg-no-repeat opacity-[0.09] md:bg-[length:110%_auto]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[120%] w-[140%] -translate-x-1/2 rounded-[100%] opacity-40 blur-3xl [background:radial-gradient(closest-side,rgba(0,165,88,0.45),rgba(43,81,154,0.35)_55%,transparent)]"
      />
      <div className="container-text relative py-20 text-center md:py-28">
        <Reveal>
          <h2 className="text-display-xl text-balance">{title}</h2>
          <p className="text-lead-airy mx-auto mt-5 max-w-xl text-pretty text-white/70">
            {lead}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <PillLink href="/contact" variant="light" size="lg">
              Get a quote
            </PillLink>
            <PillLink href={contact.phoneHref} variant="ghost-light" size="lg">
              <Phone className="h-4 w-4" /> {contact.phone}
            </PillLink>
          </div>
          <a
            href={`mailto:${contact.email}`}
            className="text-caption mt-6 inline-flex items-center gap-2 text-brand-sky hover:text-white"
          >
            <Mail className="h-4 w-4" /> {contact.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
