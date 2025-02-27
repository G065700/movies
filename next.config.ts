import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'file.koreafilm.or.kr',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    TZ: 'Asia/Seoul',
  },
};

export default nextConfig;
