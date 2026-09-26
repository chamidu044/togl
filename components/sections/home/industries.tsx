import {
  Car,
  Cpu,
  CupSoda,
  Factory,
  Gem,
  Palette,
  Pill,
  ShoppingBag,
  Snowflake,
  Stethoscope,
  Store,
  Wine,
  type LucideIcon,
} from "lucide-react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { SectionHeading } from "@/components/layout/section-heading";
import { industries } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  "Consumer goods": ShoppingBag,
  "Fashion and luxury": Gem,
  "Capital goods": Factory,
  "Pharma and cosmetics": Pill,
  "Mass distribution": Store,
  "Wines and spirits": Wine,
  Automotive: Car,
  Electronics: Cpu,
  "Fine art": Palette,
  Perishables: Snowflake,
  Medical: Stethoscope,
  Beverages: CupSoda,
};

function Chip({ name }: { name: string }) {
  const Icon = icons[name] ?? Store;
  return (
    <div className="flex items-center gap-3 rounded-full border border-hairline bg-canvas py-2.5 pr-6 pl-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mist text-brand-teal">
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
      </span>
      <span className="text-body-strong whitespace-nowrap text-ink">{name}</span>
    </div>
  );
}

export function Industries() {
  const half = Math.ceil(industries.length / 2);
  return (
    <section className="section-y overflow-hidden bg-mist">
      <div className="container-page">
        <SectionHeading
          title="Industries we serve."
          lead="From fashion and fine art to medical supplies and beverages, each sector gets handling that fits its cargo."
          align="center"
        />
      </div>
      <div className="mt-12 space-y-2">
        <InfiniteMovingCards
          items={industries.slice(0, half)}
          getKey={(i) => i}
          renderItem={(i) => <Chip name={i} />}
          speed="slow"
        />
        <InfiniteMovingCards
          items={industries.slice(half)}
          getKey={(i) => i}
          renderItem={(i) => <Chip name={i} />}
          direction="right"
          speed="slow"
        />
      </div>
    </section>
  );
}
