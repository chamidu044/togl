import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  lead,
  align = "left",
  tone = "light",
  className,
  children,
}: {
  title: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal
      as="header"
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <h2
        className={cn(
          "text-display-xl text-balance",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "text-lead-airy mt-5 text-pretty",
            align === "center" && "mx-auto",
            "max-w-2xl",
            tone === "dark" ? "text-white/70" : "text-ink-muted",
          )}
        >
          {lead}
        </p>
      )}
      {children}
    </Reveal>
  );
}
