import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for containerized deployment
  output: 'standalone',

  // Optimize for containerized environment
  experimental: {
    // Enable optimizations for container environments
    optimizePackageImports: ['lucide-react', 'recharts'],
  },

  // Environment variables for containerized deployment
  env: {
    // These will be available in the container
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Syst POS',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  },

  // Performance optimizations
  swcMinify: true,

  // Image optimization for container environments
  images: {
    domains: process.env.NODE_ENV === 'production' ? ['localhost'] : [],
    unoptimized: process.env.NODE_ENV === 'production',
  },

  // Security headers for production
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
