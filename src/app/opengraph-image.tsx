import { ImageResponse } from 'next/og'

export const alt = 'DIY Cure Time Calculator — Temperature & Humidity Adjusted'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#0d0905',
        padding: '70px 80px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ width: '80px', height: '5px', backgroundColor: '#e8b446', marginBottom: '36px' }} />

      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
        <div style={{ fontSize: '72px', fontWeight: 900, color: '#f0e2c0', lineHeight: 1.05 }}>
          Know Exactly
        </div>
        <div style={{ fontSize: '72px', fontWeight: 900, color: '#e8b446', lineHeight: 1.05 }}>
          When It&apos;s Ready.
        </div>
      </div>

      <div style={{ fontSize: '26px', color: '#a07a50', marginBottom: '48px', maxWidth: '800px', lineHeight: 1.4 }}>
        Cure times for wood glue, epoxy, silicone, construction adhesive & concrete — adjusted for your actual temperature and humidity.
      </div>

      <div style={{ display: 'flex', gap: '48px', marginBottom: 'auto' }}>
        <div style={{ fontSize: '20px', color: '#7a5218' }}>Temperature Scaling</div>
        <div style={{ fontSize: '20px', color: '#7a5218' }}>Humidity Branches</div>
        <div style={{ fontSize: '20px', color: '#7a5218' }}>Safety Warnings</div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          paddingTop: '32px',
          borderTop: '1px solid #3a2810',
        }}
      >
        <div style={{ width: '40px', height: '40px', backgroundColor: '#c8892a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '20px', color: '#0d0905' }}>
          C
        </div>
        <div style={{ fontSize: '22px', color: '#7a5218' }}>diycuretimecalculator.com</div>
      </div>
    </div>,
    { ...size }
  )
}
