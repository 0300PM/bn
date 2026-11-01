import Link from 'next/link';
import { Quote, Star } from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    quote:
      'Zamówiłam sofę Aurora w butelkowej zieleni. Kolor identyczny jak na zdjęciach, a dostawa wniesiona pod drzwi w trzy dni.',
    author: 'Marta K.',
    city: 'Wrocław',
    product: 'Sofa Aurora',
    slug: 'aurora-butelkowa-zielen',
  },
  {
    quote:
      'Kupiliśmy narożnik Lumen do salonu z aneksem. Po dwóch miesiącach codziennego użytkowania nic się nie odkształciło.',
    author: 'Paweł i Ania',
    city: 'Gdańsk',
    product: 'Narożnik Lumen',
    slug: 'lumen-jasny-bez',
  },
  {
    quote:
      'Obsługa pomogła dobrać lampę do wysokości sufitu. Kinkiet Halo wygląda dużo drożej niż kosztował.',
    author: 'Krzysztof R.',
    city: 'Kraków',
    product: 'Kinkiet Halo',
    slug: 'halo-mosiadz',
  },
];

export function Testimonials() {
  return (
    <section className="container py-12 md:py-16">
      <SectionHeading
        eyebrow="Opinie klientów"
        title="4,8/5 z ponad 2 400 opinii"
        description="Zbieramy opinie tylko od osób, które kupiły u nas produkt — bez wyjątków."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <Card key={item.author} className="h-full">
            <CardContent className="flex h-full flex-col gap-3 p-5">
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5" aria-label="Ocena 5 na 5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <Quote className="h-5 w-5 text-muted-foreground/40" />
              </div>
              <p className="text-sm leading-relaxed">„{item.quote}”</p>
              <div className="mt-auto pt-2 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">{item.author}</p>
                <p>
                  {item.city} · <Link href={`/product/${item.slug}`} className="underline-offset-2 hover:underline">{item.product}</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-lg border bg-card p-5 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          Sprawdź, co mówią klienci o konkretnych modelach — każda opinia jest weryfikowana.
        </p>
        <Button asChild variant="outline">
          <Link href="/shop?sort=ocena">Kupuj najlepiej oceniane</Link>
        </Button>
      </div>
    </section>
  );
}
