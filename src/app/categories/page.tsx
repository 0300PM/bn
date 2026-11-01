import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { categories, subcategories } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Kategorie produktów',
  description: 'Sofy, fotele, stoły i oświetlenie — poznaj wszystkie kolekcje BuyNest.',
};

export default function CategoriesPage() {
  return (
    <div className="container py-10 md:py-16">
      <header className="mx-auto mb-10 max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Kategorie produktów</h1>
        <p className="mt-3 text-muted-foreground">
          Cztery kolekcje, 24 modele i 120 wariantów kolorystycznych. Wszystko, czego potrzebujesz, żeby urządzić
          spójne wnętrze.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <Link href={`/shop?category=${category.id}`} className="group block">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold">{category.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
                  </div>
                  <span className="shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium">{category.count}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {subcategories
                    .filter((subcategory) => subcategory.category === category.id)
                    .map((subcategory) => (
                      <Link
                        key={subcategory.id}
                        href={`/shop?subcategory=${subcategory.id}`}
                        className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
                      >
                        {subcategory.label}
                      </Link>
                    ))}
                </div>
                <p className="flex items-center gap-1 text-sm font-semibold text-accent">
                  Zobacz produkty <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </p>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
