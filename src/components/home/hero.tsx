import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-background">
      <div className="container grid items-center gap-8 py-10 lg:grid-cols-2 lg:gap-12 lg:py-16">
        <div className="animate-fade-up space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Nowa kolekcja Jesień 2026
          </span>
          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Meble, które <span className="text-accent">układają się</span> z Twoim życiem.
          </h1>
          <p className="max-w-lg text-base text-muted-foreground sm:text-lg">
            Projektujemy w Polsce, szyjemy w małych pracowniach i wysyłamy w 24 godziny. 120 wariantów
            kolorystycznych, 60 dni na zwrot i darmowa dostawa od 2500 zł.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/shop">
                Odkryj kolekcję <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/categories">Przeglądaj kategorie</Link>
            </Button>
          </div>
          <dl className="flex flex-wrap gap-x-8 gap-y-3 pt-2 text-sm">
            {[
              { value: '120', label: 'wariantów produktów' },
              { value: '4,8/5', label: 'ocena klientów' },
              { value: '24 h', label: 'wysyłka zamówień' },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-lg font-bold">{stat.value}</dt>
                <dd className="text-xs text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-muted lg:aspect-[5/6]">
            <Image
              src="/images/hero.jpg"
              alt="Jasny salon z sofą BuyNest, drewnianym stolikiem i lampą podłogową"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-lg border bg-card/95 p-3 shadow-lg backdrop-blur sm:left-6">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary">
              <Star className="h-5 w-5 fill-primary-foreground text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold">4,8 / 5 z 2 481 opinii</p>
              <p className="text-xs text-muted-foreground">Polecane przez 96% klientów</p>
            </div>
          </div>
          <div className="absolute -right-2 top-6 hidden rounded-lg border bg-card/95 p-3 shadow-lg backdrop-blur sm:block">
            <p className="text-xs text-muted-foreground">Bestseller</p>
            <p className="text-sm font-semibold">Sofa Aurora</p>
            <Link href="/product/aurora-jasny-szary" className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-accent">
              Zobacz <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
