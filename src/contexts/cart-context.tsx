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
import { calculateTotals, findCoupon, MAX_QUANTITY } from '@/lib/commerce';
import type { Coupon } from '@/lib/commerce';
import { readStorage, writeStorage } from '@/lib/storage';
import type { Product } from '@/lib/types';

const CART_KEY = 'buynest.cart.v2';
const COUPON_KEY = 'buynest.coupon.v2';

type StoredLine = { slug: string; quantity: number };

export type CartLine = {
  product: Product;
  quantity: number;
  lineTotal: number;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  cart: CartLine[];
  subtotal: number;
  totals: ReturnType<typeof calculateTotals>;
  coupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  increment: (slug: string) => void;
  decrement: (slug: string) => void;
  clearCart: () => void;
  isReady: boolean;
  isInCart: (slug: string) => boolean;
  cartTotal: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [stored, setStored] = useState<StoredLine[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setStored(readStorage<StoredLine[]>(CART_KEY, []));
    const storedCoupon = readStorage<string | null>(COUPON_KEY, null);
    setCoupon(storedCoupon ? findCoupon(storedCoupon) : null);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    writeStorage(CART_KEY, stored);
  }, [stored, isReady]);

  useEffect(() => {
    if (!isReady) return;
    writeStorage(COUPON_KEY, coupon?.code ?? null);
  }, [coupon, isReady]);

  const lines = useMemo<CartLine[]>(
    () =>
      stored.flatMap((line) => {
        const product = productBySlug.get(line.slug);
        if (!product) return [];
        return [{ product, quantity: line.quantity, lineTotal: product.price * line.quantity }];
      }),
    [stored],
  );

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const totals = useMemo(() => calculateTotals({ subtotal, coupon }), [subtotal, coupon]);

  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      setStored((current) => {
        const existing = current.find((line) => line.slug === product.slug);
        if (existing) {
          return current.map((line) =>
            line.slug === product.slug
              ? { ...line, quantity: Math.min(MAX_QUANTITY, line.quantity + quantity) }
              : line,
          );
        }
        return [...current, { slug: product.slug, quantity: Math.min(MAX_QUANTITY, quantity) }];
      });
      toast({
        title: 'Dodano do koszyka',
        description: `${product.name} · ${product.activeColor.name}`,
      });
    },
    [],
  );

  const removeFromCart = useCallback((slug: string) => {
    setStored((current) => current.filter((line) => line.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    setStored((current) =>
      quantity <= 0
        ? current.filter((line) => line.slug !== slug)
        : current.map((line) =>
            line.slug === slug ? { ...line, quantity: Math.min(MAX_QUANTITY, quantity) } : line,
          ),
    );
  }, []);

  const increment = useCallback(
    (slug: string) => {
      const line = stored.find((item) => item.slug === slug);
      updateQuantity(slug, (line?.quantity ?? 0) + 1);
    },
    [stored, updateQuantity],
  );

  const decrement = useCallback(
    (slug: string) => {
      const line = stored.find((item) => item.slug === slug);
      updateQuantity(slug, (line?.quantity ?? 0) - 1);
    },
    [stored, updateQuantity],
  );

  const clearCart = useCallback(() => {
    setStored([]);
    setCoupon(null);
  }, []);

  const applyCoupon = useCallback(
    (code: string) => {
      const found = findCoupon(code);
      if (!found) {
        toast({ title: 'Nieprawidłowy kod', description: 'Sprawdź kod rabatowy i spróbuj ponownie.', variant: 'destructive' });
        return false;
      }
      if (subtotal < found.minimum) {
        toast({
          title: 'Kod jeszcze nieaktywny',
          description: `Minimalna wartość zamówienia to ${found.minimum} zł.`,
          variant: 'destructive',
        });
        return false;
      }
      setCoupon(found);
      toast({ title: 'Kod rabatowy aktywny', description: found.label });
      return true;
    },
    [subtotal],
  );

  const removeCoupon = useCallback(() => setCoupon(null), []);

  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const isInCart = useCallback((slug: string) => stored.some((line) => line.slug === slug), [stored]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      cart: lines,
      itemCount,
      subtotal,
      totals,
      coupon,
      applyCoupon,
      removeCoupon,
      addToCart,
      removeFromCart,
      updateQuantity,
      increment,
      decrement,
      clearCart,
      isReady,
      isInCart,
      cartTotal: totals.total,
    }),
    [
      lines,
      itemCount,
      subtotal,
      totals,
      coupon,
      applyCoupon,
      removeCoupon,
      addToCart,
      removeFromCart,
      updateQuantity,
      increment,
      decrement,
      clearCart,
      isReady,
      isInCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart musi być użyty wewnątrz CartProvider');
  return context;
};
