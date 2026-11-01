'use client';

import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/product-card';
import { useWishlist } from '@/contexts/wishlist-context';
import { useCart } from '@/contexts/cart-context';
import { useMounted } from '@/hooks/use-mounted';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const { addToCart } = useCart();
  const mounted = useMounted();

  if (!mounted) {
    return <div className="container py-16 text-sm text-muted-foreground">Wczytywanie listy życzeń…</div>;
  }

  return (
    <div className="container py-10 md:py-14">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Lista życzeń</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {wishlist.length === 0
              ? 'Zapisuj produkty, do których chcesz wrócić.'
              : `${wishlist.length} ${wishlist.length === 1 ? 'produkt' : wishlist.length < 5 ? 'produkty' : 'produktów'} zapisanych na później`}
          </p>
        </div>
        {wishlist.length > 0 ? (
          <Button
            variant="outline"
            onClick={() => wishlist.forEach((product) => addToCart(product))}
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> Dodaj wszystko do koszyka
          </Button>
        ) : null}
      </header>

      {wishlist.length === 0 ? (
        <div className="rounded-lg border border-dashed py-20 text-center">
          <Heart className="mx-auto h-10 w-10 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-semibold">Twoja lista życzeń jest pusta</h2>
          <p className="mt-1 text-sm text-muted-foreground">Dodaj produkty klikając serce na karcie produktu.</p>
          <Button asChild className="mt-6">
            <Link href="/shop">Przeglądaj produkty</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
