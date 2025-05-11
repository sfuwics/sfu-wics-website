// lib/staticParams.ts
import { client } from "@/sanity/lib/client";

/**
 * Fetch slugs from a Sanity content type for static path generation.
 */
export async function getSlugsByType(type: string): Promise<string[]> {
  const query = `*[_type == "$type" && defined(slug.current)][].slug.current`;
  return await client.fetch(query);
}

/**
 * Generate static params from a list of slugs.
 */
export function generateSlugParams(slugs: string[]) {
  return slugs.map((slug) => ({ slug }));
}