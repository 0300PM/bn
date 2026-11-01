import { products, productBySlug } from './catalog';
import type { CategoryId, Product } from './types';

export type SortOption = 'polecane' | 'nowosci' | 'cena-rosnaco' | 'cena-malejaco' | 'ocena' | 'popularnosc';

export const SORT_LABELS: Record<SortOption, string> = {
  polecane: 'Polecane',
  nowosci: 'Nowości',
  'cena-rosnaco': 'Cena: od najniższej',
  'cena-malejaco': 'Cena: od najwyższej',
  ocena: 'Najwyżej oceniane',
  popularnosc: 'Najpopularniejsze',
};

export type CatalogQuery = {
  q?: string;
  category?: CategoryId[];
  subcategory?: string[];
  color?: string[];
  availability?: string[];
  style?: string[];
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  promo?: boolean;
  sort?: SortOption;
  page?: number;
  perPage?: number;
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replaceAll('ł', 'l');

const matchesQuery = (product: Product, query: string) => {
  const haystack = normalize(
    [product.name, product.tagline, product.categoryLabel, product.subcategoryLabel, product.style, product.activeColor.name, ...product.materials].join(' '),
  );
  return normalize(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => haystack.includes(token));
};

export const searchProducts = (query: string, limit = 6) =>
  products.filter((product) => matchesQuery(product, query)).slice(0, limit);

export const sortProducts = (list: Product[], sort: SortOption = 'polecane') => {
  const sorted = [...list];
  switch (sort) {
    case 'cena-rosnaco':
      return sorted.sort((a, b) => a.price - b.price);
    case 'cena-malejaco':
      return sorted.sort((a, b) => b.price - a.price);
    case 'ocena':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'popularnosc':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case 'nowosci':
      return sorted.sort((a, b) => Number(b.badges.includes('nowosc')) - Number(a.badges.includes('nowosc')));
    default:
      return sorted.sort(
        (a, b) =>
          b.rating * Math.log10(b.reviewCount + 10) - a.rating * Math.log10(a.reviewCount + 10),
      );
  }
};

export const filterProducts = (query: CatalogQuery) => {
  const filtered = products.filter((product) => {
    if (query.q && !matchesQuery(product, query.q)) return false;
    if (query.category?.length && !query.category.includes(product.category)) return false;
    if (query.subcategory?.length && !query.subcategory.includes(product.subcategory)) return false;
    if (query.color?.length && !product.colors.some((color) => query.color?.includes(color.family))) return false;
    if (query.availability?.length && !query.availability.includes(product.availability)) return false;
    if (query.style?.length && !query.style.includes(product.style)) return false;
    if (query.minPrice !== undefined && product.price < query.minPrice) return false;
    if (query.maxPrice !== undefined && product.price > query.maxPrice) return false;
    if (query.rating && product.rating < query.rating) return false;
    if (query.promo && !product.compareAtPrice) return false;
    return true;
  });
  return sortProducts(filtered, query.sort);
};

export const paginate = (list: Product[], page = 1, perPage = 12) => {
  const totalPages = Math.max(1, Math.ceil(list.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  return {
    items: list.slice(start, start + perPage),
    total: list.length,
    totalPages,
    page: currentPage,
  };
};

export const getProduct = (slug: string) => productBySlug.get(slug);

export const getRelatedProducts = (product: Product, limit = 4) =>
  products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .sort((a, b) => Math.abs(a.price - product.price) - Math.abs(b.price - product.price))
    .slice(0, limit);

export const getModelVariants = (product: Product) =>
  products.filter((item) => item.modelId === product.modelId);

export const getBestsellers = (limit = 8) =>
  sortProducts(
    products.filter((product) => product.badges.includes('bestseller')),
    'popularnosc',
  ).slice(0, limit);

export const getNewArrivals = (limit = 8) =>
  products.filter((product) => product.badges.includes('nowosc')).slice(0, limit);

export const getPromotions = (limit = 8) =>
  sortProducts(
    products.filter((product) => product.compareAtPrice),
    'polecane',
  ).slice(0, limit);

export const getFeaturedProduct = () =>
  products.find((product) => product.modelId === 'orbit' && product.activeColor.name === 'Kremowy bouclé') ??
  products.find((product) => product.modelId === 'orbit') ??
  products[0];
