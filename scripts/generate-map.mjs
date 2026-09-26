// Generates the dotted world maps used by the network section and CTA tile.
// Run with `pnpm generate:map`. Output is committed to public/maps.
import { writeFileSync } from "node:fs";
import DottedMap from "dotted-map";

// Keep in sync with MAP_REGION in components/ui/world-map.tsx
const region = { lat: { min: -58, max: 77 }, lng: { min: -180, max: 180 } };

const map = new DottedMap({
  height: 110,
  grid: "diagonal",
  region,
  projection: { name: "equirectangular" },
});

const points = map.getPoints();
const width = map.image.width;
const height = map.image.height;
const r = 0.24;
// One path of zero-length segments with round caps renders every dot.
const d = points.map((p) => `M${+p.x.toFixed(2)} ${+p.y.toFixed(2)}h0`).join("");

const svg = (color) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><path d="${d}" stroke="${color}" stroke-width="${r * 2}" stroke-linecap="round" fill="none"/></svg>`;

writeFileSync("public/maps/world-dots.svg", svg("#243f7a"));
writeFileSync("public/maps/world-dots-light.svg", svg("#ffffff"));
console.log(`Wrote ${points.length} dots, viewBox ${width}x${height}`);
