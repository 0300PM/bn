import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { categories } from '@/lib/catalog';

export function CategoryTiles() {
  return (
    <section className="container py-12 md:py-16" aria-labelledby="categories-heading">
      <SectionHeading
        eyebrow="Kategorie"
        title="Zacznij od pomieszczenia"
        description="Cztery kolekcje, jedna spójna estetyka. Wszystkie modele dostępne w kilku wariantach kolorystycznych."
        href="/categories"
        linkLabel="Wszystkie kategorie"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={`/shop?category=${category.id}`}
            className="group relative overflow-hidden rounded-lg border"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-white">
              <div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-xs text-white/80">{category.count} produktów</p>
              </div>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/90 text-foreground transition group-hover:bg-white">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
