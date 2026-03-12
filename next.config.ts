import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Handle figma:asset imports by using asset/source
  webpack(config) {
    config.module.rules.push({
      test: /figma:asset/,
      type: 'asset/source',
    });
    return config;
  },
};

export default nextConfig;
