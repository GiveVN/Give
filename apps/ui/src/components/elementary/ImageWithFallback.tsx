'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import { ImageWithBlur } from './ImageWithBlur'

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string
}

export function ImageWithFallback({ src, fallbackSrc = '/images/broken-image.png', ...imgProps }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)

  const handleLoadError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
    }
  }

  return <ImageWithBlur src={src} {...imgProps} alt={imgProps.alt || "Image"} onError={handleLoadError} />
} 