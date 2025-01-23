import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['file.koreafilm.or.kr'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
