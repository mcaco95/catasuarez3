import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['img.youtube.com', 'res.cloudinary.com'],
    loader: 'default',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: `/dqgqrvnnw/**`,
      },
    ],
  },
};

export default nextConfig;
