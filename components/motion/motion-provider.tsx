"use client";

import { MotionConfig } from "motion/react";

/** Honours the visitor's reduced-motion setting across every motion component. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
