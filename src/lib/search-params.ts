import type { CatalogQuery, SortOption } from './products';
import { SORT_LABELS } from './products';
import type { CategoryId } from './types';

export type RawParams = Record<string, string | string[] | undefined>;

const toArray = (value: string | string[] | undefined) =>
  !value ? [] : Array.isArray(value) ? value.flatMap((item) => item.split(',')) : value.split(',').filter(Boolean);

const toNumber = (value: string | string[] | undefined) => {
  const parsed = Number(Array.isArray(value) ? value[0] : value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const isSort = (value: string): value is SortOption => value in SORT_LABELS;

export const parseCatalogParams = (params: RawParams): CatalogQuery => {
  const sort = Array.isArray(params.sort) ? params.sort[0] : params.sort;
  return {
    q: Array.isArray(params.q) ? params.q[0] : params.q,
    category: toArray(params.category) as CategoryId[],
    subcategory: toArray(params.subcategory),
    color: toArray(params.color),
    availability: toArray(params.availability),
    style: toArray(params.style),
    minPrice: toNumber(params.minPrice),
    maxPrice: toNumber(params.maxPrice),
    rating: toNumber(params.rating),
    promo: params.promo === '1' || params.promo === 'true',
    sort: sort && isSort(sort) ? sort : 'polecane',
    page: toNumber(params.page) ?? 1,
  };
};

export const toSearchParams = (params: RawParams) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      const joined = value.filter(Boolean).join(',');
      if (joined) search.set(key, joined);
    } else if (value) {
      search.set(key, value);
    }
  });
  return search;
};

export const countActiveFilters = (query: CatalogQuery) => {
  let count = 0;
  if (query.category?.length) count += query.category.length;
  if (query.subcategory?.length) count += query.subcategory.length;
  if (query.color?.length) count += query.color.length;
  if (query.availability?.length) count += query.availability.length;
  if (query.style?.length) count += query.style.length;
  if (query.minPrice !== undefined || query.maxPrice !== undefined) count += 1;
  if (query.rating) count += 1;
  if (query.promo) count += 1;
  return count;
};
