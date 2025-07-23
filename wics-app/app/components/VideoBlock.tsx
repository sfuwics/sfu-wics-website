import React from 'react';

export default function VideoBlock({ value }) {
  if (!value) return null;

  // Handle uploaded videos
  if (value.videoType === 'file' && value.videoFile?.asset?.url) {
    return (
      <div className="my-6">
        <video 
          controls 
          className="w-full rounded-xl"
          src={value.videoFile.asset.url}
        />
        {value.caption && (
          <p className="mt-2 text-center text-sm text-gray-600">
            {value.caption}
          </p>
        )}
      </div>
    );
  }

  // Handle YouTube/Vimeo embeds
  if (value.videoType === 'embed' && value.url) {
    let embedUrl;
    
    // YouTube
    if (value.url.includes('youtube') || value.url.includes('youtu.be')) {
      const videoId = value.url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i)?.[1];
      embedUrl = `https://www.youtube.com/embed/${videoId}?modestbranding=1`;
    } 
    // Vimeo
    else if (value.url.includes('vimeo')) {
      const videoId = value.url.match(/vimeo\.com\/(\d+)/i)?.[1];
      embedUrl = `https://player.vimeo.com/video/${videoId}`;
    }

    return embedUrl ? (
      <div className="my-6 aspect-video w-full overflow-hidden rounded-lg">
        <iframe
          src={embedUrl}
          className="h-full w-full"
          allowFullScreen
        />
      </div>
    ) : null;
  }

  return null;
}