/**
 * YouTube utility functions for handling video URLs and embeds
 */

export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/.*[?&]v=([a-zA-Z0-9_-]{11})/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'high'): string {
  return `https://img.youtube.com/vi/${videoId}/${quality === 'high' ? 'hqdefault' : quality === 'medium' ? 'mqdefault' : quality === 'maxres' ? 'maxresdefault' : quality === 'standard' ? 'sddefault' : 'default'}.jpg`;
}

export function getYouTubeEmbedUrl(videoId: string, autoplay: boolean = false, mute: boolean = false): string {
  const params = new URLSearchParams();
  if (autoplay) params.set('autoplay', '1');
  if (mute) params.set('mute', '1');
  params.set('rel', '0'); // Don't show related videos
  params.set('modestbranding', '1'); // Minimal YouTube branding
  
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export function isValidYouTubeUrl(url: string): boolean {
  return extractYouTubeVideoId(url) !== null;
}

export interface MediaItem {
  type: 'image' | 'video' | 'youtube';
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  videoId?: string; // For YouTube videos
}

export function createMediaGallery(images: any[] = [], video?: any, videoUrl?: string, videoUrls?: any[]): MediaItem[] {
  const gallery: MediaItem[] = [];
  
  // Add images
  if (images && images.length > 0) {
    images.forEach(image => {
      gallery.push({
        type: 'image',
        url: image.url,
        alternativeText: image.alternativeText,
        width: image.width,
        height: image.height
      });
    });
  }
  
  // Add uploaded video if exists
  if (video && video.url) {
    gallery.push({
      type: 'video',
      url: video.url,
      alternativeText: video.alternativeText
    });
  }
  
  // Add single YouTube video if exists (backward compatibility)
  if (videoUrl) {
    const videoId = extractYouTubeVideoId(videoUrl);
    if (videoId) {
      gallery.push({
        type: 'youtube',
        url: videoUrl,
        videoId,
        alternativeText: 'Project video'
      });
    }
  }
  
  // Add multiple YouTube videos if exist
  if (videoUrls && videoUrls.length > 0) {
    videoUrls.forEach(videoUrlObj => {
      const url = videoUrlObj?.url;
      if (url) {
        const videoId = extractYouTubeVideoId(url);
        if (videoId) {
          gallery.push({
            type: 'youtube',
            url,
            videoId,
            alternativeText: videoUrlObj?.title || 'Project video'
          });
        }
      }
    });
  }
  
  return gallery;
} 