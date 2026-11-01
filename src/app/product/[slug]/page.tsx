import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Package, Ruler, Sparkles } from 'lucide-react';
import { ProductGallery } from '@/components/products/product-gallery';
import { ProductPurchase } from '@/components/products/product-purchase';
import { ProductCard } from '@/components/products/product-card';
import { ReviewSummary } from '@/components/products/review-summary';
import { ViewTracker } from '@/components/products/view-tracker';
import { RecentlyViewed } from '@/components/shop/recently-viewed';
import { SectionHeading } from '@/components/shared/section-heading';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProductReviews, products, productBySlug } from '@/lib/catalog';
import { getRelatedProducts } from '@/lib/products';
import { formatDimensions, formatPrice } from '@/lib/format';

type PageProps = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => products.map((product) => ({ slug: product.slug }));

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug.get(slug);
  if (!product) return { title: 'Produkt nie znaleziony' };
  return {
    title: `${product.name} — ${product.activeColor.name}`,
    description: product.description.slice(0, 155),
    openGraph: {
      title: `${product.name} · ${product.activeColor.name}`,
      description: product.tagline,
      images: product.images[0] ? [{ url: product.images[0].url }] : undefined,
    },
  };
}

const careTips = [
  'Odkurzaj tkaninę miękką końcówką raz w tygodniu.',
  'Plamy usuwaj letnią wodą z delikatnym detergentem, bez szorowania.',
  'Unikaj bezpośredniego kontaktu z ostrym słońcem, aby zachować kolor.',
  'Drewno pielęgnuj olejem dwa razy w roku.',
];

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productBySlug.get(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const reviews = getProductReviews(product);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.sku,
    brand: { '@type': 'Brand', name: 'BuyNest' },
    image: product.images.map((image) => image.url),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'PLN',
      price: product.price,
      availability: product.availability === 'out-of-stock' ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock',
      url: `https://buynest.pl/product/${product.slug}`,
    },
  };

  return (
    <div>
      <ViewTracker slug={product.slug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container py-5 md:py-8">
        <nav className="mb-5 flex flex-wrap items-center gap-1 text-xs text-muted-foreground" aria-label="Ścieżka nawigacji">
          <Link href="/" className="hover:text-foreground">Strona główna</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/shop" className="hover:text-foreground">Sklep</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-foreground">{product.categoryLabel}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="truncate text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery product={product} />
          </div>
          <ProductPurchase product={product} />
        </div>

        <section className="mt-14">
          <Tabs defaultValue="details">
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
              <TabsTrigger value="details" className="rounded-md border data-[state=active]:bg-muted">
                Szczegóły
              </TabsTrigger>
              <TabsTrigger value="specification" className="rounded-md border data-[state=active]:bg-muted">
                Specyfikacja
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-md border data-[state=active]:bg-muted">
                Opinie ({reviews.length})
              </TabsTrigger>
              <TabsTrigger value="delivery" className="rounded-md border data-[state=active]:bg-muted">
                Dostawa i zwroty
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6 grid gap-8 md:grid-cols-[1.4fr_1fr]">
              <div className="space-y-4">
                <p className="text-muted-foreground">{product.description}</p>
                <ul className="space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="rounded-lg border bg-card p-4">
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Package className="h-4 w-4" /> Pielęgnacja
                  </h3>
                  <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                    {careTips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div className="overflow-hidden rounded-lg border">
                  <div className="relative aspect-square">
                    <Image
                      src={product.images[1]?.url ?? product.images[0].url}
                      alt={product.images[1]?.alt ?? product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border bg-card p-4 text-sm">
                  <Ruler className="h-5 w-5 shrink-0 text-accent" />
                  <span>
                    Wymiary: <strong>{formatDimensions(product.dimensions)}</strong>
                    {product.dimensions.seatHeight ? ` · wysokość siedziska ${product.dimensions.seatHeight} cm` : ''}
                  </span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specification" className="mt-6">
              <dl className="grid gap-px overflow-hidden rounded-lg border bg-border text-sm sm:grid-cols-2">
                {[
                  { label: 'Model', value: `${product.typeLabel} ${product.name.split(' ').at(-1)}` },
                  { label: 'Kolor', value: product.activeColor.name },
                  { label: 'Styl', value: product.style },
                  { label: 'Materiały', value: product.materials.join(', ') },
                  { label: 'Wymiary', value: formatDimensions(product.dimensions) },
                  { label: 'Waga', value: `${product.weight} kg` },
                  { label: 'Gwarancja', value: `${product.warrantyYears} lata` },
                  { label: 'SKU', value: product.sku },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between gap-4 bg-card p-3">
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="text-right font-medium capitalize">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6" id="opinie">
              <ReviewSummary rating={product.rating} reviewCount={product.reviewCount} reviews={reviews} />
            </TabsContent>

            <TabsContent value="delivery" className="mt-6 max-w-3xl">
              <Accordion type="single" collapsible defaultValue="delivery">
                <AccordionItem value="delivery">
                  <AccordionTrigger className="text-sm font-medium">Dostawa</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Standardowo wysyłamy w 24 h, a dostawa zajmuje 2–4 dni robocze. Zamówienia powyżej{' '}
                    {formatPrice(2500)} dostarczamy bezpłatnie. Wniesienie i montaż w wybranych miastach gratis.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns">
                  <AccordionTrigger className="text-sm font-medium">Zwroty i reklamacje</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Masz 60 dni na zwrot bez podania przyczyny. Odbiór organizujemy sami — wystarczy zgłoszenie w
                    panelu klienta. Reklamacje rozpatrujemy w ciągu 7 dni roboczych.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="payment">
                  <AccordionTrigger className="text-sm font-medium">Płatności i raty</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    BLIK, karta, Przelewy24 oraz raty 0% do 12 miesięcy. Płatność przy odbiorze dostępna dla zamówień
                    do {formatPrice(4000)}.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
        </section>

        <section className="mt-16">
          <SectionHeading title="Podobne produkty" description="Modele, które klienci zestawiają z tym wyborem." href="/shop" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </div>

      <RecentlyViewed excludeSlug={product.slug} />
    </div>
  );
}
