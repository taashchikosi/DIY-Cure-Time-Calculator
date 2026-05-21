import { NextRequest, NextResponse } from 'next/server'
import { CalculateRequestSchema } from '@/lib/schemas'
import { calculate } from '@/lib/calculator'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = CalculateRequestSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    // TODO: fetch product from DB by slug, then run calculator
    // Placeholder until DB is connected
    return NextResponse.json(
      { error: 'Database not yet configured' },
      { status: 503 }
    )
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
