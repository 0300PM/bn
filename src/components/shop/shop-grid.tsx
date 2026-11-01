'use client';

import { useEffect, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/product-card';
import { ProductListItem } from '@/components/products/product-list-item';
import { ShopToolbar } from '@/components/shop/shop-toolbar';
import { ActiveFilters } from '@/components/shop/active-filters';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';

type ShopGridProps = {
  products: Product[];
  total: number;
  onOpenFilters?: () => void;
};

export function ShopGrid({ products, total, onOpenFilters }: ShopGridProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const stored = window.localStorage.getItem('buynest.view');
    if (stored === 'list' || stored === 'grid') setView(stored);
  }, []);

  const changeView = (next: 'grid' | 'list') => {
    setView(next);
    window.localStorage.setItem('buynest.view', next);
  };

  return (
    <div className="space-y-5">
      <ShopToolbar total={total} view={view} onViewChange={changeView} />
      <ActiveFilters />

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed py-20 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-muted">
            <SlidersHorizontal className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold">Brak produktów dla wybranych filtrów</p>
            <p className="mt-1 text-sm text-muted-foreground">Spróbuj poluzować kryteria lub wyczyść filtry.</p>
          </div>
          {onOpenFilters ? (
            <Button variant="outline" className="lg:hidden" onClick={onOpenFilters}>
              Zmień filtry
            </Button>
          ) : null}
        </div>
      ) : (
        <div className={cn('grid gap-4 sm:gap-5', view === 'grid' ? 'grid-cols-2 xl:grid-cols-3' : 'grid-cols-1')}>
          {products.map((product, index) =>
            view === 'grid' ? (
              <ProductCard key={product.id} product={product} priority={index < 4} />
            ) : (
              <ProductListItem key={product.id} product={product} />
            ),
          )}
        </div>
      )}
    </div>
  );
}
