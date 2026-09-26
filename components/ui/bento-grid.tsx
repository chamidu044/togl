import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";

// Aceternity UI — Bento Grid, themed for TOGL and paired with Glowing Effect.
export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => (
  <div
    className={cn(
      "mx-auto grid grid-cols-1 gap-4 md:auto-rows-[minmax(16rem,auto)] md:grid-cols-3",
      className,
    )}
  >
    {children}
  </div>
);

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <div className={cn("relative rounded-panel p-1.5", className)}>
    <GlowingEffect
      spread={40}
      glow
      disabled={false}
      proximity={64}
      inactiveZone={0.01}
      borderWidth={2}
    />
    <div className="group/bento relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[22px] border border-hairline bg-canvas p-6 md:p-7">
      {header}
      <div>
        {icon && (
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-mist text-brand-navy transition-colors duration-300 group-hover/bento:bg-brand-navy group-hover/bento:text-white">
            {icon}
          </div>
        )}
        <h3 className="text-tagline text-ink">{title}</h3>
        <div className="text-body mt-2 text-ink-muted">{description}</div>
      </div>
    </div>
  </div>
);
