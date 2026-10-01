import { Hero } from "@/components/sections/home/hero";
import { Intro } from "@/components/sections/home/intro";
import { ServicesCarousel } from "@/components/sections/home/services-carousel";
import { Process } from "@/components/sections/home/process";
import { Network } from "@/components/sections/home/network";
import { AgentNetworks } from "@/components/sections/home/agent-networks";
import { WhyTogl } from "@/components/sections/home/why-togl";
import { CtaBand } from "@/components/sections/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesCarousel />
      <Process />
      <Network />
      <AgentNetworks />
      <WhyTogl />
      <CtaBand />
    </>
  );
}
