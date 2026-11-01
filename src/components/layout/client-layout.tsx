'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MobileNav } from '@/components/layout/mobile-nav';
import { CookieConsent } from '@/components/layout/cookie-consent';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProgressBar height="3px" color="hsl(var(--accent))" options={{ showSpinner: false }} shallowRouting />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:shadow-lg"
      >
        Przejdź do treści
      </a>
      <Header />
      <main id="main-content" className="flex-grow pb-16 md:pb-0">
        {children}
      </main>
      <Footer />
      <MobileNav />
      <CookieConsent />
    </>
  );
}
