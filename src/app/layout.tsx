import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../styles/theme.css";

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
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
