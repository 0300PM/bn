'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, Menu, Search, ShoppingCart, Sofa, User, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';
import { Badge } from '@/components/ui/badge';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/auth-context';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#products', label: 'Produkty' },
  { href: '/categories', label: 'Kategorie' },
];

export function Header() {
  const { itemCount: cartItemCount } = useCart();
  const { itemCount: wishlistItemCount } = useWishlist();
  const { user, logout } = useAuth();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (debouncedSearchTerm) {
      newParams.set('q', debouncedSearchTerm);
    } else {
      newParams.delete('q');
    }
    
    if (pathname === '/') {
       router.push(`/?${newParams.toString()}`);
    }
  }, [debouncedSearchTerm, pathname, router, searchParams]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pathname !== '/') {
        router.push(`/?q=${searchTerm}`);
    } else {
        const newParams = new URLSearchParams(searchParams.toString());
        if (searchTerm) {
        newParams.set('q', searchTerm);
        } else {
        newParams.delete('q');
        }
        router.push(`/?${newParams.toString()}`);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              aria-label="Toggle Navigation"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center space-x-2 mb-4" onClick={() => setIsSheetOpen(false)}>
                <Sofa className="h-6 w-6" />
                <span className="font-bold">BuyNest</span>
            </Link>
            <div className="flex flex-col space-y-3">
                {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-foreground" onClick={() => setIsSheetOpen(false)}>
                    {link.label}
                </Link>
                ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Sofa className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">BuyNest</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Szukaj produktów..."
                  className="pl-8 sm:w-48 md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                 {searchTerm && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full w-10"
                    onClick={() => setSearchTerm('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </div>
          <nav className="flex items-center">
              <Button asChild variant="ghost" size="icon" aria-label="Wishlist" className="relative">
                <Link href="/wishlist">
                  <Heart className="h-5 w-5" />
                  {wishlistItemCount > 0 && (
                      <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 text-[10px] p-0 flex items-center justify-center rounded-full">{wishlistItemCount}</Badge>
                  )}
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" aria-label="Shopping Cart" className="relative">
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                      <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 text-[10px] p-0 flex items-center justify-center rounded-full">{cartItemCount}</Badge>
                  )}
                </Link>
              </Button>
            <ThemeToggle />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {user ? (
                   <Button variant="ghost" className="relative h-8 w-8 rounded-full ml-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatarUrl || ''} alt={user.name || 'User'} />
                        <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                   </Button>
                ) : (
                    <Button variant="ghost" size="icon" className="ml-2">
                        <User className="h-5 w-5" />
                    </Button>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user ? (
                    <>
                        <DropdownMenuLabel>Moje konto</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href="/dashboard">Panel</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/dashboard/settings">Ustawienia</Link></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>Wyloguj</DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem asChild><Link href="/login">Zaloguj się</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/signup">Zarejestruj się</Link></DropdownMenuItem>
                    </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

          </nav>
        </div>
      </div>
    </header>
  );
}
