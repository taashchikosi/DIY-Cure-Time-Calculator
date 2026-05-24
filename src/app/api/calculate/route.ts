import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { CalculateRequestSchema } from '@/lib/schemas'
import { calculate, ProductData } from '@/lib/calculator'
import { getDb } from '@/lib/db'

// 10 requests per 60 seconds per IP — free tier safe (10K commands/day)
const ratelimit = new Ratelimit({
  redis: new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  }),
  limiter: Ratelimit.slidingWindow(10, '60 s'),
  prefix: 'calc',
})

export async function POST(request: NextRequest) {
  // Rate limiting by IP
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    '127.0.0.1'

  const { success, limit, remaining, reset } = await ratelimit.limit(ip)

  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before trying again.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(limit),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(reset),
        },
      }
    )
  }

  try {
    const body = await request.json()
    const parsed = CalculateRequestSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { product_slug, temp_fahrenheit, humidity_rh, surface_temp_fahrenheit } = parsed.data

    const db = getDb()
    const row = await db.product.findUnique({ where: { slug: product_slug } })

    if (!row) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const product: ProductData = {
      full_cure_hours: Number(row.full_cure_hours),
      humidity_behaviour: row.humidity_behaviour as ProductData['humidity_behaviour'],
      temp_doubling_celsius: Number(row.temp_doubling_celsius),
      min_application_temp_f: row.min_application_temp_f,
      max_application_temp_f: row.max_application_temp_f ?? null,
      mfft_celsius: row.mfft_celsius != null ? Number(row.mfft_celsius) : null,
      amine_blush_risk: row.amine_blush_risk,
      dew_point_warning: row.dew_point_warning,
      silicone_bell_curve: row.silicone_bell_curve,
      structural_liability: row.structural_liability,
      sub_category: row.sub_category,
      category: row.category,
    }

    const result = calculate(product, {
      temp_fahrenheit,
      humidity_rh,
      surface_temp_fahrenheit,
    })

    return NextResponse.json(result, {
      headers: {
        'X-RateLimit-Limit': String(limit),
        'X-RateLimit-Remaining': String(remaining),
        'X-RateLimit-Reset': String(reset),
      },
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
