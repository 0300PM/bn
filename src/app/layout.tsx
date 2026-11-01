import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/contexts/cart-context';
import { WishlistProvider } from '@/contexts/wishlist-context';
import { CompareProvider } from '@/contexts/compare-context';
import { RecentlyViewedProvider } from '@/contexts/recently-viewed-context';
import { OrdersProvider } from '@/contexts/orders-context';
import { ClientLayout } from '@/components/layout/client-layout';
import { AuthProvider } from '@/contexts/auth-context';
import { ScrollToTop } from '@/components/layout/scroll-to-top';

export const metadata: Metadata = {
  metadataBase: new URL('https://buynest.pl'),
  title: {
    default: 'BuyNest — meble i oświetlenie do nowoczesnych wnętrz',
    template: '%s | BuyNest',
  },
  description:
    'Sofy, fotele, stoły i lampy projektowane w Polsce. 120 wariantów kolorystycznych, darmowa dostawa od 2500 zł i 60 dni na zwrot.',
  keywords: ['meble', 'sofy', 'fotele', 'stoły', 'lampy', 'sklep meblowy', 'design'],
  openGraph: {
    title: 'BuyNest — meble do nowoczesnych wnętrz',
    description: 'Odkryj kolekcje mebli, które definiują przestrzeń.',
    type: 'website',
    locale: 'pl_PL',
    images: [{ url: '/images/hero.jpg', width: 1200, height: 630, alt: 'Wnętrze z meblami BuyNest' }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f5' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <OrdersProvider>
              <WishlistProvider>
                <CompareProvider>
                  <RecentlyViewedProvider>
                    <CartProvider>
                      <ClientLayout>{children}</ClientLayout>
                      <ScrollToTop />
                      <Toaster />
                    </CartProvider>
                  </RecentlyViewedProvider>
                </CompareProvider>
              </WishlistProvider>
            </OrdersProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
