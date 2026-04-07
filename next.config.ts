import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [],
    disableStaticImages: false,
    remotePatterns: [],
    loader: 'default',
    minimumCacheTTL: 60,
    formats: ['image/webp'],
    unoptimized: false,
    qualities: [75, 100]
  }
};

export default nextConfig;
