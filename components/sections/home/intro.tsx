import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CountUp } from "@/components/motion/count-up";
import { stats } from "@/lib/content";

export function Intro() {
  return (
    <section className="section-y bg-mist">
      <div className="container-text">
        <TextGenerateEffect
          as="h2"
          words="International import and export is complex. Your cargo belongs with people who have spent their careers getting it right."
          className="text-display-lg text-balance text-ink"
        />
        <p className="text-lead-airy mt-6 max-w-2xl text-pretty text-ink-muted">
          At Trans Orbit we employ only knowledgeable, experienced people, so
          your goods are delivered or received with the highest level of
          professionalism.
        </p>
      </div>

      <dl className="container-page mt-14 grid grid-cols-2 gap-y-10 md:mt-20 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col border-l border-hairline pr-4 pl-5 md:pl-7"
          >
            <dt className="text-caption order-2 mt-2 block max-w-[14rem] text-ink-muted">
              {stat.label}
            </dt>
            <dd className="order-1 text-[clamp(2.5rem,1.8rem+2.4vw,3.75rem)] leading-none font-semibold tracking-[-0.04em] text-brand-navy tabular-nums">
              {"format" in stat && stat.format === "year" ? (
                stat.value
              ) : (
                <CountUp to={stat.value} suffix={"suffix" in stat ? stat.suffix : ""} />
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
