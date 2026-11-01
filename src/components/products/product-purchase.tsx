'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Check,
  ChevronRight,
  Heart,
  Loader2,
  RotateCcw,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { StarRating } from '@/components/products/star-rating';
import { ColorSwatches } from '@/components/shared/color-swatches';
import { QuantityStepper } from '@/components/products/quantity-stepper';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';
import { useCompare } from '@/contexts/compare-context';
import { formatDiscount, formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';
import { productByModel } from '@/lib/catalog';
import type { Product } from '@/lib/types';

const availabilityLabels: Record<Product['availability'], string> = {
  'in-stock': 'Dostępny w magazynie',
  'low-stock': 'Ostatnie sztuki',
  'out-of-stock': 'Na zamówienie — 3 tygodnie',
};

export function ProductPurchase({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, toggleCompare } = useCompare();
  const [quantity, setQuantity] = useState(1);
  const [pending, setPending] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const modelVariants = productByModel.find((entry) => entry.model.id === product.modelId)?.variants ?? [];
  const saved = isInWishlist(product.slug);
  const compared = isInCompare(product.slug);
  const discount = formatDiscount(product.price, product.compareAtPrice);
  const maxQuantity = Math.max(1, Math.min(product.stock || 1, 10));

  useEffect(() => {
    const onScroll = () => setShowStickyBar(window.scrollY > 520);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAdd = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    setPending(true);
    addToCart(product, quantity);
    router.push('/checkout');
  };

  return (
    <>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <Link href={`/shop?category=${product.category}`} className="hover:text-foreground">
            {product.categoryLabel}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/shop?subcategory=${product.subcategory}`} className="hover:text-foreground">
            {product.subcategoryLabel}
          </Link>
          <span className="ml-auto font-mono text-[11px]">SKU {product.sku}</span>
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{product.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-1.5">
            <StarRating rating={product.rating} starClassName="h-4 w-4" />
            <span className="font-medium">{product.rating.toFixed(1)}</span>
            <a href="#opinie" className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
              ({product.reviewCount} opinii)
            </a>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <span
            className={cn(
              'flex items-center gap-1.5 text-xs font-medium',
              product.availability === 'out-of-stock' ? 'text-muted-foreground' : 'text-accent',
            )}
          >
            <span
              className={cn(
                'h-2 w-2 rounded-full',
                product.availability === 'out-of-stock' ? 'bg-muted-foreground' : 'bg-accent',
              )}
            />
            {availabilityLabels[product.availability]}
          </span>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
          {product.compareAtPrice ? (
            <>
              <span className="text-base text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
              <span className="rounded bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                −{discount}%
              </span>
            </>
          ) : null}
          <span className="text-xs text-muted-foreground">cena z VAT · raty 0% od {formatPrice(Math.round(product.price / 10))}/mies.</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              Kolor: <span className="text-muted-foreground">{product.activeColor.name}</span>
            </span>
            <span className="text-xs text-muted-foreground">{modelVariants.length} warianty</span>
          </div>
          <ColorSwatches
            size="md"
            colors={modelVariants.map((variant) => variant.activeColor)}
            activeSlug={product.activeColor.slug}
            buildHref={(color) => `/product/${product.modelId}-${color.slug}`}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <QuantityStepper value={quantity} onChange={setQuantity} max={maxQuantity} />
          <Button
            size="lg"
            className="flex-1"
            onClick={handleAdd}
            disabled={product.availability === 'out-of-stock'}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            {product.availability === 'out-of-stock' ? 'Zapytaj o dostępność' : 'Dodaj do koszyka'}
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="flex-1"
            onClick={handleBuyNow}
            disabled={product.availability === 'out-of-stock' || pending}
          >
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
            Kup teraz
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => toggleWishlist(product)} aria-pressed={saved}>
            <Heart className={cn('mr-2 h-4 w-4', saved && 'fill-destructive text-destructive')} />
            {saved ? 'W liście życzeń' : 'Do listy życzeń'}
          </Button>
          <Button variant="outline" size="sm" onClick={() => toggleCompare(product)} aria-pressed={compared}>
            <Scale className={cn('mr-2 h-4 w-4', compared && 'text-accent')} />
            Porównaj
          </Button>
        </div>

        <div className="space-y-2 rounded-lg border bg-card p-4 text-sm">
          <p className="flex items-start gap-2">
            <Truck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>
              Dostawa <strong>gratis</strong> · najbliższy termin: <strong>2–4 dni robocze</strong>
            </span>
          </p>
          <p className="flex items-start gap-2 text-muted-foreground">
            <RotateCcw className="mt-0.5 h-4 w-4 shrink-0" />
            <span>60 dni na zwrot — odbiór kuriera opłacamy my.</span>
          </p>
          <p className="flex items-start gap-2 text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{product.warrantyYears} lat gwarancji i bezpłatny serwis części zamiennych.</span>
          </p>
          <p className="flex items-start gap-2 text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Bezpieczne płatności: BLIK, karta, Przelewy24, Apple Pay.</span>
          </p>
        </div>
      </div>

      <div
        className={cn(
          'fixed inset-x-0 bottom-16 z-30 border-t bg-background/95 p-3 backdrop-blur transition-transform md:hidden',
          showStickyBar ? 'translate-y-0' : 'translate-y-[130%]',
        )}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-muted-foreground">{product.name}</p>
            <p className="text-sm font-bold">{formatPrice(product.price)}</p>
          </div>
          <Button onClick={handleAdd} disabled={product.availability === 'out-of-stock'}>
            <ShoppingBag className="mr-2 h-4 w-4" /> Do koszyka
          </Button>
        </div>
      </div>
    </>
  );
}
