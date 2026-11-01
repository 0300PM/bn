'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/products/product-card';
import { SectionHeading } from '@/components/shared/section-heading';
import { getBestsellers, getNewArrivals, getPromotions } from '@/lib/products';

const tabs = [
  { id: 'bestsellery', label: 'Bestsellery', products: getBestsellers(8) },
  { id: 'nowosci', label: 'Nowości', products: getNewArrivals(8).length ? getNewArrivals(8) : getBestsellers(8) },
  { id: 'promocje', label: 'Promocje', products: getPromotions(8) },
];

export function ProductShowcase() {
  const [active, setActive] = useState('bestsellery');
  const current = tabs.find((tab) => tab.id === active) ?? tabs[0];

  return (
    <section className="container py-12 md:py-16">
      <SectionHeading
        eyebrow="Wybrane dla Ciebie"
        title="Najczęściej wybierane modele"
        description="Sprawdzone zestawy, które klienci najczęściej dodają do salonu."
        href="/shop"
      />
      <Tabs value={active} onValueChange={setActive}>
        <TabsList className="mb-6 h-auto w-full justify-start gap-2 bg-transparent p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="rounded-full border px-4 py-1.5 text-sm data-[state=active]:border-foreground data-[state=active]:bg-foreground data-[state=active]:text-background"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={current.id} className="mt-0">
          <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
            {current.products.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 4} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
