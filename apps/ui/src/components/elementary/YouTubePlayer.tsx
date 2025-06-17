"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getYouTubeEmbedUrl, getYouTubeThumbnail } from "@/lib/youtube"

interface YouTubePlayerProps {
  videoId: string
  title?: string
  className?: string
  autoplay?: boolean
  showThumbnail?: boolean
}

export function YouTubePlayer({ 
  videoId, 
  title = "Video", 
  className = "", 
  autoplay = false,
  showThumbnail = true 
}: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay)
  
  const handlePlay = () => {
    setIsPlaying(true)
  }
  
  if (!isPlaying && showThumbnail) {
    return (
      <div 
        className={`relative aspect-video overflow-hidden rounded-lg bg-gray-100 cursor-pointer group ${className}`}
        onClick={handlePlay}
      >
        <img
          src={getYouTubeThumbnail(videoId, 'high')}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
          <div className="h-16 w-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center shadow-lg">
            <Play className="h-6 w-6 text-white fill-current ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 text-xs rounded">
          YouTube
        </div>
      </div>
    )
  }
  
  return (
    <div className={`aspect-video overflow-hidden rounded-lg ${className}`}>
      <iframe
        src={getYouTubeEmbedUrl(videoId, true, false)}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
} 