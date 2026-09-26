import WorldMap from "@/components/ui/world-map";
import { SectionHeading } from "@/components/layout/section-heading";
import { colombo, hubs } from "@/lib/content";

const lanes = hubs.map((hub) => ({ start: colombo, end: hub }));

const facts = [
  {
    title: "Consolidation to and from India",
    body: "Regular air consolidation between Sri Lanka and India, even for separate pickups.",
  },
  {
    title: "The world's major markets by sea",
    body: "FCL and LCL ocean freight to and from the world's major markets, backed by integrated information systems.",
  },
  {
    title: "Cross trade without the detour",
    body: "Collect from your supplier abroad and deliver straight to your customer, coordinated through our network.",
  },
];

export function Network() {
  return (
    <section id="network" className="section-y overflow-hidden bg-canvas">
      <div className="container-page">
        <SectionHeading
          title="From Colombo to the world's trade lanes."
          lead="Sri Lanka sits on the main East–West shipping route. We use that position, and a network of trusted partners, to connect your cargo with every major market."
        />
      </div>
      <div className="mx-auto mt-8 max-w-[1320px] px-2 md:mt-12 md:px-8">
        <WorldMap dots={lanes} />
      </div>
      <div className="container-page mt-6 grid gap-8 border-t border-hairline pt-10 md:mt-10 md:grid-cols-3 md:gap-10">
        {facts.map((f) => (
          <div key={f.title}>
            <h3 className="text-body-strong text-ink">{f.title}</h3>
            <p className="text-body mt-2 text-ink-muted">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
