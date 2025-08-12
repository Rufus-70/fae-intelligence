import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove static export for dynamic blog functionality
  images: {
    unoptimized: true
  }
};

export default nextConfig;
