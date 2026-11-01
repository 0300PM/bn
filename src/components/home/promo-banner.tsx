'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const END_DATE = new Date('2026-11-30T23:59:59');

const getRemaining = () => {
  const diff = Math.max(0, END_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

export function PromoBanner() {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setRemaining(getRemaining());
    const interval = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText('BUYNEST10');
      setCopied(true);
      toast({ title: 'Kod skopiowany', description: 'BUYNEST10 — wklej go w koszyku.' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: 'Kod: BUYNEST10', description: 'Skopiuj kod ręcznie.' });
    }
  };

  const units = [
    { label: 'dni', value: remaining?.days },
    { label: 'godz.', value: remaining?.hours },
    { label: 'min', value: remaining?.minutes },
    { label: 'sek.', value: remaining?.seconds },
  ];

  return (
    <section className="container py-4">
      <div className="overflow-hidden rounded-xl border bg-primary/25">
        <div className="grid items-center gap-6 p-6 md:grid-cols-2 md:p-10">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Weekend designu</p>
            <h2 className="text-balance text-2xl font-bold sm:text-3xl">
              −10% na całą kolekcję i darmowa dostawa w prezencie
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Rabat łączy się z darmową dostawą od 2500 zł. Kod działa do końca miesiąca na wszystkie produkty
              z katalogu.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={copyCode}
                className="flex items-center gap-2 rounded-md border border-dashed bg-background px-3 py-2 font-mono text-sm font-semibold transition hover:border-foreground"
              >
                BUYNEST10
                {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
              </button>
              <Button asChild>
                <Link href="/shop?promo=1">
                  Kupuj w promocji <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <dl className="flex gap-2 pt-1" aria-live="polite">
              {units.map((unit) => (
                <div key={unit.label} className="min-w-14 rounded-md border bg-background px-2 py-1.5 text-center">
                  <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">{unit.label}</dt>
                  <dd className="text-base font-bold tabular-nums">
                    {unit.value === undefined ? '—' : String(unit.value).padStart(2, '0')}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="/images/banner-collection.jpg"
              alt="Sofa modułowa w jasnej tkaninie w salonie"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
