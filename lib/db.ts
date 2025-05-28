import { PrismaClient } from '@prisma/client'
import { useStaticData } from './env'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// For static deployment, we'll use mock data instead of actual database
let prisma: PrismaClient | null = null

if (!useStaticData && typeof window === 'undefined') {
  // Only create Prisma client on server-side in development
  prisma = globalForPrisma.prisma ?? new PrismaClient()
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
}

export { prisma }
