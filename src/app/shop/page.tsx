import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ProductFilters } from '@/components/shop/product-filters';
import { ShopGrid } from '@/components/shop/shop-grid';
import { Pagination } from '@/components/shop/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { categories } from '@/lib/catalog';
import { filterProducts, paginate } from '@/lib/products';
import { parseCatalogParams } from '@/lib/search-params';
import type { RawParams } from '@/lib/search-params';

export const metadata: Metadata = {
  title: 'Sklep — wszystkie meble i oświetlenie',
  description: 'Przeglądaj 120 wariantów sof, foteli, stołów i lamp. Filtruj po kategorii, kolorze, cenie i dostępności.',
};

const PER_PAGE = 12;

export default async function ShopPage({ searchParams }: { searchParams: Promise<RawParams> }) {
  const params = await searchParams;
  const query = parseCatalogParams(params);
  const filtered = filterProducts(query);
  const { items, total, totalPages, page } = paginate(filtered, query.page, PER_PAGE);
  const activeCategory = query.category?.length === 1 ? categories.find((item) => item.id === query.category?.[0]) : null;

  return (
    <div className="container py-6 md:py-10">
      <nav className="mb-4 flex items-center gap-1 text-xs text-muted-foreground" aria-label="Ścieżka nawigacji">
        <Link href="/" className="hover:text-foreground">
          Strona główna
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/shop" className={activeCategory ? 'hover:text-foreground' : 'text-foreground'}>
          Sklep
        </Link>
        {activeCategory ? (
          <>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{activeCategory.name}</span>
          </>
        ) : null}
      </nav>

      <header className="mb-6 max-w-2xl space-y-2">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {activeCategory ? activeCategory.name : query.q ? `Wyniki dla „${query.q}”` : 'Cała kolekcja'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {activeCategory
            ? activeCategory.description
            : 'Meble i oświetlenie projektowane w Polsce. Każdy model dostępny w kilku wariantach kolorystycznych.'}
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[248px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            <Suspense fallback={<Skeleton className="h-[420px] w-full" />}>
              <ProductFilters />
            </Suspense>
          </div>
        </aside>

        <div>
          <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
            <ShopGrid products={items} total={total} />
            <Pagination page={page} totalPages={totalPages} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
