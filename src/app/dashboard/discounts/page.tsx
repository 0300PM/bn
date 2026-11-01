'use client';

import { useState } from 'react';
import { Check, Copy, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { COUPONS } from '@/lib/commerce';
import { formatPrice } from '@/lib/format';

export default function DiscountsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(code);
    }
  };

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Kody rabatowe</h1>
        <p className="mt-1 text-sm text-muted-foreground">Aktywne kody przypisane do Twojego konta.</p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {COUPONS.map((coupon) => (
          <Card key={coupon.code}>
            <CardHeader className="pb-2">
              <CardTitle className="font-mono text-base">{coupon.code}</CardTitle>
              <CardDescription>{coupon.label}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground">
                {coupon.minimum > 0 ? `Min. zamówienie ${formatPrice(coupon.minimum)}` : 'Bez minimalnej wartości'}
              </span>
              <Button size="sm" variant="outline" onClick={() => copy(coupon.code)}>
                {copied === coupon.code ? <Check className="mr-1.5 h-3.5 w-3.5" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
                {copied === coupon.code ? 'Skopiowano' : 'Kopiuj'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="flex items-start gap-3 p-4 text-sm text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p>
            Kody można łączyć z darmową dostawą, ale nie z innymi rabatami procentowymi. Kod wprowadzisz w koszyku —
            rabat naliczy się automatycznie.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
