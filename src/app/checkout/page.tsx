'use client';

import { useCart } from '@/contexts/cart-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CheckoutPage() {
    const { cart } = useCart();
    const router = useRouter();

    useEffect(() => {
        if (cart.length > 0) {
            router.replace('/checkout/summary');
        } else {
            router.replace('/cart');
        }
    }, [cart, router]);

    return (
        <div className="flex items-center justify-center py-12">
            <p>Przekierowywanie do kasy...</p>
        </div>
    );
}
