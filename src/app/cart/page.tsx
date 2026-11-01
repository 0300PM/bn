'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, ShieldCheck, ShoppingBag, Tag, Trash2, Truck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { QuantityStepper } from '@/components/products/quantity-stepper';
import { ProductCard } from '@/components/products/product-card';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';
import { useMounted } from '@/hooks/use-mounted';
import { getPromotions } from '@/lib/products';
import { SHIPPING } from '@/lib/commerce';
import { formatPrice } from '@/lib/format';

const recommendations = getPromotions(4);

export default function CartPage() {
  const { lines, itemCount, subtotal, totals, coupon, applyCoupon, removeCoupon, updateQuantity, removeFromCart } = useCart();
  const { addToWishlist } = useWishlist();
  const mounted = useMounted();
  const [code, setCode] = useState('');

  if (!mounted) {
    return <div className="container py-16 text-sm text-muted-foreground">Wczytywanie koszyka…</div>;
  }

  if (lines.length === 0) {
    return (
      <div className="container py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-muted">
            <ShoppingBag className="h-7 w-7 text-muted-foreground" />
          </div>
          <h1 className="mt-5 text-2xl font-bold">Twój koszyk jest pusty</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Dodaj meble do koszyka, a zapiszemy je tutaj nawet po zamknięciu przeglądarki.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
            <Button asChild>
              <Link href="/shop">Przejdź do sklepu</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/wishlist">Zobacz listę życzeń</Link>
            </Button>
          </div>
        </div>
        <section className="mt-16">
          <h2 className="mb-4 text-lg font-semibold">Może Cię zainteresować</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {recommendations.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        </section>
      </div>
    );
  }

  const progress = Math.min(100, (subtotal / SHIPPING.freeThreshold) * 100);

  return (
    <div className="container py-8 md:py-12">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Koszyk</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {itemCount} {itemCount === 1 ? 'produkt' : itemCount < 5 ? 'produkty' : 'produktów'} w koszyku
          </p>
        </div>
        <Link href="/shop" className="text-sm font-medium text-accent hover:underline">
          Kontynuuj zakupy
        </Link>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-4">
            {totals.freeShippingRemaining > 0 ? (
              <p className="text-sm">
                Do darmowej dostawy brakuje <strong>{formatPrice(totals.freeShippingRemaining)}</strong>
              </p>
            ) : (
              <p className="text-sm font-medium text-accent">Dostawa gratis od {formatPrice(SHIPPING.freeThreshold)} — masz to!</p>
            )}
            <Progress value={progress} className="mt-2 h-1.5" />
          </div>

          <ul className="divide-y rounded-lg border bg-card">
            {lines.map(({ product, quantity, lineTotal }) => (
              <li key={product.slug} className="flex flex-col gap-4 p-4 sm:flex-row">
                <Link href={`/product/${product.slug}`} className="shrink-0">
                  <Image
                    src={product.images[0]?.url ?? ''}
                    alt={product.images[0]?.alt ?? product.name}
                    width={120}
                    height={120}
                    className="h-24 w-24 rounded-md border object-cover sm:h-28 sm:w-28"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h2 className="truncate font-medium">
                        <Link href={`/product/${product.slug}`} className="hover:text-accent">
                          {product.name}
                        </Link>
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Kolor: {product.activeColor.name} · SKU {product.sku}
                      </p>
                      <p className="mt-1 text-xs text-accent">
                        {product.availability === 'low-stock' ? `Ostatnie ${product.stock} szt.` : 'Dostępny, wysyłka 24 h'}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(product.slug)}
                      aria-label={`Usuń ${product.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <QuantityStepper
                        size="sm"
                        value={quantity}
                        onChange={(next) => updateQuantity(product.slug, next)}
                        max={Math.max(1, product.stock)}
                      />
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto px-0 text-xs text-muted-foreground"
                        onClick={() => {
                          addToWishlist(product);
                          removeFromCart(product.slug);
                        }}
                      >
                        <Heart className="mr-1 h-3.5 w-3.5" /> Przenieś do listy życzeń
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatPrice(lineTotal)}</p>
                      {quantity > 1 ? (
                        <p className="text-xs text-muted-foreground">{formatPrice(product.price)} / szt.</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: Truck, title: 'Darmowa dostawa', text: 'od 2500 zł, wniesienie w cenie' },
              { icon: ShieldCheck, title: 'Bezpieczne płatności', text: 'BLIK, karta, Przelewy24' },
              { icon: Heart, title: '60 dni na zwrot', text: 'odbiór opłacamy my' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-2 rounded-lg border bg-card p-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <p className="text-xs font-semibold">{title}</p>
                  <p className="text-xs text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <Card className="sticky top-24">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Podsumowanie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {coupon ? (
                <div className="flex items-center justify-between rounded-md border border-accent/40 bg-accent/10 p-2 text-xs">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Tag className="h-3.5 w-3.5" /> {coupon.code}
                  </span>
                  <button type="button" onClick={removeCoupon} aria-label="Usuń kod rabatowy" className="text-muted-foreground hover:text-foreground">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <form
                  className="flex gap-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (applyCoupon(code)) setCode('');
                  }}
                >
                  <Input
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    placeholder="Kod rabatowy"
                    className="h-9"
                    aria-label="Kod rabatowy"
                  />
                  <Button type="submit" variant="outline" size="sm" className="h-9">
                    Użyj
                  </Button>
                </form>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">Produkty</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {totals.discount > 0 ? (
                <div className="flex justify-between text-accent">
                  <span>Rabat</span>
                  <span>−{formatPrice(totals.discount)}</span>
                </div>
              ) : null}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dostawa</span>
                <span>{totals.shipping === 0 ? 'Gratis' : formatPrice(totals.shipping)}</span>
              </div>
              <Separator />
              <div className="flex items-baseline justify-between">
                <span className="font-semibold">Do zapłaty</span>
                <span className="text-xl font-bold">{formatPrice(totals.total)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Cena zawiera VAT. Raty 0% dostępne w kasie.</p>
              <Button asChild size="lg" className="w-full">
                <Link href="/checkout">
                  Przejdź do kasy <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/shop">Kontynuuj zakupy</Link>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
