import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'profsouz24.ru',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },

  experimental: {
    turbo: {
      loaders: {
        '*.svg': ['@svgr/webpack'],
      },
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;
