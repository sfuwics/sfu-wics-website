export function generatePaginatedParams(
  totalItems: number,
  perPage: number,
  prefix = "pg"
): Array<{ params: { page: string } }> {  // Changed return type
  const totalPages = Math.ceil(totalItems / perPage);
  return Array.from({ length: totalPages }).map((_, index) => ({
    params: {  // Added params wrapper
      page: `${prefix}-${index + 1}`
    }
  }));
}