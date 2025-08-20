import type { NextConfig } from "next";

const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [
        ...(config.plugins ?? []),
        new PrismaPlugin(),
      ];
    }
    return config;
  },
};

module.exports = nextConfig;