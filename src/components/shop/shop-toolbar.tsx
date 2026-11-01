'use client';

import { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { ProductFilters } from '@/components/shop/product-filters';
import { SORT_LABELS } from '@/lib/products';
import { countActiveFilters, parseCatalogParams, toSearchParams } from '@/lib/search-params';

type ShopToolbarProps = {
  total: number;
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
};

export function ShopToolbar({ total, view, onViewChange }: ShopToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const query = useMemo(() => parseCatalogParams(Object.fromEntries(searchParams.entries())), [searchParams]);
  const activeCount = countActiveFilters(query);

  const changeSort = useCallback(
    (value: string) => {
      const next = toSearchParams(Object.fromEntries(searchParams.entries()));
      next.set('sort', value);
      next.delete('page');
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return (
    <div className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setFiltersOpen(true)}>
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filtry
          {activeCount > 0 ? (
            <span className="ml-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
              {activeCount}
            </span>
          ) : null}
        </Button>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{total}</span>{' '}
          {total === 1 ? 'produkt' : total < 5 ? 'produkty' : 'produktów'}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Select value={query.sort} onValueChange={changeSort}>
          <SelectTrigger className="h-9 w-[190px] text-sm" aria-label="Sortowanie">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            {Object.entries(SORT_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="hidden items-center rounded-md border sm:flex">
          <Button
            variant={view === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-9 w-9 rounded-r-none"
            onClick={() => onViewChange('grid')}
            aria-label="Widok siatki"
            aria-pressed={view === 'grid'}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-9 w-9 rounded-l-none"
            onClick={() => onViewChange('list')}
            aria-label="Widok listy"
            aria-pressed={view === 'list'}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent side="left" className="w-[90vw] overflow-y-auto p-5 sm:max-w-sm">
          <SheetTitle className="sr-only">Filtry produktów</SheetTitle>
          <ProductFilters onClose={() => setFiltersOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
