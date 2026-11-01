'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { productBySlug } from '@/lib/catalog';
import { readStorage, writeStorage } from '@/lib/storage';
import type { Product } from '@/lib/types';

const VIEWED_KEY = 'buynest.viewed.v2';
const VIEWED_LIMIT = 8;

type RecentlyViewedContextValue = {
  items: Product[];
  track: (slug: string) => void;
};

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | undefined>(undefined);

export const RecentlyViewedProvider = ({ children }: { children: React.ReactNode }) => {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    setSlugs(readStorage<string[]>(VIEWED_KEY, []));
  }, []);

  const track = (slug: string) => {
    setSlugs((current) => {
      const next = [slug, ...current.filter((item) => item !== slug)].slice(0, VIEWED_LIMIT);
      writeStorage(VIEWED_KEY, next);
      return next;
    });
  };

  const items = useMemo(
    () => slugs.flatMap((slug) => {
      const product = productBySlug.get(slug);
      return product ? [product] : [];
    }),
    [slugs],
  );

  return (
    <RecentlyViewedContext.Provider value={{ items, track }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) throw new Error('useRecentlyViewed musi być użyty wewnątrz RecentlyViewedProvider');
  return context;
};
