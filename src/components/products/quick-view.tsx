'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, ShoppingBag, Truck } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/products/star-rating';
import { ColorSwatches } from '@/components/shared/color-swatches';
import { QuantityStepper } from '@/components/products/quantity-stepper';
import { useCart } from '@/contexts/cart-context';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';

export function QuickViewButton({ product, className }: { product: Product; className?: string }) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  return (
    <>
      <Button
        type="button"
        size="icon"
        variant="secondary"
        className={cn('h-9 w-9 rounded-full bg-background/90 backdrop-blur hover:bg-background', className)}
        onClick={() => setOpen(true)}
        aria-label={`Szybki podgląd: ${product.name}`}
      >
        <ArrowRight className="h-4 w-4 -rotate-45 text-foreground/70" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0">
          <DialogTitle className="sr-only">{product.name} — szybki podgląd</DialogTitle>
          <div className="grid gap-0 sm:grid-cols-2">
            <div className="relative aspect-square bg-muted">
              <Image
                src={product.images[0]?.url ?? ''}
                alt={product.images[0]?.alt ?? product.name}
                fill
                sizes="(max-width: 640px) 100vw, 380px"
                className="object-cover"
              />
            </div>
            <div className="space-y-4 p-5">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{product.categoryLabel}</p>
                <h2 className="text-xl font-bold">{product.name}</h2>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <StarRating rating={product.rating} starClassName="h-3.5 w-3.5" />
                  <span>({product.reviewCount})</span>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
                {product.compareAtPrice ? (
                  <span className="text-sm text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-medium">
                  Kolor: <span className="text-muted-foreground">{product.activeColor.name}</span>
                </p>
                <ColorSwatches
                  colors={product.colors}
                  activeSlug={product.activeColor.slug}
                  buildHref={(color) => `/product/${product.modelId}-${color.slug}`}
                />
              </div>

              <p className="line-clamp-3 text-sm text-muted-foreground">{product.description}</p>

              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Truck className="h-3.5 w-3.5" /> Dostawa 2–4 dni robocze · darmowa od 2500 zł
              </p>
              <p className="flex items-center gap-1.5 text-xs text-accent">
                <Check className="h-3.5 w-3.5" />
                {product.availability === 'out-of-stock' ? 'Na zamówienie' : 'Dostępny w magazynie'}
              </p>

              <div className="flex items-center gap-2">
                <QuantityStepper value={quantity} onChange={setQuantity} max={Math.max(1, product.stock)} size="sm" />
                <Button
                  className="flex-1"
                  onClick={() => {
                    addToCart(product, quantity);
                    setOpen(false);
                  }}
                  disabled={product.availability === 'out-of-stock'}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" /> Do koszyka
                </Button>
              </div>

              <Button asChild variant="link" className="h-auto p-0 text-sm">
                <Link href={`/product/${product.slug}`}>Zobacz pełną kartę produktu</Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
