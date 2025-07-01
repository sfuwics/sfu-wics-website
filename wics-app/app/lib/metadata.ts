import { Metadata } from 'next';

export function createMetadata(title: string): Metadata {
  return {
    title: `${title} | Women in Computing Science`,
  };
}
