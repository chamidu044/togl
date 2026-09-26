import Image from "next/image";
import {
  Boxes,
  FlaskConical,
  Handshake,
  Radar,
  ScrollText,
  Users,
} from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { SectionHeading } from "@/components/layout/section-heading";
import { reasons } from "@/lib/content";

const icons = [ScrollText, FlaskConical, Radar, Users, Boxes, Handshake];

// Visual layout: row 1 = 2 + 1, row 2 = 1 + 1 + 1, row 3 = 1 + 2
const spans = [
  "md:col-span-2",
  "",
  "",
  "",
  "",
  "md:col-span-2",
];

const headers: Record<number, React.ReactNode> = {
  0: (
    <div className="relative -mx-2 -mt-2 h-44 overflow-hidden rounded-[16px] md:h-52">
      <Image
        src="/images/team-port.jpg"
        alt="Two logistics staff in hard hats reviewing a tablet beside shipping containers"
        fill
        sizes="(min-width: 768px) 720px, 100vw"
        className="object-cover transition-transform duration-700 group-hover/bento:scale-105"
      />
    </div>
  ),
  5: (
    <div className="relative -mx-2 -mt-2 h-44 overflow-hidden rounded-[16px] md:h-52">
      <Image
        src="/images/port-cranes.jpg"
        alt="Gantry cranes loading a container ship"
        fill
        sizes="(min-width: 768px) 720px, 100vw"
        className="object-cover transition-transform duration-700 group-hover/bento:scale-105"
      />
    </div>
  ),
};

export function WhyTogl() {
  return (
    <section className="section-y bg-canvas">
      <div className="container-page">
        <SectionHeading
          title="Why companies ship with Trans Orbit."
          lead="We are a non-asset-based forwarder. Our investment goes into people and systems, so the advice you get is about your cargo, not our fleet."
        />
        <BentoGrid className="mt-12 md:mt-16">
          {reasons.map((reason, i) => {
            const Icon = icons[i];
            return (
              <BentoGridItem
                key={reason.title}
                title={reason.title}
                description={reason.description}
                header={headers[i]}
                icon={<Icon className="h-5 w-5" strokeWidth={1.8} />}
                className={spans[i]}
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
