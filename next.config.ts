import type { NextConfig } from "next";

// http://image.tmdb.org/t/p/
const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      }
    ]
  }
};


export default nextConfig;
