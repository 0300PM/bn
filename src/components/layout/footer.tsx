import Link from 'next/link';
import { Clock, Mail, MapPin, Phone, Sofa } from 'lucide-react';
import { NewsletterForm } from '@/components/shared/newsletter-form';
import { categories } from '@/lib/catalog';

const columns = [
  {
    title: 'Sklep',
    links: [
      { href: '/shop', label: 'Wszystkie produkty' },
      ...categories.map((category) => ({ href: `/shop?category=${category.id}`, label: category.name })),
      { href: '/shop?promo=1', label: 'Promocje' },
    ],
  },
  {
    title: 'Obsługa klienta',
    links: [
      { href: '/contact', label: 'Kontakt' },
      { href: '/help-center', label: 'Centrum pomocy' },
      { href: '/shipping-returns', label: 'Dostawa i zwroty' },
      { href: '/faq', label: 'Najczęstsze pytania' },
      { href: '/dashboard/orders', label: 'Śledzenie zamówienia' },
    ],
  },
  {
    title: 'BuyNest',
    links: [
      { href: '/about', label: 'O nas' },
      { href: '/shop?sort=nowosci', label: 'Nowości' },
      { href: '/dashboard/loyalty', label: 'Program lojalnościowy' },
      { href: '/terms', label: 'Regulamin' },
      { href: '/privacy', label: 'Polityka prywatności' },
    ],
  },
];

const payments = ['BLIK', 'Visa', 'Mastercard', 'Przelewy24', 'Apple Pay'];

export function Footer() {
  return (
    <footer className="border-t bg-muted/60">
      <div className="container py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <Sofa className="h-6 w-6" />
              <span className="text-lg font-bold">BuyNest</span>
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground">
              Meble projektowane w Polsce, szyte i składane w naszych pracowniach. Pomagamy urządzić wnętrza,
              w których chce się zostać dłużej.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +48 22 123 45 67</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> pomoc@buynest.pl</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> ul. Prosta 12, 00-850 Warszawa</li>
              <li className="flex items-center gap-2"><Clock className="h-4 w-4" /> pon.–pt. 9:00–18:00, sob. 10:00–14:00</li>
            </ul>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="mb-4 text-sm font-semibold">{column.title}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link href={link.href} className="transition hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 grid gap-8 rounded-lg border bg-background p-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <h3 className="text-lg font-semibold">−10% na pierwsze zamówienie</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Zapisz się do newslettera i odbierz kod rabatowy oraz dostęp do przedsprzedaży kolekcji.
            </p>
          </div>
          <NewsletterForm compact />
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BuyNest Sp. z o.o. · NIP 5252891234 · Wszelkie prawa zastrzeżone.
          </p>
          <ul className="flex flex-wrap items-center gap-2">
            {payments.map((payment) => (
              <li
                key={payment}
                className="rounded border bg-background px-2.5 py-1 text-[11px] font-semibold text-muted-foreground"
              >
                {payment}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
