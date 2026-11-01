'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Home, LayoutGrid, Search, ShoppingBag, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/cart-context';
import { useMounted } from '@/hooks/use-mounted';
import { useState } from 'react';
import { SearchDialog } from '@/components/shop/search-dialog';

export function MobileNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const mounted = useMounted();
  const [searchOpen, setSearchOpen] = useState(false);

  const items = [
    { href: '/', label: 'Start', icon: Home },
    { href: '/shop', label: 'Sklep', icon: LayoutGrid },
    { href: '/wishlist', label: 'Życzenia', icon: Heart },
    { href: '/cart', label: 'Koszyk', icon: ShoppingBag, badge: mounted ? itemCount : 0 },
    { href: '/dashboard', label: 'Konto', icon: User },
  ];

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur md:hidden" aria-label="Nawigacja mobilna">
        <div className="grid grid-cols-6">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex flex-col items-center gap-0.5 py-2.5 text-[10px] text-muted-foreground"
            aria-label="Szukaj"
          >
            <Search className="h-5 w-5" />
            Szukaj
          </button>
          {items.map(({ href, label, icon: Icon, badge }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'relative flex flex-col items-center gap-0.5 py-2.5 text-[10px] transition',
                  active ? 'text-accent' : 'text-muted-foreground',
                )}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className="h-5 w-5" />
                {label}
                {badge ? (
                  <span className="absolute right-2 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-bold text-accent-foreground">
                    {badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>
      </nav>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
