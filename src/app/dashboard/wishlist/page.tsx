'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/product-card';
import { useWishlist } from '@/contexts/wishlist-context';

export default function DashboardWishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Lista życzeń</h1>
        <p className="mt-1 text-sm text-muted-foreground">Produkty zapisane na później.</p>
      </header>

      {wishlist.length === 0 ? (
        <div className="rounded-lg border border-dashed py-16 text-center">
          <Heart className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 font-medium">Jeszcze nic tu nie ma</p>
          <p className="mt-1 text-sm text-muted-foreground">Kliknij serce na produkcie, aby go zapisać.</p>
          <Button asChild className="mt-5" size="sm">
            <Link href="/shop">Przeglądaj produkty</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      )}
    </div>
  );
}
