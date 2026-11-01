'use client';
import { ProductCard } from '@/components/products/product-card';
import { useWishlist } from '@/contexts/wishlist-context';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
    const { wishlist } = useWishlist();

    return (
        <div className="container py-12">
            <h1 className="text-3xl font-bold mb-8">Twoja lista życzeń</h1>
            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlist.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed rounded-lg">
                    <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Twoja lista życzeń jest pusta</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Dodaj produkty, które Ci się podobają, aby je zapisać na później.</p>
                    <Button asChild className="mt-6">
                        <Link href="/#products">Przeglądaj produkty</Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
