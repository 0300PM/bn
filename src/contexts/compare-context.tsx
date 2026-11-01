'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from '@/hooks/use-toast';
import { productBySlug } from '@/lib/catalog';
import { readStorage, writeStorage } from '@/lib/storage';
import type { Product } from '@/lib/types';

const COMPARE_KEY = 'buynest.compare.v2';
const COMPARE_LIMIT = 4;

type CompareContextValue = {
  items: Product[];
  isInCompare: (slug: string) => boolean;
  toggleCompare: (product: Product) => void;
  removeFromCompare: (slug: string) => void;
  clearCompare: () => void;
};

const CompareContext = createContext<CompareContextValue | undefined>(undefined);

export const CompareProvider = ({ children }: { children: React.ReactNode }) => {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    setSlugs(readStorage<string[]>(COMPARE_KEY, []));
  }, []);

  useEffect(() => {
    writeStorage(COMPARE_KEY, slugs);
  }, [slugs]);

  const items = useMemo(
    () => slugs.flatMap((slug) => {
      const product = productBySlug.get(slug);
      return product ? [product] : [];
    }),
    [slugs],
  );

  const isInCompare = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  const toggleCompare = useCallback((product: Product) => {
    setSlugs((current) => {
      if (current.includes(product.slug)) return current.filter((slug) => slug !== product.slug);
      if (current.length >= COMPARE_LIMIT) {
        toast({
          title: 'Limit porównania',
          description: `Możesz porównać maksymalnie ${COMPARE_LIMIT} produkty.`,
          variant: 'destructive',
        });
        return current;
      }
      toast({ title: 'Dodano do porównania', description: product.name });
      return [...current, product.slug];
    });
  }, []);

  const removeFromCompare = useCallback((slug: string) => {
    setSlugs((current) => current.filter((item) => item !== slug));
  }, []);

  const clearCompare = useCallback(() => setSlugs([]), []);

  const value = useMemo(
    () => ({ items, isInCompare, toggleCompare, removeFromCompare, clearCompare }),
    [items, isInCompare, toggleCompare, removeFromCompare, clearCompare],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) throw new Error('useCompare musi być użyty wewnątrz CompareProvider');
  return context;
};
