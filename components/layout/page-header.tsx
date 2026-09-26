import { cn } from "@/lib/utils";

/** Left-aligned hero used by the inner pages (About, Services, Contact). */
export function PageHeader({
  title,
  lead,
  children,
  className,
}: {
  title: string;
  lead?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden bg-canvas", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(36,63,122,0.14)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_55%_70%_at_15%_20%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl [background:radial-gradient(circle,rgba(143,176,234,0.5),rgba(167,208,70,0.15)_55%,transparent_70%)]"
      />
      <div className="container-page relative pt-36 pb-14 md:pt-48 md:pb-20">
        <h1 className="text-hero rise max-w-4xl text-balance text-ink">{title}</h1>
        {lead && (
          <p className="text-lead-airy rise mt-6 max-w-2xl text-pretty text-ink-muted [--rise-blur:0px] [--rise-delay:180ms] [--rise-y:14px]">
            {lead}
          </p>
        )}
        {children && (
          <div className="rise [--rise-blur:0px] [--rise-delay:320ms] [--rise-y:10px]">{children}</div>
        )}
      </div>
    </section>
  );
}
