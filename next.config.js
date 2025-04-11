/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      // Other remote patterns...
    ],
  },
  // Add this to exclude the admin page from static generation
  exportPathMap: async function() {
    return {
      '/': { page: '/' },
      '/analytics': { page: '/analytics' },
      '/exploits': { page: '/exploits' },
      '/resources': { page: '/resources' },
      '/submit': { page: '/submit' },
      // Don't include /admin here
    };
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    esmExternals: true
  }
}

export default nextConfig;
