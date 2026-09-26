"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { AnimatePresence, motion } from "motion/react";

// Aceternity UI — Stateful Button, driven by a form status instead of an
// onClick promise so it works with server actions.

export type ButtonStatus = "idle" | "loading" | "success";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  status?: ButtonStatus;
  children: React.ReactNode;
  loadingText?: string;
  successText?: string;
}

export const Button = ({
  className,
  children,
  status = "idle",
  loadingText = "Sending",
  successText = "Sent",
  ...props
}: ButtonProps) => {
  const {
    onDrag,
    onDragStart,
    onDragEnd,
    onAnimationStart,
    onAnimationEnd,
    ...buttonProps
  } = props;
  void onDrag;
  void onDragStart;
  void onDragEnd;
  void onAnimationStart;
  void onAnimationEnd;

  const label =
    status === "loading" ? loadingText : status === "success" ? successText : children;

  return (
    <motion.button
      layout
      aria-live="polite"
      aria-busy={status === "loading"}
      className={cn(
        "press flex min-w-[160px] cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-body text-white ring-offset-2 ring-offset-canvas transition duration-200 hover:ring-2 disabled:cursor-not-allowed",
        status === "success"
          ? "bg-brand-green hover:ring-brand-green"
          : "bg-brand-navy hover:ring-brand-navy",
        className,
      )}
      {...buttonProps}
    >
      <motion.span layout className="flex items-center gap-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {status === "loading" && (
            <motion.svg
              key="loader"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 360 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                rotate: { duration: 0.6, repeat: Infinity, ease: "linear" },
                default: { duration: 0.2 },
              }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M12 3a9 9 0 1 0 9 9" />
            </motion.svg>
          )}
          {status === "success" && (
            <motion.svg
              key="check"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M9 12l2 2l4 -4" />
            </motion.svg>
          )}
        </AnimatePresence>
        <motion.span layout>{label}</motion.span>
      </motion.span>
    </motion.button>
  );
};
