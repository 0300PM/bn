import { products, reviews as allReviews } from './data';
import type { Product, Review } from './types';

// Simulate a network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getProducts(options?: {
  category?: string;
  sort?: string;
  priceRange?: [number, number];
  q?: string;
}): Promise<Product[]> {
  await delay(500);
  
  let filteredProducts = [...products];

  if (options?.q) {
    const query = options.q.toLowerCase();
    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(query));
  }

  if (options?.category) {
    const categories = options.category.split(',');
    filteredProducts = filteredProducts.filter(p => categories.includes(p.category));
  }

  if (options?.priceRange) {
    filteredProducts = filteredProducts.filter(
      p => p.price >= options.priceRange![0] && p.price <= options.priceRange![1]
    );
  }

  if (options?.sort) {
    switch (options.sort) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
         filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }
  }

  return filteredProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await delay(200);
  const product = products.find(p => p.slug === slug);
  return product || null;
}

export async function getRelatedProducts(category: string, currentProductId: string): Promise<Product[]> {
    await delay(300);
    return products.filter(p => p.category === category && p.id !== currentProductId).slice(0, 4);
}


export async function getProductReviews(productId: string): Promise<Review[]> {
    await delay(100);
    // In a real app, you would fetch reviews for the specific product.
    // Here, we'll just return a random subset of all reviews.
    return allReviews.slice(0, Math.floor(Math.random() * allReviews.length) + 1);
}
