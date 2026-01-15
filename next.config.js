/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fix for webpack module loading issues in Next.js 15
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
