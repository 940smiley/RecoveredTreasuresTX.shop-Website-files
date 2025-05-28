/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true,
    domains: ['localhost', 'res.cloudinary.com', '940smiley.github.io', 'github.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'recoveredtreasurestx.shop',
      },
      {
        protocol: 'https',
        hostname: '940smiley.github.io',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: '/RecollectedTreasuresTX',
  },
}

module.exports = nextConfig
