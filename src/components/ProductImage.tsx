interface Props {
  imageUrl?: string | null
  productName: string
  category: string
  subCategory?: string | null
  size?: 'sm' | 'md' | 'lg'
}

// Category-specific accent colors
const CATEGORY_STYLES: Record<string, { bg: string; color: string; icon: string }> = {
  adhesive: { bg: 'linear-gradient(135deg, #2c1a08 0%, #3d2410 100%)', color: '#e8b446', icon: '🔧' },
  sealant:  { bg: 'linear-gradient(135deg, #0a1a2c 0%, #0f2040 100%)', color: '#60a5fa', icon: '🚿' },
  concrete: { bg: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)', color: '#9ca3af', icon: '🧱' },
}

const SUB_CATEGORY_ICONS: Record<string, string> = {
  epoxy: '🧪', silicone: '💧', polyurethane: '⚗️', acrylic_latex: '🖌️',
  contact_cement: '🔨', synthetic_rubber: '⚙️', PVA_construction: '🏗️',
  cyanoacrylate: '⚡', concrete: '🧱',
}

export default function ProductImage({ imageUrl, productName, category, subCategory, size = 'md' }: Props) {
  const sizeClasses = { sm: 'h-16', md: 'h-28', lg: 'h-40' }
  const iconSize = { sm: 'text-2xl', md: 'text-4xl', lg: 'text-5xl' }
  const style = CATEGORY_STYLES[category] ?? CATEGORY_STYLES.adhesive
  const icon = (subCategory && SUB_CATEGORY_ICONS[subCategory]) ?? style.icon

  if (imageUrl) {
    return (
      <div className={`w-full ${sizeClasses[size]} rounded-lg overflow-hidden`} style={{ border: '1px solid var(--border-dim)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={productName} className="w-full h-full object-contain p-2" style={{ backgroundColor: 'var(--bg-card)' }} />
      </div>
    )
  }

  return (
    <div
      className={`w-full ${sizeClasses[size]} rounded-lg flex flex-col items-center justify-center gap-1`}
      style={{ background: style.bg, border: '1px solid var(--border-dim)' }}
    >
      <span className={iconSize[size]}>{icon}</span>
      <span className="text-xs font-medium text-center px-2 leading-tight" style={{ color: style.color }}>
        {category.replace(/_/g, ' ')}
      </span>
    </div>
  )
}
