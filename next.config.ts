import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Shoora UI package for SSR & App Router
  transpilePackages: ["@cybershoora/shoora-ui"],

  // Optional: strict TypeScript checks
  typescript: {
    ignoreBuildErrors: false
  },

  // Handle Tailwind CSS processing
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        buffer: false,
      };
      
      // Exclude Node.js modules from client bundle
      config.externals = config.externals || [];
      config.externals.push({
        'tailwindcss': 'commonjs tailwindcss',
        'autoprefixer': 'commonjs autoprefixer',
      });
    }
    return config;
  },
};

export default nextConfig;
