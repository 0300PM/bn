'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories, colorFamilies, styles, subcategories } from '@/lib/catalog';
import { formatPrice } from '@/lib/format';
import { parseCatalogParams, toSearchParams } from '@/lib/search-params';

const styleLabels: Record<string, string> = {
  skandynawski: 'Skandynawski',
  modern: 'Nowoczesny',
  industrial: 'Industrialny',
};

const availabilityLabels: Record<string, string> = {
  'in-stock': 'Dostępne od razu',
  'low-stock': 'Ostatnie sztuki',
  'out-of-stock': 'Na zamówienie',
};

export function ActiveFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = parseCatalogParams(Object.fromEntries(searchParams.entries()));

  const removeValue = (key: string, value?: string) => {
    const next = toSearchParams(Object.fromEntries(searchParams.entries()));
    if (!value) {
      next.delete(key);
    } else {
      const values = (next.get(key) ?? '').split(',').filter((item) => item && item !== value);
      if (values.length) next.set(key, values.join(','));
      else next.delete(key);
    }
    next.delete('page');
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const chips: { key: string; value: string; label: string }[] = [
    ...(query.q ? [{ key: 'q', value: '', label: `„${query.q}”` }] : []),
    ...(query.category ?? []).map((id) => ({
      key: 'category',
      value: id,
      label: categories.find((category) => category.id === id)?.name ?? id,
    })),
    ...(query.subcategory ?? []).map((id) => ({
      key: 'subcategory',
      value: id,
      label: subcategories.find((subcategory) => subcategory.id === id)?.label ?? id,
    })),
    ...(query.color ?? []).map((id) => ({
      key: 'color',
      value: id,
      label: colorFamilies.find((color) => color.id === id)?.label ?? id,
    })),
    ...(query.style ?? []).map((id) => ({ key: 'style', value: id, label: styleLabels[id] ?? id })),
    ...(query.availability ?? []).map((id) => ({
      key: 'availability',
      value: id,
      label: availabilityLabels[id] ?? id,
    })),
    ...(query.promo ? [{ key: 'promo', value: '', label: 'Promocje' }] : []),
    ...(query.rating ? [{ key: 'rating', value: '', label: `Ocena ${query.rating}+` }] : []),
    ...(query.minPrice !== undefined || query.maxPrice !== undefined
      ? [
          {
            key: 'price',
            value: '',
            label: `${formatPrice(query.minPrice ?? 0)} – ${formatPrice(query.maxPrice ?? 0)}`,
          },
        ]
      : []),
  ];

  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <Button
          key={`${chip.key}-${chip.value}-${chip.label}`}
          variant="secondary"
          size="sm"
          className="h-8 gap-1 rounded-full px-3 text-xs font-medium"
          onClick={() => {
            if (chip.key === 'price') {
              const next = toSearchParams(Object.fromEntries(searchParams.entries()));
              next.delete('minPrice');
              next.delete('maxPrice');
              router.push(`${pathname}?${next.toString()}`, { scroll: false });
              return;
            }
            removeValue(chip.key, chip.value || undefined);
          }}
        >
          {chip.label}
          <X className="h-3 w-3" />
        </Button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-2 text-xs text-muted-foreground"
        onClick={() => router.push(pathname, { scroll: false })}
      >
        Wyczyść wszystko
      </Button>
    </div>
  );
}
