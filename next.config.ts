import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photos live in /public/images and are optimized locally — no remote image hosts needed.
    formats: ["image/avif", "image/webp"],
  },
  // Optional: limit build workers on low-memory machines, e.g. `NEXT_BUILD_CPUS=1 npm run build`.
  ...(process.env.NEXT_BUILD_CPUS && { experimental: { cpus: Number(process.env.NEXT_BUILD_CPUS) } }),
};

export default nextConfig;
