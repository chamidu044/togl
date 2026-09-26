import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Trans Orbit Global Logistics — Access to the world";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/togl-logo.png"), "base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            height: 8,
            width: 220,
            borderRadius: 8,
            background: "linear-gradient(90deg,#a7d046,#00a558,#1d6b91,#2b519a,#243f7a)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 560 }}>
            <div style={{ fontSize: 76, fontWeight: 700, color: "#0f1a2e", letterSpacing: -3, lineHeight: 1.05 }}>
              Access to the world.
            </div>
            <div style={{ fontSize: 30, color: "#4f5a6d", marginTop: 24, lineHeight: 1.35 }}>
              Freight forwarding by sea, air, road and rail from Colombo, Sri Lanka.
            </div>
          </div>
          <img src={`data:image/png;base64,${logo}`} width={440} height={256} alt="" />
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#647082" }}>trans-orbit.lk · info@trans-orbit.lk</div>
      </div>
    ),
    size,
  );
}
