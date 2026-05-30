import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

// Temporary diagnostic endpoint — remove once DB is confirmed working
export async function GET() {
  const checks: Record<string, string> = {}

  // Env var presence (never log actual values)
  checks.DATABASE_URL = process.env.DATABASE_URL ? 'set' : 'MISSING'
  checks.DIRECT_URL   = process.env.DIRECT_URL   ? 'set' : 'not set (optional)'
  checks.UPSTASH_REDIS_REST_URL   = process.env.UPSTASH_REDIS_REST_URL   ? 'set' : 'MISSING'
  checks.UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ? 'set' : 'MISSING'

  // Show parsed host/port so we can confirm pg is connecting to the right place
  if (process.env.DATABASE_URL) {
    try {
      const url = new URL(process.env.DATABASE_URL)
      checks.db_host = url.hostname
      checks.db_port = url.port
    } catch {
      checks.db_url_parse = 'FAILED — DATABASE_URL is not a valid URL'
    }
  }

  // DB connectivity
  try {
    const db = getDb()
    const count = await db.product.count()
    checks.db_connection = 'ok'
    checks.product_count = String(count)
    const verifiedCount = await db.product.count({ where: { verified_by_human: true } })
    checks.verified_count = String(verifiedCount)
  } catch (err) {
    checks.db_connection = 'FAILED'
    checks.db_error = err instanceof Error ? err.message : String(err)
  }

  const allOk = checks.DATABASE_URL === 'set' && checks.db_connection === 'ok'
  return NextResponse.json(checks, { status: allOk ? 200 : 500 })
}
