'use client';

import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, CheckCircle2, Printer, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useOrders, ORDER_STATUS_LABELS } from '@/contexts/orders-context';
import { formatDate, formatPrice } from '@/lib/format';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');
  const { orders, lastOrder } = useOrders();
  const [order, setOrder] = useState(lastOrder);

  useEffect(() => {
    const found = orders.find((item) => item.id === orderId) ?? lastOrder;
    setOrder(found);
  }, [orders, orderId, lastOrder]);

  if (!order) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Nie znaleziono zamówienia.</p>
        <Button asChild className="mt-4">
          <Link href="/shop">Wróć do sklepu</Link>
        </Button>
      </div>
    );
  }

  const eta = new Date(order.createdAt);
  eta.setDate(eta.getDate() + (order.shippingMethod === 'express' ? 2 : 4));

  return (
    <div className="container max-w-3xl py-10 md:py-16">
      <div className="text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/15">
          <CheckCircle2 className="h-7 w-7 text-accent" />
        </div>
        <h1 className="mt-4 text-2xl font-bold md:text-3xl">Dziękujemy za zamówienie!</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Potwierdzenie wysłaliśmy na adres <strong className="text-foreground">{order.customer.email}</strong>.
        </p>
      </div>

      <Card className="mt-8">
        <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
          <CardTitle className="text-base">Zamówienie {order.id}</CardTitle>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
            {ORDER_STATUS_LABELS[order.status]}
          </span>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 rounded-md border bg-muted/30 p-4 text-sm sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">Data złożenia</p>
              <p className="font-medium">{formatDate(order.createdAt)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Szacowana dostawa</p>
              <p className="flex items-center gap-1 font-medium">
                <Truck className="h-3.5 w-3.5" /> {formatDate(eta.toISOString())}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Płatność</p>
              <p className="font-medium uppercase">{order.paymentMethod}</p>
            </div>
          </div>

          <ul className="divide-y">
            {order.items.map((item) => (
              <li key={item.slug} className="flex items-center gap-3 py-3">
                <Image src={item.image} alt="" width={56} height={56} className="h-14 w-14 rounded border object-cover" />
                <div className="min-w-0 flex-1">
                  <Link href={`/product/${item.slug}`} className="truncate text-sm font-medium hover:text-accent">
                    {item.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity} szt. × {formatPrice(item.price)}
                  </p>
                </div>
                <span className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <Separator />
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Produkty</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 ? (
              <div className="flex justify-between text-accent">
                <span>Rabat</span>
                <span>−{formatPrice(order.discount)}</span>
              </div>
            ) : null}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dostawa</span>
              <span>{order.shipping === 0 ? 'Gratis' : formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between pt-1 text-base font-bold">
              <span>Razem</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>

          <div className="rounded-md border p-4 text-sm">
            <p className="font-medium">Adres dostawy</p>
            <p className="text-muted-foreground">
              {order.customer.firstName} {order.customer.lastName}
              <br />
              {order.address.street}
              <br />
              {order.address.postalCode} {order.address.city}, {order.address.country}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href="/dashboard/orders">
                Śledź zamówienie <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" /> Pobierz potwierdzenie
            </Button>
          </div>
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Masz pytanie? Zadzwoń 800 123 456 lub <Link href="/contact" className="text-foreground underline">napisz do nas</Link>.
      </p>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="container py-20 text-center text-sm text-muted-foreground">Wczytywanie zamówienia…</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
