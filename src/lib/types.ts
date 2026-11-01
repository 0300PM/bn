export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  category: 'sofas' | 'chairs' | 'tables' | 'lamps';
  images: { id: string; url: string; alt: string; hint: string }[];
  description: string;
  availability: 'in-stock' | 'out-of-stock';
  details: string;
  shippingReturns: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
};
