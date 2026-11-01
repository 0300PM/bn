'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ImageOff, Scale, ShoppingCart } from 'lucide-react';
import { QuickViewButton } from '@/components/products/quick-view';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/products/star-rating';
import { ProductBadges } from '@/components/products/product-badges';
import { ColorSwatches } from '@/components/shared/color-swatches';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';
import { useCompare } from '@/contexts/compare-context';
import { formatDiscount, formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';

type ProductCardProps = {
  product: Product;
  className?: string;
  priority?: boolean;
  compact?: boolean;
};

export function ProductCard({ product, className, priority, compact }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, toggleCompare } = useCompare();

  const saved = isInWishlist(product.slug);
  const compared = isInCompare(product.slug);
  const discount = formatDiscount(product.price, product.compareAtPrice);
  const href = `/product/${product.slug}`;
  const [primary, secondary] = product.images;

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lg',
        className,
      )}
    >
      <div className="relative">
        <Link href={href} className="block" tabIndex={-1} aria-hidden="true">
          <div className="relative aspect-square w-full overflow-hidden bg-muted/40">
            {primary ? (
              <Image
                src={primary.url}
                alt={primary.alt}
                fill
                priority={priority}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={cn(
                  'object-cover transition-all duration-500 group-hover:scale-[1.04]',
                  secondary && 'group-hover:opacity-0',
                )}
              />
            ) : (
              <div className="grid h-full place-items-center text-muted-foreground">
                <ImageOff className="h-8 w-8" />
              </div>
            )}
            {secondary ? (
              <Image
                src={secondary.url}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            ) : null}
          </div>
        </Link>

        <ProductBadges badges={product.badges} className="pointer-events-none absolute left-3 top-3" />

        <div className="absolute right-2 top-2 flex flex-col gap-1.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-full bg-background/90 backdrop-blur hover:bg-background"
            onClick={() => toggleWishlist(product)}
            aria-label={saved ? 'Usuń z listy życzeń' : 'Dodaj do listy życzeń'}
            aria-pressed={saved}
          >
            <Heart className={cn('h-4 w-4', saved ? 'fill-destructive text-destructive' : 'text-foreground/70')} />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="hidden h-9 w-9 rounded-full bg-background/90 backdrop-blur hover:bg-background sm:flex"
            onClick={() => toggleCompare(product)}
            aria-label="Dodaj do porównania"
            aria-pressed={compared}
          >
            <Scale className={cn('h-4 w-4', compared ? 'text-accent' : 'text-foreground/70')} />
          </Button>
          <QuickViewButton product={product} className="hidden sm:grid" />
        </div>

        <div className="absolute inset-x-2 bottom-2 hidden translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
          <Button
            type="button"
            className="w-full shadow-sm"
            onClick={() => addToCart(product)}
            disabled={product.availability === 'out-of-stock'}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.availability === 'out-of-stock' ? 'Niedostępny' : 'Do koszyka'}
          </Button>
        </div>
      </div>

      <div className={cn('flex flex-1 flex-col gap-2 p-4', compact && 'p-3')}>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold leading-snug">
            <Link href={href} className="hover:text-accent">
              {product.name}
            </Link>
          </h3>
          <StarRating rating={product.rating} starClassName="h-3.5 w-3.5" className="shrink-0 pt-0.5" />
        </div>

        <p className="text-xs text-muted-foreground">
          {product.activeColor.name} · {product.reviewCount} opinii
        </p>

        <ColorSwatches
          colors={product.colors}
          activeSlug={product.activeColor.slug}
          buildHref={(color) => `/product/${product.modelId}-${color.slug}`}
          max={5}
          className="mt-auto"
        />

        <div className="flex items-end justify-between gap-2 pt-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-base font-bold">{formatPrice(product.price)}</span>
            {product.compareAtPrice ? (
              <>
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
                <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                  −{discount}%
                </span>
              </>
            ) : null}
          </div>
          <span
            className={cn(
              'text-[11px] font-medium',
              product.availability === 'out-of-stock'
                ? 'text-destructive'
                : product.availability === 'low-stock'
                  ? 'text-accent'
                  : 'text-muted-foreground',
            )}
          >
            {product.availability === 'out-of-stock'
              ? 'Brak'
              : product.availability === 'low-stock'
                ? `Ostatnie ${product.stock} szt.`
                : 'Dostępny'}
          </span>
        </div>
      </div>
    </article>
  );
}
