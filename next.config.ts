import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'], // Add Sanity's CDN domain here
  },
};

export default nextConfig;
