'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { readStorage, writeStorage } from '@/lib/storage';
import type { Product } from '@/lib/types';

const ORDERS_KEY = 'buynest.orders.v2';

export type OrderItem = {
  slug: string;
  name: string;
  colorName: string;
  price: number;
  quantity: number;
  image: string;
};

export type Order = {
  id: string;
  createdAt: string;
  status: 'przyjete' | 'w-realizacji' | 'wyslane' | 'dostarczone' | 'anulowane';
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  shippingMethod: string;
  customer: { firstName: string; lastName: string; email: string; phone: string };
  address: { street: string; postalCode: string; city: string; country: string };
};

export const ORDER_STATUS_LABELS: Record<Order['status'], string> = {
  przyjete: 'Przyjęte',
  'w-realizacji': 'W realizacji',
  wyslane: 'Wysłane',
  dostarczone: 'Dostarczone',
  anulowane: 'Anulowane',
};

type OrdersContextValue = {
  orders: Order[];
  lastOrder: Order | null;
  placeOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  findOrder: (id: string) => Order | undefined;
};

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

const createId = () => `BN-${Date.now().toString(36).toUpperCase().slice(-6)}`;

export const toOrderItem = (product: Product, quantity: number): OrderItem => ({
  slug: product.slug,
  name: `${product.name} · ${product.activeColor.name}`,
  colorName: product.activeColor.name,
  price: product.price,
  quantity,
  image: product.images[0]?.url ?? '',
});

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setOrders(readStorage<Order[]>(ORDERS_KEY, []));
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    writeStorage(ORDERS_KEY, orders);
  }, [orders, isReady]);

  const placeOrder = useCallback((order: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const next: Order = {
      ...order,
      id: createId(),
      createdAt: new Date().toISOString(),
      status: 'przyjete',
    };
    setOrders((current) => [next, ...current]);
    return next;
  }, []);

  const findOrder = useCallback((id: string) => orders.find((order) => order.id === id), [orders]);

  const value = useMemo(
    () => ({ orders, lastOrder: orders[0] ?? null, placeOrder, findOrder }),
    [orders, placeOrder, findOrder],
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) throw new Error('useOrders musi być użyty wewnątrz OrdersProvider');
  return context;
};
