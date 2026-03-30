import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@pixsheet/shared"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
        pathname: "/api/mcp/asset/**",
      },
    ],
  },
};

export default nextConfig;
