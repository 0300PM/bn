'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Expand, Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ProductBadges } from '@/components/products/product-badges';
import { useWishlist } from '@/contexts/wishlist-context';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';

export function ProductGallery({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const saved = isInWishlist(product.slug);
  const active = product.images[activeIndex];

  return (
    <div className="space-y-3">
      <div className="group relative aspect-square overflow-hidden rounded-lg border bg-card">
        {active ? (
          <Image
            src={active.url}
            alt={active.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : null}
        <ProductBadges badges={product.badges} className="absolute left-3 top-3" />
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-full bg-background/90 backdrop-blur"
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
            className="h-9 w-9 rounded-full bg-background/90 backdrop-blur"
            onClick={() => setLightboxOpen(true)}
            aria-label="Powiększ zdjęcie"
          >
            <Expand className="h-4 w-4 text-foreground/70" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
        {product.images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              'relative aspect-square overflow-hidden rounded-md border-2 transition',
              index === activeIndex ? 'border-foreground' : 'border-transparent hover:border-border',
            )}
            aria-label={`Zdjęcie ${index + 1} z ${product.images.length}`}
            aria-pressed={index === activeIndex}
          >
            <Image src={image.url} alt="" fill sizes="120px" className="object-cover" />
          </button>
        ))}
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-3xl p-2">
          <DialogTitle className="sr-only">{product.name} — powiększenie</DialogTitle>
          {active ? (
            <div className="relative aspect-square w-full">
              <Image src={active.url} alt={active.alt} fill sizes="90vw" className="object-contain" />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
