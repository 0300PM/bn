'use client';

import { categories } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function CategoriesPage() {
    return (
        <div className="container py-12 md:py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight">Kategorie produktów</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Odkryj nasze kolekcje i znajdź meble idealne dla siebie.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories.map((category) => (
                    <Link key={category.id} href={`/?category=${category.id}#products`} className="group">
                        <Card className="overflow-hidden h-full flex flex-col">
                            <div className="relative aspect-video w-full">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={category.hint}
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                                <p className="text-muted-foreground text-sm flex-grow">{category.description}</p>
                                <div className="mt-4 text-primary font-semibold flex items-center group-hover:underline">
                                    Zobacz produkty <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
