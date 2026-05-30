import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

function createPool(): Pool {
  // Use Node.js built-in URL to parse the connection string — avoids
  // pg-connection-string mishandling Supabase pooler URLs (user contains a dot,
  // password may contain !, URL has pgbouncer query params etc.)
  const url = new URL(process.env.DATABASE_URL!)
  return new Pool({
    host:     url.hostname,
    port:     parseInt(url.port || '5432', 10),
    user:     decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.slice(1).split('?')[0],
    ssl:      { rejectUnauthorized: false },
    max:      1,
  })
}

export function getDb(): PrismaClient {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set')
  }
  if (!globalForPrisma.prisma) {
    const pool = createPool()
    const adapter = new PrismaPg(pool)
    globalForPrisma.prisma = new PrismaClient({ adapter })
  }
  return globalForPrisma.prisma
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    return getDb()[prop as keyof PrismaClient]
  },
})
