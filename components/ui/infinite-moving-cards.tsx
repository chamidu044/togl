import { cn } from "@/lib/utils";
import React from "react";

// Aceternity UI — Infinite Moving Cards, generalised to render any items.
// The list is rendered twice in markup (instead of cloning DOM nodes) so it
// works with SSR and never flashes.
export const InfiniteMovingCards = <T,>({
  items,
  renderItem,
  getKey,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
  itemClassName,
}: {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getKey: (item: T) => string;
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
}) => {
  const duration = { fast: "25s", normal: "45s", slow: "80s" }[speed];

  return (
    <div
      className={cn(
        "relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]",
        className,
      )}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      <ul
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-3 motion-safe:animate-marquee",
          direction === "right" && "[animation-direction:reverse]",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {[0, 1].map((copy) =>
          items.map((item) => (
            <li
              key={`${copy}-${getKey(item)}`}
              aria-hidden={copy === 1}
              className={cn("shrink-0", itemClassName)}
            >
              {renderItem(item)}
            </li>
          )),
        )}
      </ul>
    </div>
  );
};
