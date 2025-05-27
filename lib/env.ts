// Environment configuration for static deployment
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isProduction = process.env.NODE_ENV === 'production'

// For static deployment, use mock data instead of database
export const useStaticData = true

// Base path for assets
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
