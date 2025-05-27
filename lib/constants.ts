// Application constants

export const SITE_CONFIG = {
  name: 'Recollected Treasures TX',
  description: 'Premium collectibles with AI-powered organization, authentication, and discovery',
  url: 'https://recoveredtreasurestx.shop',
  github: 'https://github.com/940smiley/RecollectedTreasuresTX',
} as const

export const COLLECTIBLE_CATEGORIES = [
  'Vintage Books',
  'Comic Books', 
  'Fast Food Toys',
  'Star Wars Memorabilia',
  'Trading Cards',
  'Collectible Cards',
  'Sports Cards',
  'Photography Equipment',
  'Stamps',
  'Ephemera',
  'Coca Cola Collectibles',
  'Atari Games'
] as const

export const PRODUCT_CONDITIONS = [
  'Mint',
  'Near Mint', 
  'Excellent',
  'Very Good',
  'Good',
  'Fair',
  'Poor',
  'Damaged',
  'Unknown'
] as const

export const FILE_UPLOAD_LIMITS = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 50,
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
} as const

export const DEMO_MODE = {
  enabled: true,
  adminPassword: 'admin123',
  features: {
    aiAnalysis: true,
    imageProcessing: true,
    batchUpload: true,
    codeGeneration: true
  }
} as const
