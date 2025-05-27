/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  basePath: '',
  assetPrefix: '',
  images: {
    unoptimized: true,
    domains: ['localhost', 'res.cloudinary.com'],
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
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: '',
  },
}

module.exports = nextConfig
