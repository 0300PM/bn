import type {Metadata} from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from '@/contexts/cart-context';
import { WishlistProvider } from '@/contexts/wishlist-context';
import { ClientLayout } from '@/components/layout/client-layout';
import { AuthProvider } from '@/contexts/auth-context';

export const metadata: Metadata = {
  title: 'BuyNest',
  description: 'A modern e-commerce UI built with Next.js and Tailwind CSS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <AuthProvider>
                <WishlistProvider>
                    <CartProvider>
                        <ClientLayout>
                          {children}
                        </ClientLayout>
                        <Toaster />
                    </CartProvider>
                </WishlistProvider>
            </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
