import os from "node:os";
import type { NextConfig } from "next";

const isPages = process.env.GITHUB_PAGES === "true";

const lanIps = Object.values(os.networkInterfaces())
  .flatMap((list) => list ?? [])
  .filter((addr) => addr.family === "IPv4" && !addr.internal)
  .map((addr) => addr.address);

const nextConfig: NextConfig = {
  ...(isPages
    ? {
        output: "export",
        basePath: "/mobile-design-system",
        images: { unoptimized: true },
      }
    : {
        allowedDevOrigins: [...lanIps, "*.trycloudflare.com"],
      }),
  devIndicators: false,
  reactStrictMode: true,
};

export default nextConfig;
