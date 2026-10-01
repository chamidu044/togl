"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

// Aceternity UI — Signup Form inputs, themed for TOGL. A soft logo-gradient
// glow follows the cursor around the field border.

function FieldGlow({
  children,
  invalid,
  className,
}: {
  children: React.ReactNode;
  invalid?: boolean;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // The radius stays fixed and hover fades the layer instead: useMotionTemplate
  // drops falsy values, so a 0 radius produced invalid CSS and the glow stuck.
  const background = useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, ${invalid ? "#d64545" : "#00a558"}, ${invalid ? "rgba(214,69,69,0.35)" : "rgba(43,81,154,0.55)"} 40%, transparent 80%)`;

  return (
    <div
      onMouseMove={({ currentTarget, clientX, clientY }) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
      }}
      className={cn("group/input relative rounded-[15px] p-[1.5px]", className)}
    >
      <motion.div
        aria-hidden
        style={{ background }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/input:opacity-100"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

const fieldClasses =
  "w-full rounded-[14px] border bg-pearl px-4 text-body text-ink transition duration-300 placeholder:text-ink-subtle focus-visible:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60 disabled:cursor-not-allowed disabled:opacity-50";

type Invalid = { invalid?: boolean };

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & Invalid
>(({ className, invalid, ...props }, ref) => (
  <FieldGlow invalid={invalid}>
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        fieldClasses,
        "h-12",
        invalid ? "border-[#d64545]/60" : "border-hairline group-hover/input:border-transparent",
        className,
      )}
      {...props}
    />
  </FieldGlow>
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & Invalid
>(({ className, invalid, ...props }, ref) => (
  <FieldGlow invalid={invalid}>
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        fieldClasses,
        "block min-h-36 resize-y py-3",
        invalid ? "border-[#d64545]/60" : "border-hairline group-hover/input:border-transparent",
        className,
      )}
      {...props}
    />
  </FieldGlow>
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & Invalid
>(({ className, invalid, children, ...props }, ref) => (
  <FieldGlow invalid={invalid}>
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          fieldClasses,
          "h-12 cursor-pointer appearance-none pr-10",
          invalid ? "border-[#d64545]/60" : "border-hairline group-hover/input:border-transparent",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-ink-subtle"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="m5 8 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </FieldGlow>
));
Select.displayName = "Select";

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn("text-caption-strong mb-2 block text-ink", className)} {...props} />
  );
}
