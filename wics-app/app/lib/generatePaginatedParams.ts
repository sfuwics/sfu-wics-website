export function generatePaginatedParams(totalItems: number, perPage: number, prefix = "pg") {
  const totalPages = Math.ceil(totalItems / perPage);
  return Array.from({ length: totalPages }).map((_, index) => ({
    page: `${prefix}-${index + 1}`,
  }));
}