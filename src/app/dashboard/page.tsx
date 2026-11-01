'use client';

import Link from 'next/link';
import { ArrowRight, Award, Heart, Package, Percent, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/auth-context';
import { useOrders, ORDER_STATUS_LABELS } from '@/contexts/orders-context';
import { useWishlist } from '@/contexts/wishlist-context';
import { COUPONS } from '@/lib/commerce';
import { formatDate, formatPrice } from '@/lib/format';

export default function DashboardPage() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const { wishlist } = useWishlist();
  const lastOrder = orders[0];
  const points = 350 + orders.reduce((sum, order) => sum + Math.floor(order.total / 10), 0);
  const nextTier = 1000;

  const stats = [
    { title: 'Zamówienia', value: orders.length, hint: 'w historii konta', icon: Package, href: '/dashboard/orders' },
    { title: 'Lista życzeń', value: wishlist.length, hint: 'zapisanych produktów', icon: Heart, href: '/wishlist' },
    { title: 'Punkty lojalnościowe', value: points, hint: `do kolejnego progu ${nextTier - points}`, icon: Award, href: '/dashboard/loyalty' },
    { title: 'Kody rabatowe', value: COUPONS.length, hint: 'gotowe do użycia', icon: Percent, href: '/dashboard/discounts' },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Cześć, {user?.name.split(' ')[0]}!</h1>
        <p className="mt-1 text-sm text-muted-foreground">Oto podsumowanie Twojego konta w BuyNest.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="h-full transition hover:border-foreground/20 hover:shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.hint}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Ostatnie zamówienie</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/orders">
                Wszystkie <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {lastOrder ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold">{lastOrder.id}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(lastOrder.createdAt)}</p>
                  </div>
                  <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">
                    {ORDER_STATUS_LABELS[lastOrder.status]}
                  </span>
                </div>
                <ul className="space-y-2 text-sm">
                  {lastOrder.items.slice(0, 3).map((item) => (
                    <li key={item.slug} className="flex justify-between gap-3">
                      <span className="truncate text-muted-foreground">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="shrink-0 font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between border-t pt-3 text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Truck className="h-4 w-4" /> Szacowana dostawa 2–4 dni
                  </span>
                  <span className="font-bold">{formatPrice(lastOrder.total)}</span>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center">
                <p className="text-sm text-muted-foreground">Nie masz jeszcze zamówień.</p>
                <Button asChild className="mt-4" size="sm">
                  <Link href="/shop">Zrób pierwsze zakupy</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Poziom członkowski</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold">Klub BuyNest · Srebro</span>
              <span className="text-xs text-muted-foreground">{points} / {nextTier} pkt</span>
            </div>
            <Progress value={Math.min(100, (points / nextTier) * 100)} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Do poziomu Złoto brakuje {nextTier - points} punktów — to 5% zniżki na wszystko i darmowy montaż.
            </p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/dashboard/loyalty">Zobacz korzyści</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Twoje kody rabatowe</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-3">
          {COUPONS.map((coupon) => (
            <div key={coupon.code} className="rounded-md border border-dashed p-3">
              <p className="font-mono text-sm font-semibold">{coupon.code}</p>
              <p className="text-xs text-muted-foreground">{coupon.label}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
