export const buildPagination = (limit: number, offset: number, total: number) => {
  return {
    limit,
    offset,
    total
  };
};
