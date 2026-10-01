import Image from "next/image";
import { SectionHeading } from "@/components/layout/section-heading";
import { agentNetworks } from "@/lib/content";

export function AgentNetworks() {
  return (
    <section className="section-y bg-mist">
      <div className="container-page">
        <SectionHeading
          title="Agent networks around the world."
          lead="As a member of international freight forwarder networks and the SLFFA, we work with vetted agents in the markets your cargo moves to and from."
          align="center"
        />
        <ul className="mt-12 flex flex-wrap justify-center gap-3 md:mt-16">
          {agentNetworks.map((network) => (
            <li
              key={network.name}
              className="flex h-32 w-[calc(50%-0.375rem)] items-center justify-center rounded-card border border-hairline bg-canvas px-6 md:h-40 md:w-[calc((100%-1.5rem)/3)] lg:w-[calc((100%-3rem)/5)]"
            >
              <div className="relative h-14 w-full md:h-20">
                <Image
                  src={network.logo}
                  alt={network.name}
                  fill
                  sizes="(min-width: 1024px) 200px, (min-width: 768px) 30vw, 45vw"
                  className="object-contain"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
