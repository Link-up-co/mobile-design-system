import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../styles/theme.css";

const PRETENDARD_CDN =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css";

export const metadata: Metadata = {
  title: "Link-Up Mobile UI Design System",
  description: "B2C Mobile Web / PWA Design System",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" crossOrigin="anonymous" href={PRETENDARD_CDN} />
      </head>
      <body className="min-h-dvh font-sans text-[15px] leading-[1.5] antialiased">{children}</body>
    </html>
  );
}
