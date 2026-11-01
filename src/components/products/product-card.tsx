'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Loader2, ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { StarRating } from '@/components/products/star-rating';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart, isAdding, addingProductId } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
    } else {
        addToWishlist(product);
    }
  };

  const isCurrentlyAdding = isAdding && addingProductId === product.id;

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-lg group", className)}>
        <Link href={`/product/${product.slug}`} className="block">
            <CardHeader className="p-0">
                <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                        src={product.images[0].url}
                        alt={product.images[0].alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={product.images[0].hint}
                    />
                     <Button 
                        size="icon" 
                        variant="secondary"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                        onClick={handleWishlistToggle}
                        aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        <Heart className={cn("h-4 w-4", isInWishlist(product.id) ? "text-destructive fill-destructive" : "text-muted-foreground")} />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="text-base font-medium leading-tight mb-1 truncate">
                    {product.name}
                </CardTitle>
                <div className="flex items-center justify-between">
                    <p className="text-lg font-bold">
                        ${product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <StarRating rating={product.rating} />
                        <span>({product.reviewCount})</span>
                    </div>
                </div>
            </CardContent>
        </Link>
        <CardFooter className="p-4 pt-0">
             <Button className="w-full" onClick={handleAddToCart} disabled={isCurrentlyAdding}>
                {isCurrentlyAdding ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <ShoppingCart className="mr-2 h-4 w-4" />
                )}
                Dodaj do koszyka
            </Button>
        </CardFooter>
    </Card>
  );
}
