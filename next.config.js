/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
    domains: ['localhost', 'res.cloudinary.com', '940smiley.github.io', 'github.com', 'recoveredtreasurestx.shop'],
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
    NEXT_PUBLIC_BASE_PATH: '',
    NEXT_PUBLIC_USE_STATIC_DATA: 'true',
    NEXT_PUBLIC_SKIP_PRISMA: 'true',
  },
}

module.exports = nextConfig
