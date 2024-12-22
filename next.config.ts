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

  transpilePackages: ['mui-tel-input'],
  typescript: {
    ignoreBuildErrors: true,
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
