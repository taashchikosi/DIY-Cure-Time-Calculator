import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

/**
 * Returns a PrismaClient singleton, or undefined when DATABASE_URL is not set.
 * Prisma 7 reads DATABASE_URL from the environment automatically.
 * Guarding here prevents build-time crashes when the DB is not reachable.
 */
export function getDb(): PrismaClient {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set')
  }
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient()
    if (process.env.NODE_ENV === 'production') {
      // In production each request gets a fresh module context — no global needed.
      // We still assign it so the singleton works within a single serverless invocation.
    }
  }
  return globalForPrisma.prisma
}

/** Convenience alias — throws at runtime if DATABASE_URL is missing. */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    return getDb()[prop as keyof PrismaClient]
  },
})
