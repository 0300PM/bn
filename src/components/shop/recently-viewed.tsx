'use client';

import { usePathname } from 'next/navigation';
import { ProductCard } from '@/components/products/product-card';
import { SectionHeading } from '@/components/shared/section-heading';
import { useRecentlyViewed } from '@/contexts/recently-viewed-context';

export function RecentlyViewed({ excludeSlug, limit = 4 }: { excludeSlug?: string; limit?: number }) {
  const { items } = useRecentlyViewed();
  const pathname = usePathname();
  const filtered = items.filter((product) => product.slug !== excludeSlug).slice(0, limit);

  if (filtered.length === 0) return null;

  return (
    <section className="container py-10" aria-labelledby="recently-viewed">
      <SectionHeading
        title="Ostatnio oglądane"
        eyebrow={pathname === '/shop' ? undefined : 'Wróć do tego, co Ci się podobało'}
        href="/shop"
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} compact />
        ))}
      </div>
    </section>
  );
}
