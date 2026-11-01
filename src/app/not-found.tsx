import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/catalog';

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-20 text-center md:py-28">
      <p className="text-6xl font-bold tracking-tighter text-accent">404</p>
      <h1 className="mt-3 text-2xl font-bold md:text-3xl">Ta strona zniknęła z katalogu</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Być może produkt zmienił nazwę lub został wycofany. Zajrzyj do katalogu — mamy jeszcze 120 wariantów mebli.
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/shop">
            Przejdź do sklepu <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/contact">
            <Search className="mr-2 h-4 w-4" /> Zapytaj o produkt
          </Link>
        </Button>
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button key={category.id} asChild variant="secondary" size="sm">
            <Link href={`/shop?category=${category.id}`}>{category.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
