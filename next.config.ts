import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:
          process.env.NEXT_PUBLIC_API_URL?.replace('https://', '')?.replace('/api', '') ||
          'shoes-shop-strapi.herokuapp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
