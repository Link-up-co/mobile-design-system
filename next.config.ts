import os from "node:os";
import type { NextConfig } from "next";

const lanIps = Object.values(os.networkInterfaces())
  .flatMap((list) => list ?? [])
  .filter((addr) => addr.family === "IPv4" && !addr.internal)
  .map((addr) => addr.address);

const nextConfig: NextConfig = {
  allowedDevOrigins: [...lanIps, "*.trycloudflare.com"],
  devIndicators: false,
  reactStrictMode: true,
};

export default nextConfig;
