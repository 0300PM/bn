import type { MetadataRoute } from 'next';
import { categories, products } from '@/lib/catalog';

const baseUrl = 'https://buynest.pl';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/shop', '/categories', '/compare', '/wishlist', '/about', '/contact', '/faq', '/help-center', '/shipping-returns', '/privacy', '/terms'];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.7,
    })),
    ...categories.map((category) => ({
      url: `${baseUrl}/shop?category=${category.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];
}
