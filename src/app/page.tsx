import type { Metadata } from 'next';
import { Hero } from '@/components/home/hero';
import { BenefitStrip } from '@/components/shared/benefit-strip';
import { CategoryTiles } from '@/components/home/category-tiles';
import { ProductShowcase } from '@/components/home/product-showcase';
import { PromoBanner } from '@/components/home/promo-banner';
import { FeaturedSpotlight } from '@/components/home/featured-spotlight';
import { Testimonials } from '@/components/home/testimonials';
import { Lookbook } from '@/components/home/lookbook';
import { RecentlyViewed } from '@/components/shop/recently-viewed';
import { NewsletterForm } from '@/components/shared/newsletter-form';

export const metadata: Metadata = {
  title: 'BuyNest — meble i oświetlenie do nowoczesnych wnętrz',
  description:
    'Sofy, fotele, stoły i lampy projektowane w Polsce. 120 wariantów kolorystycznych, darmowa dostawa od 2500 zł i 60 dni na zwrot.',
  alternates: { canonical: '/' },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BuyNest',
  url: 'https://buynest.pl',
  logo: 'https://buynest.pl/images/hero.jpg',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+48 22 123 45 67',
    contactType: 'customer service',
    availableLanguage: ['Polish', 'English'],
  },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <Hero />
      <BenefitStrip />
      <CategoryTiles />
      <ProductShowcase />
      <PromoBanner />
      <FeaturedSpotlight />
      <Testimonials />
      <Lookbook />
      <RecentlyViewed />
      <section className="border-t bg-muted/40">
        <div className="container grid gap-6 py-12 md:grid-cols-2 md:items-center md:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Newsletter</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Zaprojektujmy razem Twój salon</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Co dwa tygodnie wysyłamy nowe aranżacje, poradniki i kody rabatowe. Bez spamu, wypisujesz się jednym kliknięciem.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
