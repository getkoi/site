import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.dirname(fileURLToPath(import.meta.url));

const permanentRedirects = [
  ["/tengu", "/docs/yokai/build"],
  ["/docs/harnesses", "/docs/yokai/build"],
  ["/docs/harnesses/overview", "/docs/yokai/build"],
  ["/docs/harnesses/tengu", "/docs/yokai/build"],
  ["/docs/harnesses/amabie", "/docs/yokai/recovery"],
  ["/docs/yokai/setup", "/docs/start-here/quickstart"],
  ["/docs/yokai/how-to/existing-project", "/docs/start-here/quickstart"],
  ["/docs/yokai/how-to/greenfield-rust", "/docs/start-here/quickstart"],
  ["/docs/yokai/how-to/greenfield-node", "/docs/start-here/quickstart"],
  ["/docs/yokai/troubleshooting", "/docs/reference/troubleshooting"],
  ["/docs/sandbox/docker", "/docs/sandbox/launch"],
  ["/docs/sandbox/apple", "/docs/sandbox/launch"],
  ["/docs/sandbox/sandbox-image", "/docs/sandbox/sandbox-yml"],
  ["/docs/sandbox/troubleshooting", "/docs/reference/troubleshooting"],
  ["/docs/sensors/families/playwright", "/recipes"],
  ["/docs/sensors/families/javascript", "/recipes"],
  ["/docs/sensors/families/security", "/recipes"],
  ["/docs/sensors/families/vite-plus", "/recipes"],
  ["/docs/sensors/families/docs-static", "/recipes"],
  ["/docs/sensors/families/python", "/recipes"],
  ["/docs/sensors/families/rust", "/recipes"],
  ["/docs/sensors/families/vitest-vite", "/recipes"],
  ["/docs/sensors/families/go", "/recipes"],
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  agentRules: false,
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    root: siteRoot,
  },
  async redirects() {
    return permanentRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
