'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Package, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useOrders, ORDER_STATUS_LABELS, type Order } from '@/contexts/orders-context';
import { formatDate, formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';

const timelineSteps: Order['status'][] = ['przyjete', 'w-realizacji', 'wyslane', 'dostarczone'];

const statusStyle: Record<Order['status'], string> = {
  przyjete: 'bg-secondary text-secondary-foreground',
  'w-realizacji': 'bg-primary text-primary-foreground',
  wyslane: 'bg-accent text-accent-foreground',
  dostarczone: 'bg-foreground text-background',
  anulowane: 'bg-destructive text-destructive-foreground',
};

export default function OrdersPage() {
  const { orders } = useOrders();

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Zamówienia</h1>
        <p className="mt-1 text-sm text-muted-foreground">Historia zakupów, statusy dostaw i zwroty.</p>
      </header>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-14 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-muted">
              <Package className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold">Brak zamówień</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Gdy złożysz zamówienie, zobaczysz tutaj jego status i historię.
              </p>
            </div>
            <Button asChild>
              <Link href="/shop">Przejdź do sklepu</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        orders.map((order) => {
          const stepIndex = timelineSteps.indexOf(order.status);
          return (
            <Card key={order.id}>
              <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-base">{order.id}</CardTitle>
                  <CardDescription>
                    Złożono {formatDate(order.createdAt)} · {order.items.length}{' '}
                    {order.items.length === 1 ? 'produkt' : 'produkty'}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={cn('border-transparent', statusStyle[order.status])}>
                    {ORDER_STATUS_LABELS[order.status]}
                  </Badge>
                  <span className="font-bold">{formatPrice(order.total)}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.status !== 'anulowane' ? (
                  <ol className="grid grid-cols-4 gap-1 text-[10px] sm:text-xs">
                    {timelineSteps.map((step, index) => (
                      <li key={step} className="space-y-1">
                        <span
                          className={cn(
                            'block h-1.5 rounded-full',
                            index <= stepIndex ? 'bg-accent' : 'bg-muted',
                          )}
                        />
                        <span className={cn(index <= stepIndex ? 'font-medium text-foreground' : 'text-muted-foreground')}>
                          {ORDER_STATUS_LABELS[step]}
                        </span>
                      </li>
                    ))}
                  </ol>
                ) : null}

                <ul className="divide-y">
                  {order.items.map((item) => (
                    <li key={item.slug} className="flex items-center gap-3 py-2">
                      <Image src={item.image} alt="" width={48} height={48} className="h-12 w-12 rounded border object-cover" />
                      <div className="min-w-0 flex-1">
                        <Link href={`/product/${item.slug}`} className="truncate text-sm font-medium hover:text-accent">
                          {item.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity} szt. × {formatPrice(item.price)}
                        </p>
                      </div>
                      <Button asChild variant="ghost" size="sm" className="text-xs">
                        <Link href={`/product/${item.slug}`}>Kup ponownie</Link>
                      </Button>
                    </li>
                  ))}
                </ul>

                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full justify-between">
                      Szczegóły dostawy i płatności
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3 grid gap-3 rounded-md border bg-muted/30 p-3 text-sm sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Adres dostawy</p>
                      <p>
                        {order.customer.firstName} {order.customer.lastName}
                        <br />
                        {order.address.street}
                        <br />
                        {order.address.postalCode} {order.address.city}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Płatność i dostawa</p>
                      <p className="uppercase">{order.paymentMethod}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Truck className="h-3.5 w-3.5" /> {order.shippingMethod === 'express' ? 'Ekspresowa' : order.shippingMethod === 'pickup' ? 'Odbiór osobisty' : 'Standardowa'}
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}
