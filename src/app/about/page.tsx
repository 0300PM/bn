import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Hammer, Leaf, Ruler, Users } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'O nas',
  description: 'BuyNest — polska marka mebli projektowanych w Warszawie i szytych w małych pracowniach.',
};

const values = [
  { icon: Ruler, title: 'Projektujemy w Polsce', text: 'Każdy model powstaje w naszym studio w Warszawie i przechodzi testy użytkowe.' },
  { icon: Hammer, title: 'Szyjemy lokalnie', text: 'Współpracujemy z pięcioma pracowniami w Wielkopolsce i na Podkarpaciu.' },
  { icon: Leaf, title: 'Odpowiedzialne materiały', text: 'Drewno z certyfikatem FSC, tkaniny z recyklingu i pianki bez szkodliwych substancji.' },
  { icon: Users, title: 'Serwis, który zostaje', text: 'Po zakupie pomagamy w pielęgnacji i wysyłamy części zamienne do 10 lat.' },
];

const timeline = [
  { year: '2018', title: 'Pierwsza kolekcja', text: 'Zaczęliśmy od trzech sof szytych na zamówienie w pracowni pod Poznaniem.' },
  { year: '2021', title: 'Własny showroom', text: 'Otworzyliśmy przestrzeń przy ul. Prostej w Warszawie, gdzie można dotknąć każdej tkaniny.' },
  { year: '2023', title: '120 wariantów', text: 'Rozszerzyliśmy paletę tkanin i wykończeń — dziś każdy model ma pięć wersji kolorystycznych.' },
  { year: '2026', title: 'Nowa kolekcja', text: 'Wprowadziliśmy meble modułowe z tkanin z recyklingu i program napraw zamiast wymiany.' },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="Tworzymy meble, w których chce się zostać"
        description="BuyNest to polska marka mebli projektowanych w Warszawie. Łączymy prostą formę z materiałami, które dobrze znoszą codzienne życie."
        breadcrumbs={[{ href: '/about', label: 'O nas' }]}
      />

      <div className="container py-10 md:py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative col-span-2 row-span-2 aspect-square overflow-hidden rounded-lg sm:aspect-auto">
            <Image src="/images/story-craft.jpg" alt="Pracownia, w której szyjemy meble" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image src="/images/lookbook.jpg" alt="Sofa w jasnej tkaninie" fill sizes="25vw" className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image src="/images/hero-secondary.jpg" alt="Detal tkaniny meblowej" fill sizes="25vw" className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image src="/images/category-tables.jpg" alt="Stół z drewna" fill sizes="25vw" className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image src="/images/banner-vintage.jpg" alt="Skórzana sofa" fill sizes="25vw" className="object-cover" />
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <Card key={value.title}>
              <CardContent className="space-y-2 p-5">
                <value.icon className="h-5 w-5 text-accent" />
                <h2 className="font-semibold">{value.title}</h2>
                <p className="text-sm text-muted-foreground">{value.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight">Nasza historia</h2>
          <ol className="mt-6 space-y-5 border-l pl-6">
            {timeline.map((item) => (
              <li key={item.year} className="relative">
                <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-background bg-accent" />
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">{item.year}</p>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 rounded-lg border bg-card p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold">Odwiedź showroom</h2>
            <p className="text-sm text-muted-foreground">ul. Prosta 12, Warszawa · pon.–pt. 10:00–19:00, sob. 10:00–16:00</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/contact">Umów wizytę</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/shop">Przeglądaj katalog</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
