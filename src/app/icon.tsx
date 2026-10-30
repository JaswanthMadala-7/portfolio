import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#141613", color: "#b8f23c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 700 }}>
        JM
      </div>
    ),
    size,
  );
}
