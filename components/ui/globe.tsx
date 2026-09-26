"use client";

import { useEffect, useRef } from "react";
import type { Arc, COBEOptions, Globe as CobeGlobe, Marker } from "cobe";
import { cn } from "@/lib/utils";

// Aceternity UI — Globe (cobe), themed for TOGL. Starts facing Colombo,
// draws trade lanes as arcs, rotates slowly and can be dragged.
//
// cobe renders land dots black in light mode. A logo-gradient layer blended
// with `lighten` on top recolours those dots (black → gradient) while the
// white sphere stays white — the same lime→navy sweep as the TOGL globe mark.

type LatLng = { lat: number; lng: number };

const toAngles = ({ lat, lng }: LatLng): [number, number] => [
  Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2),
  (lat * Math.PI) / 180,
];

export function Globe({
  origin,
  destinations,
  className,
  theta = -0.34,
}: {
  origin: LatLng;
  destinations: LatLng[];
  className?: string;
  /** Vertical tilt in radians; negative lifts the northern hemisphere into view. */
  theta?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const dragOffset = useRef(0);
  const dragVelocity = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let size = canvas.offsetWidth;
    let phi = toAngles(origin)[0] + 0.25;
    let visible = true;
    let raf = 0;
    let globe: CobeGlobe | null = null;
    let cancelled = false;
    let fade = 0;

    const markers: Marker[] = [
      { location: [origin.lat, origin.lng], size: 0.075, color: [0, 0.65, 0.35] },
      ...destinations.map((d) => ({
        location: [d.lat, d.lng] as [number, number],
        size: 0.035,
      })),
    ];
    const arcs: Arc[] = destinations.map((d) => ({
      from: [origin.lat, origin.lng],
      to: [d.lat, d.lng],
    }));

    const options: COBEOptions = {
      // cobe multiplies width/height by devicePixelRatio itself.
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 1.75),
      width: size,
      height: size,
      phi,
      theta,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [0.14, 0.25, 0.48],
      glowColor: [0.84, 0.9, 1],
      markers,
      arcs,
      arcColor: [0.11, 0.42, 0.57],
      arcWidth: 0.6,
      arcHeight: 0.3,
      markerElevation: 0.015,
    };

    const onResize = () => {
      size = canvas.offsetWidth;
    };

    function loop() {
      if (!visible || !globe) {
        raf = 0;
        return;
      }
      if (!dragging.current) {
        if (!reduced) phi += 0.0014;
        // ease out any fling from dragging
        dragVelocity.current *= 0.94;
        dragOffset.current += dragVelocity.current;
      }
      globe.update({ phi: phi + dragOffset.current, width: size, height: size });
      raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(loop);
    });

    // Build the globe once the page is idle so it never competes with first paint.
    const start = async () => {
      const { default: createGlobe } = await import("cobe");
      if (cancelled) return;
      globe = createGlobe(canvas, options);
      window.addEventListener("resize", onResize);
      io.observe(canvas);
      raf = requestAnimationFrame(loop);
      // Give the map texture a moment to load before fading in.
      fade = window.setTimeout(() => {
        wrap.style.opacity = "1";
      }, 250);
    };
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(start, { timeout: 1500 })
      : window.setTimeout(start, 300);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      window.clearTimeout(fade);
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      globe?.destroy();
    };
  }, [origin, destinations, theta]);

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative aspect-square w-full opacity-0 transition-opacity duration-[1400ms] ease-out",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="h-full w-full cursor-grab touch-pan-y [contain:layout_paint_size] active:cursor-grabbing"
        onPointerDown={(e) => {
          dragging.current = true;
          lastX.current = e.clientX;
          dragVelocity.current = 0;
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return;
          const delta = (e.clientX - lastX.current) / 220;
          lastX.current = e.clientX;
          dragOffset.current += delta;
          dragVelocity.current = delta;
        }}
      />
      {/* Recolours the land dots with the logo gradient (see note above) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[10%] rounded-full mix-blend-lighten"
        style={{
          background:
            "linear-gradient(105deg, #7fbf3f 0%, #00a558 24%, #1d6b91 50%, #2b519a 72%, #243f7a 100%)",
        }}
      />
    </div>
  );
}
