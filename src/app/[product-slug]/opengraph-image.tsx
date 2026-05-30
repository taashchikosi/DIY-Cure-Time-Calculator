import { ImageResponse } from 'next/og'
import { prisma } from '@/lib/db'

export const revalidate = 86400
export const alt = 'Cure time calculator'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ 'product-slug': string }>
}

export default async function ProductOGImage({ params }: Props) {
  const { 'product-slug': slug } = await params

  let productName = 'DIY Cure Time Calculator'
  let manufacturer = 'Cure Time Estimator'
  let fullCureH = ''
  let minTempF = ''

  try {
    const p = await prisma.product.findUnique({
      where: { slug },
      select: { product_name: true, manufacturer: true, full_cure_hours: true, min_application_temp_f: true },
    })
    if (p) {
      productName = p.product_name
      manufacturer = p.manufacturer
      fullCureH = `${Number(p.full_cure_hours)}h`
      minTempF = `${p.min_application_temp_f}°F`
    }
  } catch {
    // DB unavailable — render generic fallback
  }

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0d0905',
        padding: '60px 72px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ width: '80px', height: '4px', backgroundColor: '#e8b446', marginBottom: '32px' }} />

      <div style={{ fontSize: '58px', fontWeight: 900, color: '#f0e2c0', lineHeight: 1.1, marginBottom: '14px', maxWidth: '980px' }}>
        {productName}
      </div>

      <div style={{ fontSize: '28px', color: '#a07a50', marginBottom: '40px' }}>
        {manufacturer}
      </div>

      <div style={{ display: 'flex', gap: '56px', marginBottom: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '48px', fontWeight: 800, color: '#e8b446' }}>{fullCureH || '—'}</div>
          <div style={{ fontSize: '18px', color: '#7a5218' }}>full cure at 70°F / 50% RH</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '48px', fontWeight: 800, color: '#c8892a' }}>{minTempF || '—'}</div>
          <div style={{ fontSize: '18px', color: '#7a5218' }}>minimum application temp</div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          paddingTop: '28px',
          borderTop: '1px solid #3a2810',
        }}
      >
        <div style={{ width: '36px', height: '36px', backgroundColor: '#c8892a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px', color: '#0d0905' }}>
          C
        </div>
        <div style={{ fontSize: '20px', color: '#7a5218' }}>
          diycuretimecalculator.com · Temperature & Humidity Adjusted
        </div>
      </div>
    </div>,
    { ...size }
  )
}
