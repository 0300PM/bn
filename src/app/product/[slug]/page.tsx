
'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Check, ChevronRight, ShieldCheck, Star, Truck } from 'lucide-react';

import { getProductBySlug, getProductReviews, getRelatedProducts } from '@/lib/products';
import type { Product, Review } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StarRating } from '@/components/products/star-rating';
import { ProductCard } from '@/components/products/product-card';
import { useCart } from '@/contexts/cart-context';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

function ProductSkeleton() {
    return (
        <div className="container py-8 md:py-12">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                <div>
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <div className="flex gap-2 mt-4">
                        <Skeleton className="w-20 h-20 rounded" />
                        <Skeleton className="w-20 h-20 rounded" />
                        <Skeleton className="w-20 h-20 rounded" />
                    </div>
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-9 w-3/4" />
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-12 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                    <div className="space-y-4">
                         <Skeleton className="h-5 w-full" />
                         <Skeleton className="h-5 w-5/6" />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Product['images'][0] | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const productData = await getProductBySlug(slug);
        if (!productData) {
          notFound();
          return;
        }

        const [relatedData, reviewsData] = await Promise.all([
          getRelatedProducts(productData.category, productData.id),
          getProductReviews(productData.id),
        ]);

        setProduct(productData);
        setSelectedImage(productData.images[0]);
        setRelatedProducts(relatedData);
        setReviews(reviewsData);

      } catch (error) {
        console.error("Failed to fetch product data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (!product) {
    return notFound();
  }

  const handleAddToCart = () => {
    addToCart(product);
  };
  
  return (
    <div className="bg-background">
      <div className="container py-8 md:py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-muted-foreground mb-4">
            <span>Home</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="capitalize">{product.category}</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-foreground font-medium truncate">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Gallery */}
          <div>
             <div className="aspect-square w-full relative mb-4 rounded-lg overflow-hidden border">
                {selectedImage && (
                    <Image
                        src={selectedImage.url}
                        alt={selectedImage.alt}
                        fill
                        className="object-cover transition-all duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                )}
             </div>
             <Carousel opts={{ align: 'start', dragFree: true }} className="w-full">
                <CarouselContent className="-ml-2">
                    {product.images.map((image, index) => (
                    <CarouselItem key={index} className="pl-2 basis-1/4 md:basis-1/5">
                        <div
                            className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage?.id === image.id ? 'border-primary' : 'border-transparent'}`}
                            onClick={() => setSelectedImage(image)}
                        >
                            <Image
                                src={image.url}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                sizes="20vw"
                            />
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
             </Carousel>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
            
            <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center">
                    <StarRating rating={product.rating} />
                    <span className="ml-2 text-sm text-muted-foreground">({product.reviewCount} opinii)</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span className={`text-sm font-medium ${product.availability === 'in-stock' ? 'text-green-600' : 'text-destructive'}`}>
                    {product.availability === 'in-stock' ? 'Dostępny' : 'Niedostępny'}
                </span>
            </div>

            <p className="text-4xl font-bold my-4">${product.price.toFixed(2)}</p>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="mt-6">
              <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart} disabled={product.availability === 'out-of-stock'}>
                {product.availability === 'in-stock' ? 'Dodaj do koszyka' : 'Produkt niedostępny'}
              </Button>
            </div>

            <div className="mt-8 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-muted-foreground" />
                    <span><span className="font-semibold">Darmowa dostawa</span> w ciągu 3-5 dni roboczych.</span>
                </div>
                 <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                    <span><span className="font-semibold">30-dniowa polityka zwrotów</span> dla Twojego spokoju.</span>
                </div>
            </div>

          </div>
        </div>

        {/* Product Details & Reviews Tabs */}
        <div className="mt-16">
            <Tabs defaultValue="details">
                <TabsList>
                    <TabsTrigger value="details">Szczegóły produktu</TabsTrigger>
                    <TabsTrigger value="reviews">Opinie ({reviews.length})</TabsTrigger>
                    <TabsTrigger value="shipping">Wysyłka i zwroty</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="py-6 prose max-w-none prose-p:text-muted-foreground">
                    <p>{product.details}</p>
                </TabsContent>
                <TabsContent value="reviews" className="py-6">
                   {reviews.length > 0 ? (
                        <div className="space-y-6">
                            {reviews.map(review => (
                                <div key={review.id} className="border-b pb-4">
                                    <div className="flex items-center mb-2">
                                        <StarRating rating={review.rating} />
                                        <p className="ml-auto text-sm text-muted-foreground">{review.date}</p>
                                    </div>
                                    <p className="font-semibold mb-1">{review.author}</p>
                                    <p className="text-muted-foreground text-sm">{review.text}</p>
                                </div>
                            ))}
                        </div>
                   ) : (
                       <p className="text-muted-foreground">Brak opinii dla tego produktu.</p>
                   )}
                </TabsContent>
                 <TabsContent value="shipping" className="py-6 prose max-w-none prose-p:text-muted-foreground">
                    <p>{product.shippingReturns}</p>
                </TabsContent>
            </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-6">Może Ci się spodobać</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(related => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
