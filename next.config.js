/** @type {import('next').NextConfig} */

import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  // register: true,
  // skipWaiting: true,
  // disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
});

export default nextConfig;
