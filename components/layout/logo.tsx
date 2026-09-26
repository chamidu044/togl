import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  compact = false,
  onClick,
}: {
  className?: string;
  compact?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("group flex items-center gap-2.5 rounded-full py-1 pr-2 pl-1", className)}
    >
      <Image
        src="/brand/togl-mark.png"
        alt=""
        width={36}
        height={36}
        priority
        className="h-9 w-9 transition-transform duration-700 ease-out group-hover:rotate-[24deg]"
      />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-[-0.02em] text-brand-navy">
          Trans Orbit
        </span>
        {!compact && (
          <span className="mt-1 text-[11px] tracking-[-0.005em] text-ink-subtle">
            Global Logistics
          </span>
        )}
      </span>
    </Link>
  );
}
