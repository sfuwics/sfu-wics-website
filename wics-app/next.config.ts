import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for static export
  output: 'export',
  
  // Modified image configuration
  images: {
    unoptimized: true, // Disable default Image Optimization API
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      }
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Optional: Enable trailing slashes for better SSG compatibility
  trailingSlash: true,

  typescript: {
    ignoreBuildErrors: true, // Remove after verifying build works
  },

};

export default nextConfig;