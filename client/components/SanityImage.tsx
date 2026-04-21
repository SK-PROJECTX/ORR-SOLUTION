import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'

interface SanityImageProps {
  asset: any
  alt: string
  className?: string
  priority?: boolean
  width?: number
  height?: number
}

export default function SanityImage({ asset, alt, className, priority, width, height }: SanityImageProps) {
  if (!asset) return null

  const imageUrl = urlForImage(asset)?.url()

  if (!imageUrl) return null

  return (
    <Image
      src={imageUrl}
      alt={alt}
      className={className}
      priority={priority}
      width={width || 1200}
      height={height || 800}
    />
  )
}
