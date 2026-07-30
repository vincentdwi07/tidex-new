import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Docker deployment — outputs a minimal standalone server
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },
      // Production backend — allow any hostname so it works with any VPS IP/domain.
      // Coolify will set NEXT_PUBLIC_API_ORIGIN at build time.
      {
        protocol: "https",
        hostname: "**",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "**",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
