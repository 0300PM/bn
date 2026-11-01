'use client';

import React, { useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { categories } from '@/lib/data';

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [priceRange, setPriceRange] = React.useState<[number, number]>(() => {
    const price = searchParams.get('price');
    if (price) {
      return price.split(',').map(Number) as [number, number];
    }
    return [0, 1500];
  });
  
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(() => {
    const cats = searchParams.get('category');
    return cats ? cats.split(',') : [];
  });
  
  const [sortOrder, setSortOrder] = React.useState(() => searchParams.get('sort') || '');

  const createQueryString = useCallback(
    (paramsToUpdate: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [name, value] of Object.entries(paramsToUpdate)) {
        if (value) {
          params.set(name, value);
        } else {
          params.delete(name);
        }
      }
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const queryString = createQueryString({
      price: priceRange.join(','),
      category: selectedCategories.length > 0 ? selectedCategories.join(',') : null,
      sort: sortOrder || null,
    });
    router.replace(`?${queryString}`, { scroll: false });
  }, [priceRange, selectedCategories, sortOrder, router, createQueryString]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSelectedCategories(prev =>
      checked ? [...prev, categoryId] : prev.filter(id => id !== categoryId)
    );
  };
  
  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Sortuj</h3>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger>
            <SelectValue placeholder="Domyślnie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Popularność</SelectItem>
            <SelectItem value="rating-desc">Ocena: od najwyższej</SelectItem>
            <SelectItem value="price-asc">Cena: od najniższej</SelectItem>
            <SelectItem value="price-desc">Cena: od najwyższej</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Accordion type="multiple" defaultValue={['categories', 'price']} className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger className="text-lg font-semibold">Kategorie</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {categories.map(category => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={category.id} 
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, !!checked)}
                />
                <Label htmlFor={category.id} className="font-normal">{category.name}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger className="text-lg font-semibold">Cena</AccordionTrigger>
          <AccordionContent className="pt-4">
            <Slider
              max={1500}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
