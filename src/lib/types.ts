export type CategoryId = 'sofas' | 'chairs' | 'tables' | 'lamps';

export type Availability = 'in-stock' | 'low-stock' | 'out-of-stock';

export type Badge = 'nowosc' | 'bestseller' | 'promocja' | 'eko';

export type ProductImage = {
  id: string;
  url: string;
  alt: string;
};

export type ColorVariant = {
  name: string;
  hex: string;
  slug: string;
  family: string;
};

export type Dimensions = {
  width: number;
  depth: number;
  height: number;
  seatHeight?: number;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  verified: boolean;
  helpful: number;
};

export type Product = {
  id: string;
  slug: string;
  modelId: string;
  name: string;
  tagline: string;
  typeLabel: string;
  description: string;
  category: CategoryId;
  categoryLabel: string;
  subcategory: string;
  subcategoryLabel: string;
  style: string;
  price: number;
  compareAtPrice?: number;
  currency: 'PLN';
  rating: number;
  reviewCount: number;
  availability: Availability;
  stock: number;
  badges: Badge[];
  colors: ColorVariant[];
  activeColor: ColorVariant;
  images: ProductImage[];
  features: string[];
  materials: string[];
  dimensions: Dimensions;
  weight: number;
  sku: string;
  warrantyYears: number;
};

export type Category = {
  id: CategoryId;
  name: string;
  description: string;
  image: string;
  count: number;
};
