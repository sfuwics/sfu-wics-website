import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'o2if0nu9',
  dataset: 'production',
  apiVersion: '2024-12-31',
  useCdn: false 
});

const queryCache = new Map<string, any>();

export async function fetchQuery(
  query: string, 
  params: Record<string, any> = {}
) {
  const cacheKey = JSON.stringify({ query, params });
  
  if (process.env.NODE_ENV === 'development') {
    if (queryCache.has(cacheKey)) return queryCache.get(cacheKey);
    const data = await client.fetch(query, params);
    queryCache.set(cacheKey, data);
    return data;
  }

  return client.fetch(query, params);
}