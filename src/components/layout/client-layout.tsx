'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ProgressBar
                height="4px"
                color="hsl(var(--primary))"
                options={{ showSpinner: false }}
                shallowRouting
            />
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </>
    );
}
