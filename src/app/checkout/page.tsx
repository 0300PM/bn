import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CheckoutForm } from '@/components/checkout/checkout-form';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'Kasa',
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="container max-w-6xl py-8 md:py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Finalizacja zamówienia</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Dostawa w 2–4 dni robocze · 60 dni na zwrot · bezpłatna infolinia 800 123 456
        </p>
      </header>
      <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
        <CheckoutForm />
      </Suspense>
    </div>
  );
}
