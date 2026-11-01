'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { categories, colorFamilies, priceBounds, styles, subcategories } from '@/lib/catalog';
import { formatPrice } from '@/lib/format';
import { countActiveFilters, parseCatalogParams, toSearchParams } from '@/lib/search-params';
import { cn } from '@/lib/utils';

const availabilityOptions = [
  { id: 'in-stock', label: 'Dostępne od razu' },
  { id: 'low-stock', label: 'Ostatnie sztuki' },
  { id: 'out-of-stock', label: 'Na zamówienie' },
];

const ratingOptions = [
  { id: '4.5', label: '4,5 i więcej' },
  { id: '4', label: '4,0 i więcej' },
  { id: '3.5', label: '3,5 i więcej' },
];

const styleLabels: Record<string, string> = {
  skandynawski: 'Skandynawski',
  modern: 'Nowoczesny',
  industrial: 'Industrialny',
};

const minPrice = Math.floor(priceBounds.min / 100) * 100;
const maxPrice = Math.ceil(priceBounds.max / 100) * 100;

export function ProductFilters({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = useMemo(() => parseCatalogParams(Object.fromEntries(searchParams.entries())), [searchParams]);

  const [price, setPrice] = useState<[number, number]>([
    query.minPrice ?? minPrice,
    query.maxPrice ?? maxPrice,
  ]);

  const updateParams = (updates: Record<string, string | null>) => {
    const next = toSearchParams(Object.fromEntries(searchParams.entries()));
    Object.entries(updates).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    next.delete('page');
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const toggleValue = (key: string, value: string, current: string[] = []) => {
    const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
    updateParams({ [key]: next.length ? next.join(',') : null });
  };

  const activeCount = countActiveFilters(query);

  const clearAll = () => {
    const next = toSearchParams(Object.fromEntries(searchParams.entries()));
    ['category', 'subcategory', 'color', 'availability', 'style', 'minPrice', 'maxPrice', 'rating', 'promo', 'page'].forEach(
      (key) => next.delete(key),
    );
    setPrice([minPrice, maxPrice]);
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide">Filtry</h2>
        <div className="flex items-center gap-2">
          {activeCount > 0 ? (
            <Button variant="ghost" size="sm" onClick={clearAll} className="h-8 px-2 text-xs">
              Wyczyść ({activeCount})
            </Button>
          ) : null}
          {onClose ? (
            <Button variant="ghost" size="icon" className="h-8 w-8 lg:hidden" onClick={onClose} aria-label="Zamknij filtry">
              <X className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </div>

      <Accordion type="multiple" defaultValue={['category', 'price', 'color']} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="text-sm font-medium">Kategorie</AccordionTrigger>
          <AccordionContent className="space-y-3 pt-1">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center gap-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={query.category?.includes(category.id)}
                  onCheckedChange={() => toggleValue('category', category.id, query.category)}
                />
                <Label htmlFor={`category-${category.id}`} className="flex-1 cursor-pointer text-sm font-normal">
                  {category.name}
                </Label>
                <span className="text-xs text-muted-foreground">{category.count}</span>
              </div>
            ))}
            {query.category?.length ? (
              <div className="space-y-2 border-t pt-3">
                {subcategories
                  .filter((subcategory) => query.category?.includes(subcategory.category))
                  .map((subcategory) => (
                    <div key={subcategory.id} className="flex items-center gap-2">
                      <Checkbox
                        id={`sub-${subcategory.id}`}
                        checked={query.subcategory?.includes(subcategory.id)}
                        onCheckedChange={() => toggleValue('subcategory', subcategory.id, query.subcategory)}
                      />
                      <Label htmlFor={`sub-${subcategory.id}`} className="cursor-pointer text-sm font-normal">
                        {subcategory.label}
                      </Label>
                    </div>
                  ))}
              </div>
            ) : null}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">Cena</AccordionTrigger>
          <AccordionContent className="pt-4">
            <Slider
              min={minPrice}
              max={maxPrice}
              step={50}
              value={price}
              onValueChange={(value) => setPrice(value as [number, number])}
              onValueCommit={(value) => {
                const [low, high] = value as [number, number];
                updateParams({
                  minPrice: low > minPrice ? String(low) : null,
                  maxPrice: high < maxPrice ? String(high) : null,
                });
              }}
            />
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatPrice(price[0])}</span>
              <span>{formatPrice(price[1])}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger className="text-sm font-medium">Kolor</AccordionTrigger>
          <AccordionContent className="pt-3">
            <div className="grid grid-cols-2 gap-2">
              {colorFamilies.map((color) => {
                const active = query.color?.includes(color.id);
                return (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => toggleValue('color', color.id, query.color)}
                    className={cn(
                      'flex items-center gap-2 rounded-md border px-2 py-1.5 text-xs transition',
                      active ? 'border-foreground bg-muted' : 'hover:border-foreground/30',
                    )}
                    aria-pressed={active}
                  >
                    <span className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ backgroundColor: color.hex }} />
                    {color.label}
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger className="text-sm font-medium">Dostępność</AccordionTrigger>
          <AccordionContent className="space-y-3 pt-1">
            {availabilityOptions.map((option) => (
              <div key={option.id} className="flex items-center gap-2">
                <Checkbox
                  id={`availability-${option.id}`}
                  checked={query.availability?.includes(option.id)}
                  onCheckedChange={() => toggleValue('availability', option.id, query.availability)}
                />
                <Label htmlFor={`availability-${option.id}`} className="cursor-pointer text-sm font-normal">
                  {option.label}
                </Label>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-1">
              <Checkbox
                id="promo-only"
                checked={Boolean(query.promo)}
                onCheckedChange={(checked) => updateParams({ promo: checked ? '1' : null })}
              />
              <Label htmlFor="promo-only" className="cursor-pointer text-sm font-normal">
                Tylko w promocji
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger className="text-sm font-medium">Ocena klientów</AccordionTrigger>
          <AccordionContent className="space-y-3 pt-1">
            {ratingOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => updateParams({ rating: query.rating === Number(option.id) ? null : option.id })}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-1 py-1 text-sm transition',
                  query.rating === Number(option.id) ? 'font-semibold text-accent' : 'text-muted-foreground hover:text-foreground',
                )}
                aria-pressed={query.rating === Number(option.id)}
              >
                <span className="text-accent">★</span> {option.label}
              </button>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="style">
          <AccordionTrigger className="text-sm font-medium">Styl</AccordionTrigger>
          <AccordionContent className="space-y-3 pt-1">
            {styles.map((style) => (
              <div key={style} className="flex items-center gap-2">
                <Checkbox
                  id={`style-${style}`}
                  checked={query.style?.includes(style)}
                  onCheckedChange={() => toggleValue('style', style, query.style)}
                />
                <Label htmlFor={`style-${style}`} className="cursor-pointer text-sm font-normal">
                  {styleLabels[style] ?? style}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
