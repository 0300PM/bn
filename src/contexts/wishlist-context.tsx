'use client';

import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import Cookies from 'js-cookie';
import { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_COOKIE_KEY = 'buynest-ui-wishlist';

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const wishlistFromCookie = Cookies.get(WISHLIST_COOKIE_KEY);
    if (wishlistFromCookie) {
       try {
        setWishlist(JSON.parse(wishlistFromCookie));
      } catch (e) {
        console.error("Failed to parse wishlist from cookie", e);
        setWishlist([]);
      }
    }
  }, []);

  const updateCookie = (updatedWishlist: Product[]) => {
    Cookies.set(WISHLIST_COOKIE_KEY, JSON.stringify(updatedWishlist), { expires: 30 });
  };

  const addToWishlist = useCallback((product: Product) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.some(item => item.id === product.id)) {
        return prevWishlist;
      }
      const updatedWishlist = [...prevWishlist, product];
      updateCookie(updatedWishlist);
      toast({
        title: "Dodano do listy życzeń",
        description: `${product.name} został dodany do Twojej listy życzeń.`,
      });
      return updatedWishlist;
    });
  }, [toast]);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist(prevWishlist => {
      const updatedWishlist = prevWishlist.filter(item => item.id !== productId);
      updateCookie(updatedWishlist);
      return updatedWishlist;
    });
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some(item => item.id === productId);
  }, [wishlist]);

  const itemCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        itemCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
