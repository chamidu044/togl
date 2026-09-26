import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "ghost-light";

const variants: Record<Variant, string> = {
  primary: "bg-brand-navy text-white hover:bg-brand-blue",
  secondary:
    "bg-transparent text-brand-navy ring-1 ring-inset ring-brand-navy/25 hover:bg-brand-navy/[0.05] hover:ring-brand-navy/40",
  light: "bg-white text-brand-navy hover:bg-white/90",
  "ghost-light":
    "bg-white/[0.08] text-white ring-1 ring-inset ring-white/25 hover:bg-white/[0.14]",
};

/** Apple-style pill CTA. Internal routes use next/link; tel:/mailto: use <a>. */
export function PillLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const classes = cn(
    "press inline-flex items-center justify-center gap-2 rounded-full whitespace-nowrap",
    size === "lg" ? "px-7 py-3.5 text-[17px]" : "px-[22px] py-[11px] text-[15px]",
    variants[variant],
    className,
  );
  const external = /^(tel:|mailto:|https?:)/.test(href);
  return external ? (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  ) : (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
