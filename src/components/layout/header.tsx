'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ChevronDown,
  Heart,
  Menu,
  Package,
  Scale,
  Search,
  ShoppingBag,
  Sofa,
  Sparkles,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { AnnouncementBar } from '@/components/layout/announcement-bar';
import { SearchDialog } from '@/components/shop/search-dialog';
import { CartSheet } from '@/components/shop/cart-sheet';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';
import { useCompare } from '@/contexts/compare-context';
import { useAuth } from '@/contexts/auth-context';
import { useMounted } from '@/hooks/use-mounted';
import { categories } from '@/lib/catalog';
import { cn } from '@/lib/utils';

const primaryLinks = [
  { href: '/shop', label: 'Sklep' },
  { href: '/categories', label: 'Kategorie' },
  { href: '/shop?sort=nowosci', label: 'Nowości' },
  { href: '/shop?promo=1', label: 'Promocje' },
  { href: '/about', label: 'O nas' },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const mounted = useMounted();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { items: compareItems } = useCompare();
  const { user, logout } = useAuth();

  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="container flex h-16 items-center gap-3">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Otwórz menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[86vw] overflow-y-auto p-0 sm:max-w-sm">
              <SheetTitle className="sr-only">Menu nawigacji</SheetTitle>
              <div className="border-b px-5 py-4">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                  <Sofa className="h-5 w-5" />
                  <span className="text-lg font-bold">BuyNest</span>
                </Link>
              </div>
              <nav className="space-y-4 p-5">
                <div className="space-y-1">
                  {primaryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-md px-2 py-2 text-sm font-medium transition hover:bg-muted"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="space-y-1 border-t pt-3">
                  <p className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Kategorie</p>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/shop?category=${category.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between rounded-md px-2 py-2 text-sm transition hover:bg-muted"
                    >
                      {category.name}
                      <span className="text-xs text-muted-foreground">{category.count}</span>
                    </Link>
                  ))}
                </div>
                <div className="space-y-1 border-t pt-3">
                  <Link href="/wishlist" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted">
                    <Heart className="h-4 w-4" /> Lista życzeń
                  </Link>
                  <Link href={user ? '/dashboard' : '/login'} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted">
                    <User className="h-4 w-4" /> {user ? 'Moje konto' : 'Zaloguj się'}
                  </Link>
                  <Link href="/faq" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted">
                    <Sparkles className="h-4 w-4" /> Pomoc
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="BuyNest — strona główna">
            <Sofa className="h-5 w-5" />
            <span className="text-lg font-bold tracking-tight">BuyNest</span>
          </Link>

          <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Nawigacja główna">
            {primaryLinks.map((link) =>
              link.href === '/shop' ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                  onFocus={() => setMegaOpen(true)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node)) setMegaOpen(false);
                  }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition hover:bg-muted',
                      pathname === '/shop' && 'text-accent',
                    )}
                    aria-expanded={megaOpen}
                  >
                    {link.label}
                    <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', megaOpen && 'rotate-180')} />
                  </Link>
                  {megaOpen ? (
                    <div className="absolute left-0 top-full z-50 w-[640px] rounded-lg border bg-popover p-5 shadow-xl">
                      <div className="grid grid-cols-2 gap-6">
                        {categories.map((category) => (
                          <div key={category.id}>
                            <Link
                              href={`/shop?category=${category.id}`}
                              className="text-sm font-semibold hover:text-accent"
                              onClick={() => setMegaOpen(false)}
                            >
                              {category.name}
                            </Link>
                            <p className="mt-0.5 text-xs text-muted-foreground">{category.description}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 flex items-center justify-between rounded-md bg-muted/60 p-3">
                        <span className="text-sm">Potrzebujesz inspiracji? Zobacz cały katalog.</span>
                        <Button asChild size="sm">
                          <Link href="/shop" onClick={() => setMegaOpen(false)}>
                            Przeglądaj sklep
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition hover:bg-muted',
                    pathname === link.href && 'text-accent',
                  )}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="ml-auto flex items-center gap-0.5">
            <Button
              variant="outline"
              className="hidden h-9 w-64 justify-start gap-2 text-muted-foreground md:flex"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
              <span className="text-sm">Szukaj produktów</span>
              <kbd className="ml-auto rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium">⌘K</kbd>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSearchOpen(true)} aria-label="Szukaj">
              <Search className="h-5 w-5" />
            </Button>

            <div className="hidden items-center sm:flex">
              <Button variant="ghost" size="icon" asChild aria-label="Lista życzeń" className="relative">
                <Link href="/wishlist">
                  <Heart className="h-5 w-5" />
                  {mounted && wishlistCount > 0 ? (
                    <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full p-0 px-1 text-[10px]">{wishlistCount}</Badge>
                  ) : null}
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild aria-label="Porównanie" className="relative hidden lg:inline-flex">
                <Link href="/compare">
                  <Scale className="h-5 w-5" />
                  {compareItems.length > 0 ? (
                    <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full p-0 px-1 text-[10px]">{compareItems.length}</Badge>
                  ) : null}
                </Link>
              </Button>
            </div>

            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Konto">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {user ? (
                  <>
                    <DropdownMenuLabel className="truncate">{user.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild><Link href="/dashboard">Panel klienta</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/dashboard/orders">Moje zamówienia</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/dashboard/wishlist">Lista życzeń</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/dashboard/settings">Ustawienia</Link></DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        logout();
                        router.push('/');
                      }}
                    >
                      Wyloguj się
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuLabel>Witaj w BuyNest</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild><Link href="/login">Zaloguj się</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/signup">Załóż konto</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/dashboard/orders">Śledź zamówienie</Link></DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setCartOpen(true)}
              aria-label={`Koszyk, ${mounted ? itemCount : 0} produktów`}
            >
              <ShoppingBag className="h-5 w-5" />
              {mounted && itemCount > 0 ? (
                <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full p-0 px-1 text-[10px]">{itemCount}</Badge>
              ) : null}
            </Button>
          </div>
        </div>

        <div className="border-t lg:hidden">
          <div className="container flex items-center gap-4 overflow-x-auto py-2 text-sm scrollbar-none">
            <Link href="/shop?promo=1" className="flex items-center gap-1 whitespace-nowrap font-medium text-accent">
              <Sparkles className="h-3.5 w-3.5" /> Promocje
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.id}`}
                className="whitespace-nowrap text-muted-foreground transition hover:text-foreground"
              >
                {category.name}
              </Link>
            ))}
            <Link href="/dashboard/orders" className="flex items-center gap-1 whitespace-nowrap text-muted-foreground">
              <Package className="h-3.5 w-3.5" /> Zamówienia
            </Link>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
