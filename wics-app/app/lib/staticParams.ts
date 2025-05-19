import { client } from "@/sanity/lib/client";

export async function getSlugsByType(type: string): Promise<Array<{ slug: string }>> {
  const query = `*[_type == $type && defined(slug.current)]{ "slug": slug.current }`;
  return await client.fetch(query, { type });
}

export function generateSlugParams(slugs: Array<{ slug: string }>): Array<{ params: { slug: string } }> {
  return slugs.map(({ slug }) => ({ params: { slug } }));
}