import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Ruler, Sparkles, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDimensions, formatPrice } from '@/lib/format';
import { getFeaturedProduct } from '@/lib/products';

export function FeaturedSpotlight() {
  const product = getFeaturedProduct();

  return (
    <section className="bg-muted/40 py-12 md:py-16">
      <div className="container grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-square overflow-hidden rounded-xl border bg-card">
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-4 left-4 rounded-lg border bg-card/95 px-4 py-3 backdrop-blur">
            <p className="text-xs text-muted-foreground">Wybór redakcji</p>
            <p className="text-sm font-semibold">{product.name}</p>
          </div>
        </div>
        <div className="order-1 space-y-5 lg:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Produkt miesiąca</p>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{product.name}</h2>
          <p className="text-muted-foreground">{product.description}</p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: Ruler, label: 'Wymiary', value: formatDimensions(product.dimensions) },
              { icon: Sparkles, label: 'Tkanina', value: product.activeColor.name },
              { icon: Truck, label: 'Dostawa', value: '2–4 dni robocze' },
            ].map((item) => (
              <li key={item.label} className="rounded-lg border bg-card p-3">
                <item.icon className="mb-1.5 h-4 w-4 text-accent" />
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{item.label}</p>
                <p className="text-sm font-medium capitalize">{item.value}</p>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
            <Button asChild size="lg">
              <Link href={`/product/${product.slug}`}>
                Zobacz produkt <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
