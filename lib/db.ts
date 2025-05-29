import { PrismaClient } from '@prisma/client'
import { useStaticData } from './config'

// For TypeScript we need to handle the case where prisma might be null
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// For static deployment, we'll use mock data instead of actual database
// We initialize to null and then set it conditionally below
let prisma: PrismaClient | null = null

// Only create Prisma client on server-side (not client) and when not using static data
if (!useStaticData && typeof window === 'undefined') {
  // In development, we want to reuse the client across hot reloads
  // In production, a new instance will be created for each function execution
  prisma = globalThis.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

  // Save for reuse in development
  if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma
  }
}

// We export the prisma client, but it might be null in static mode
// Consumers need to check if it's null before using
export { prisma }
