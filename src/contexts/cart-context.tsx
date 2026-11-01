'use client';

import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import Cookies from 'js-cookie';
import { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
  isAdding: boolean;
  addingProductId: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_COOKIE_KEY = 'buynest-ui-cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [addingProductId, setAddingProductId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const cartFromCookie = Cookies.get(CART_COOKIE_KEY);
    if (cartFromCookie) {
      try {
        setCart(JSON.parse(cartFromCookie));
      } catch (e) {
        console.error("Failed to parse cart from cookie", e);
        setCart([]);
      }
    }
  }, []);

  const updateCookie = (updatedCart: CartItem[]) => {
    Cookies.set(CART_COOKIE_KEY, JSON.stringify(updatedCart), { expires: 7 });
  };

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setIsAdding(true);
    setAddingProductId(product.id);
    setTimeout(() => {
        setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === product.id);
        let updatedCart;
        if (existingItem) {
            updatedCart = prevCart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            );
        } else {
            updatedCart = [...prevCart, { ...product, quantity }];
        }
        updateCookie(updatedCart);
        
        toast({
          title: "Dodano do koszyka",
          description: (
            <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                <span>{product.name} został dodany do Twojego koszyka.</span>
            </div>
          ),
        });
        
        return updatedCart;
        });
        setIsAdding(false);
        setAddingProductId(null);
    }, 500); // Simulate network delay for loader
  }, [toast]);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      updateCookie(updatedCart);
      return updatedCart;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      updateCookie(updatedCart);
      return updatedCart;
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    Cookies.remove(CART_COOKIE_KEY);
  }, []);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
        isAdding,
        addingProductId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
