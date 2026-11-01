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

const WISHLIST_KEY = 'buynest.wishlist.v2';

type WishlistContextValue = {
  wishlist: Product[];
  itemCount: number;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (slug: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (slug: string) => boolean;
  isReady: boolean;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setSlugs(readStorage<string[]>(WISHLIST_KEY, []));
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    writeStorage(WISHLIST_KEY, slugs);
  }, [slugs, isReady]);

  const wishlist = useMemo(
    () => slugs.flatMap((slug) => {
      const product = productBySlug.get(slug);
      return product ? [product] : [];
    }),
    [slugs],
  );

  const isInWishlist = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  const addToWishlist = useCallback((product: Product) => {
    setSlugs((current) => (current.includes(product.slug) ? current : [product.slug, ...current]));
    toast({ title: 'Dodano do listy życzeń', description: product.name });
  }, []);

  const removeFromWishlist = useCallback((slug: string) => {
    setSlugs((current) => current.filter((item) => item !== slug));
  }, []);

  const toggleWishlist = useCallback(
    (product: Product) => {
      if (slugs.includes(product.slug)) {
        removeFromWishlist(product.slug);
        toast({ title: 'Usunięto z listy życzeń', description: product.name });
        return;
      }
      addToWishlist(product);
    },
    [slugs, addToWishlist, removeFromWishlist],
  );

  const value = useMemo(
    () => ({
      wishlist,
      itemCount: wishlist.length,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
      isReady,
    }),
    [wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, isReady],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist musi być użyty wewnątrz WishlistProvider');
  return context;
};
