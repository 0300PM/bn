'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/products/star-rating';
import { ProductBadges } from '@/components/products/product-badges';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';

export function ProductListItem({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const saved = isInWishlist(product.slug);

  return (
    <article className="group flex gap-4 overflow-hidden rounded-lg border bg-card p-3 transition hover:border-foreground/20 hover:shadow-md sm:p-4">
      <Link href={`/product/${product.slug}`} className="relative h-28 w-28 shrink-0 overflow-hidden rounded-md bg-muted sm:h-40 sm:w-40">
        <Image
          src={product.images[0]?.url ?? ''}
          alt={product.images[0]?.alt ?? product.name}
          fill
          sizes="160px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <ProductBadges badges={product.badges} className="mb-1.5" />
            <h3 className="truncate text-sm font-semibold sm:text-base">
              <Link href={`/product/${product.slug}`} className="hover:text-accent">
                {product.name}
              </Link>
            </h3>
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground sm:text-sm">{product.tagline}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => toggleWishlist(product)}
            aria-label="Dodaj do listy życzeń"
            aria-pressed={saved}
          >
            <Heart className={cn('h-4 w-4', saved && 'fill-destructive text-destructive')} />
          </Button>
        </div>

        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <StarRating rating={product.rating} starClassName="h-3.5 w-3.5" />
          <span>({product.reviewCount})</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden items-center gap-1 sm:flex">
            <Truck className="h-3.5 w-3.5" /> 2–4 dni robocze
          </span>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">{formatPrice(product.price)}</span>
            {product.compareAtPrice ? (
              <span className="text-xs text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
            ) : null}
          </div>
          <Button size="sm" onClick={() => addToCart(product)} disabled={product.availability === 'out-of-stock'}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Do koszyka
          </Button>
        </div>
      </div>
    </article>
  );
}
