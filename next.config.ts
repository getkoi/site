import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  agentRules: false,
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    root: siteRoot,
  },
};

export default nextConfig;
