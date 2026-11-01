'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/products/product-card';
import { ProductFilters } from '@/components/products/product-filters';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Product } from '@/lib/types';
import { getProducts } from '@/lib/products';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const category = searchParams.get('category') || undefined;
      const sort = searchParams.get('sort') || undefined;
      const priceParam = searchParams.get('price');
      const q = searchParams.get('q') || undefined;
      const priceRange: [number, number] | undefined = priceParam
        ? (priceParam.split(',').map(Number) as [number, number])
        : undefined;

      const fetchedProducts = await getProducts({ category, sort, priceRange, q });
      setProducts(fetchedProducts);
      setIsLoading(false);
    };

    fetchProducts();
  }, [searchParams]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center bg-muted/30">
        <Image 
            src="https://picsum.photos/seed/hero-bg/1800/1000" 
            alt="Modern living room"
            fill
            className="object-cover -z-10 brightness-50"
            priority
            data-ai-hint="modern livingroom"
        />
        <div className="container px-4 text-white">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-shadow-lg">
            Odkryj Nowoczesny Design
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8 text-shadow">
            Kolekcje mebli, które definiują przestrzeń. Znajdź swój styl.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
            <Link href="#products" className="flex-grow">
                <Button size="lg" className="w-full">
                    Zobacz produkty <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div id="products" className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="hidden md:block md:col-span-1">
            <div className="sticky top-20">
              <ProductFilters />
            </div>
          </aside>

          {/* Products Grid */}
          <main className="col-span-1 md:col-span-3">
             {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="h-[250px] w-full" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-8 w-1/2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
          </main>
        </div>
      </div>

      {/* Promotional Banner */}
      <section className="bg-primary/20">
        <div className="container grid grid-cols-1 md:grid-cols-2 items-center gap-8 py-12">
            <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image src="https://picsum.photos/seed/promo1/600/400" alt="New collection" fill className="object-cover" data-ai-hint="furniture collection" />
            </div>
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">Nowa kolekcja już dostępna!</h2>
                <p className="text-muted-foreground mb-4">Odkryj świeże wzory i kolory, które ożywią Twoje wnętrze.</p>
                <Button>Sprawdź <Zap className="ml-2 h-4 w-4" /></Button>
            </div>
        </div>
      </section>

    </div>
  );
}
