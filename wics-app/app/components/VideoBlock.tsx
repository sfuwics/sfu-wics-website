'use client';

import React from 'react';

interface VideoAsset {
  url: string;
  extension?: string;
}

interface VideoBlockProps {
  value?: {
    videoType: 'file' | 'embed';
    url?: string;
    videoFile?: {
      asset: VideoAsset;
    };
  };
}

export default function VideoBlock({ value }: VideoBlockProps) {
  if (!value) return null;

  // Handle uploaded video files (MP4/WebM)
  if (value.videoType === 'file' && value.videoFile?.asset?.url) {
    return (
      <div className="group relative">
        <video
          controls
          className="w-full aspect-video rounded-xl bg-black"
          preload="metadata"
          playsInline
        >
          <source
            src={value.videoFile.asset.url}
            type={`video/${value.videoFile.asset.extension || 'mp4'}`}
          />
          Your browser does not support HTML5 video.
        </video>
        {value.caption && (
          <p className="mt-2 text-center text-sm text-gray-600">
            {value.caption}
          </p>
        )}
      </div>
    );
  }

  // Handle embedded videos (YouTube/Vimeo)
  if (value.videoType === 'embed' && value.url) {
    try {
      let embedUrl: string | null = null;

      // YouTube
      if (value.url.includes('youtube') || value.url.includes('youtu.be')) {
        const videoId = value.url.match(
          /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
        )?.[1];
        embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0` : null;
      }
      // Vimeo
      else if (value.url.includes('vimeo')) {
        const videoId = value.url.match(/vimeo\.com\/(\d+)/i)?.[1];
        embedUrl = videoId ? `https://player.vimeo.com/video/${videoId}?title=0&byline=0` : null;
      }

      return embedUrl ? (
        <div className="my-6 aspect-video w-full h-[200px] sm:h-[400px] overflow-hidden rounded-xl">
          <iframe
            src={embedUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      ) : null;

    } catch (error) {
      console.error('Embedded video error:', error);
      return (
        <div className="bg-red-50 p-4 rounded-lg">
          Failed to load video embed
        </div>
      );
    }
  }

  return null;
}