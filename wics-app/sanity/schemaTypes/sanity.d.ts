import { PortableTextBlock } from '@portabletext/types';

declare module '@portabletext/types' {
  interface PortableTextVideo {
    _type: 'video';
    _key: string;
    videoType: 'embed' | 'file';
    url?: string;
    videoFile?: {
      asset: {
        _ref: string;
        url: string;
        extension: string;
      };
    };
    caption?: string;
  }
}