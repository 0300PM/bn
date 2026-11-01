'use client';
import { ProductCard } from '@/components/products/product-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWishlist } from '@/contexts/wishlist-context';
import { Heart } from 'lucide-react';

export default function DashboardWishlistPage() {
    const { wishlist } = useWishlist();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Twoja lista życzeń</CardTitle>
                <CardDescription>Produkty, które Cię zainspirowały.</CardDescription>
            </CardHeader>
            <CardContent>
                 {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlist.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg">
                        <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">Twoja lista życzeń jest pusta</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Dodaj produkty, które Ci się podobają, aby je zapisać na później.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
