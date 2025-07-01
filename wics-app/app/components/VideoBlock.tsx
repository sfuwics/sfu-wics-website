// components/VideoBlock.tsx
import React from 'react';
import { PortableTextVideo } from '@/types/sanity'; // Define this type (see below)

interface VideoBlockProps {
  value: PortableTextVideo;
}

const VideoBlock: React.FC<VideoBlockProps> = ({ value }) => {
  if (!value) return null;

  // Extract video ID from common platforms
  const extractVideoId = (url: string): string | null => {
    // YouTube
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|youtu\.be\/)([^"&?\/\s]{11})/i;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch && youtubeMatch[1]) return youtubeMatch[1];

    // Vimeo
    const vimeoRegex = /vimeo\.com\/(?:channels\/|groups\/[^\/]*\/videos\/|)(\d+)(?:|\/\?)/i;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch && vimeoMatch[1]) return vimeoMatch[1];

    return null;
  };

  // Render embedded video (YouTube/Vimeo)
  if (value.videoType === 'embed' && value.url) {
    const videoId = extractVideoId(value.url);
    const isYouTube = value.url.includes('youtube') || value.url.includes('youtu.be');
    const isVimeo = value.url.includes('vimeo');

    return (
      <div className="my-4 aspect-video w-full overflow-hidden rounded-lg">
        {isYouTube && videoId && (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`}
            title={value.caption || 'YouTube video player'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        {isVimeo && videoId && (
          <iframe
            className="h-full w-full"
            src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`}
            title={value.caption || 'Vimeo video player'}
            allowFullScreen
          />
        )}
      </div>
    );
  }

  // Render self-hosted video
  if (value.videoType === 'file' && value.videoFile?.asset) {
    return (
      <div className="my-4">
        <video
          className="w-full rounded-lg"
          controls={value.controls ?? true}
          autoPlay={value.autoplay ?? false}
          loop={value.loop ?? false}
          muted={value.autoplay ?? false} // Required for autoplay in most browsers
          playsInline
        >
          <source
            src={value.videoFile.asset.url}
            type={`video/${value.videoFile.asset.extension || 'mp4'}`}
          />
          Your browser does not support the video tag.
        </video>
        {value.caption && (
          <p className="mt-2 text-sm text-gray-600">{value.caption}</p>
        )}
      </div>
    );
  }

  return null;
};

export default VideoBlock;