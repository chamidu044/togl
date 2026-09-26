import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about the custom type-scale utilities in globals.css so
// `text-caption` is treated as a font size and doesn't strip `text-white`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "hero",
            "display-xl",
            "display-lg",
            "display-md",
            "lead",
            "lead-airy",
            "tagline",
            "body",
            "body-strong",
            "caption",
            "caption-strong",
            "fine",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
