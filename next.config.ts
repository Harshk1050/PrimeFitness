import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "primefitnessplusllc.com" },
    ],
  },
  turbopack: {},
  serverExternalPackages: ["mongoose", "bcryptjs"],
};

export default nextConfig;
