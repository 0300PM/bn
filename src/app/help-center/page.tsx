import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CreditCard, Package, RefreshCcw, Ruler, Truck } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Centrum pomocy',
  description: 'Dostawa, zwroty, płatności i wymiary mebli — wszystkie odpowiedzi w jednym miejscu.',
};

const topics = [
  { icon: Truck, title: 'Dostawa', text: 'Terminy, koszty i wniesienie mebli.', href: '/shipping-returns' },
  { icon: RefreshCcw, title: 'Zwroty i reklamacje', text: '60 dni na zwrot, odbiór po naszej stronie.', href: '/shipping-returns' },
  { icon: CreditCard, title: 'Płatności', text: 'BLIK, karty, Przelewy24 i raty 0%.', href: '/faq' },
  { icon: Ruler, title: 'Wymiary i materiały', text: 'Specyfikacje produktów i próbki tkanin.', href: '/shop' },
  { icon: Package, title: 'Zamówienie', text: 'Status, zmiany i faktury.', href: '/dashboard/orders' },
];

export default function HelpCenterPage() {
  return (
    <div>
      <PageHeader
        title="Centrum pomocy"
        description="Wybierz temat, a znajdziesz konkretną odpowiedź bez czekania na infolinię."
        breadcrumbs={[{ href: '/help-center', label: 'Centrum pomocy' }]}
      />
      <div className="container py-10 md:py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <Link key={topic.title} href={topic.href} className="group">
              <Card className="h-full transition hover:border-foreground/20 hover:shadow-sm">
                <CardContent className="space-y-2 p-5">
                  <topic.icon className="h-5 w-5 text-accent" />
                  <h2 className="font-semibold">{topic.title}</h2>
                  <p className="text-sm text-muted-foreground">{topic.text}</p>
                  <p className="flex items-center gap-1 text-xs font-medium text-accent">
                    Czytaj więcej <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
          <Card className="bg-primary/20">
            <CardContent className="flex h-full flex-col justify-between gap-3 p-5">
              <div>
                <h2 className="font-semibold">Porozmawiaj z doradcą</h2>
                <p className="text-sm text-muted-foreground">pon.–pt. 9:00–18:00, sob. 10:00–14:00</p>
              </div>
              <Button asChild variant="outline" className="w-fit bg-background">
                <Link href="/contact">Kontakt</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
