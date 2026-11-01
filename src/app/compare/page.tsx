'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/products/star-rating';
import { useCompare } from '@/contexts/compare-context';
import { useCart } from '@/contexts/cart-context';
import { formatDimensions, formatPrice } from '@/lib/format';

type CompareProduct = ReturnType<typeof useCompare>['items'][number];

const specRows: { label: string; value: (product: CompareProduct) => string }[] = [
  { label: 'Cena', value: (product) => formatPrice(product.price) },
  { label: 'Kategoria', value: (product) => product.categoryLabel },
  { label: 'Kolor', value: (product) => product.activeColor.name },
  { label: 'Materiały', value: (product) => product.materials.join(', ') },
  { label: 'Wymiary', value: (product) => formatDimensions(product.dimensions) },
  { label: 'Styl', value: (product) => product.style },
  { label: 'Gwarancja', value: (product) => `${product.warrantyYears} lata` },
  { label: 'Dostępność', value: (product) => (product.availability === 'out-of-stock' ? 'Na zamówienie' : 'Dostawa 2–4 dni') },
];

export default function ComparePage() {
  const { items, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  return (
    <div className="container py-10 md:py-14">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Porównanie produktów</h1>
          <p className="mt-1 text-sm text-muted-foreground">Zestaw do czterech produktów i porównaj parametry obok siebie.</p>
        </div>
        {items.length > 0 ? (
          <Button variant="outline" onClick={clearCompare}>
            Wyczyść porównanie
          </Button>
        ) : null}
      </header>

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed py-20 text-center">
          <p className="text-lg font-semibold">Nic tu jeszcze nie ma</p>
          <p className="mt-1 text-sm text-muted-foreground">Dodaj produkty do porównania ikoną wagi na karcie produktu.</p>
          <Button asChild className="mt-6">
            <Link href="/shop">Przejdź do sklepu</Link>
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-40 p-3 text-left align-top font-medium text-muted-foreground">Produkt</th>
                {items.map((product) => (
                  <th key={product.slug} className="p-3 align-top">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => removeFromCompare(product.slug)}
                        className="absolute right-0 top-0 z-10 rounded-full border bg-background p-1 text-muted-foreground hover:text-destructive"
                        aria-label={`Usuń ${product.name} z porównania`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                      <Link href={`/product/${product.slug}`} className="block">
                        <Image
                          src={product.images[0]?.url ?? ''}
                          alt={product.images[0]?.alt ?? product.name}
                          width={160}
                          height={160}
                          className="mx-auto h-32 w-32 rounded-md border object-cover"
                        />
                        <span className="mt-2 block text-sm font-semibold">{product.name}</span>
                      </Link>
                      <div className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                        <StarRating rating={product.rating} starClassName="h-3 w-3" />
                        {product.rating.toFixed(1)}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specRows.map((row) => (
                <tr key={row.label} className="border-t">
                  <th className="p-3 text-left align-top font-medium text-muted-foreground">{row.label}</th>
                  {items.map((product) => (
                    <td key={product.slug} className="p-3 align-top">
                      {row.value(product)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t">
                <th className="p-3" />
                {items.map((product) => (
                  <td key={product.slug} className="p-3">
                    <Button size="sm" className="w-full" onClick={() => addToCart(product)}>
                      <ShoppingBag className="mr-2 h-4 w-4" /> Do koszyka
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
