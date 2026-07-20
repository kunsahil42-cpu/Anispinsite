/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '1gb',
    },
  },
}

module.exports = nextConfig
