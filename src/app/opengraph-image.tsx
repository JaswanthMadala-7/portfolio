import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.seo.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#141613", color: "#ecebe4", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80 }}>
        <div style={{ fontSize: 84, fontWeight: 700 }}>{site.name}</div>
        <div style={{ fontSize: 36, color: "#b8f23c", marginTop: 16 }}>Software Engineer</div>
        <div style={{ fontSize: 30, color: "#a3a69c", marginTop: 24 }}>Backend systems, AI agents, and telecom automation</div>
      </div>
    ),
    size,
  );
}
