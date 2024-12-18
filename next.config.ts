import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  transpilePackages: ['mui-tel-input'],

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
