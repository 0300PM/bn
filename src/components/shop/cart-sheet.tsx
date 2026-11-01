'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { QuantityStepper } from '@/components/products/quantity-stepper';
import { useCart } from '@/contexts/cart-context';
import { SHIPPING } from '@/lib/commerce';
import { formatPrice } from '@/lib/format';

export function CartSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { lines, itemCount, subtotal, totals, removeFromCart, updateQuantity } = useCart();
  const progress = Math.min(100, (subtotal / SHIPPING.freeThreshold) * 100);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle className="flex items-center gap-2 text-base">
            <ShoppingBag className="h-4 w-4" /> Koszyk ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-muted">
              <ShoppingBag className="h-7 w-7 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold">Twój koszyk jest pusty</p>
              <p className="mt-1 text-sm text-muted-foreground">Dodaj coś, co odmieni Twoje wnętrze.</p>
            </div>
            <Button asChild onClick={() => onOpenChange(false)}>
              <Link href="/shop">Przejdź do sklepu</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="border-b px-5 py-3">
              {totals.freeShippingRemaining > 0 ? (
                <p className="text-xs text-muted-foreground">
                  Do darmowej dostawy brakuje <strong className="text-foreground">{formatPrice(totals.freeShippingRemaining)}</strong>
                </p>
              ) : (
                <p className="text-xs font-medium text-accent">Dostawa gratis — świetny wybór!</p>
              )}
              <Progress value={progress} className="mt-2 h-1.5" />
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="divide-y">
                {lines.map(({ product, quantity }) => (
                  <li key={product.slug} className="flex gap-3 py-4 first:pt-0">
                    <Image
                      src={product.images[0]?.url ?? ''}
                      alt={product.images[0]?.alt ?? product.name}
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-md border object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={() => onOpenChange(false)}
                          className="text-sm font-medium leading-snug hover:text-accent"
                        >
                          {product.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.slug)}
                          className="rounded p-1 text-muted-foreground transition hover:bg-muted hover:text-destructive"
                          aria-label={`Usuń ${product.name} z koszyka`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{product.activeColor.name}</p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <QuantityStepper
                          size="sm"
                          value={quantity}
                          onChange={(next) => updateQuantity(product.slug, next)}
                          max={product.stock || 10}
                        />
                        <span className="text-sm font-semibold">{formatPrice(product.price * quantity)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter className="border-t bg-muted/30 px-5 py-4">
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Suma produktów</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Dostawa</span>
                  <span className="font-semibold">{totals.shipping === 0 ? 'Gratis' : formatPrice(totals.shipping)}</span>
                </div>
                <Button asChild className="w-full" size="lg" onClick={() => onOpenChange(false)}>
                  <Link href="/checkout">
                    Przejdź do kasy <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
                  <Link href="/cart">Zobacz koszyk</Link>
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
