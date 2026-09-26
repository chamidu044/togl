import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { SectionHeading } from "@/components/layout/section-heading";
import { processSteps } from "@/lib/content";

export function Process() {
  return (
    <section id="process" className="section-y bg-mist">
      <div className="container-page">
        <SectionHeading
          title="How your shipment moves."
          lead="One team from the first conversation to final delivery. Here's what happens after you get in touch."
        />
        <StickyScroll content={processSteps} className="mt-14 md:mt-20" />
      </div>
    </section>
  );
}
