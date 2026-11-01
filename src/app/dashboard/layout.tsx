'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  Award,
  Bell,
  Cog,
  Heart,
  LayoutGrid,
  LogOut,
  Package,
  Percent,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/auth-context';
import { cn } from '@/lib/utils';

const items = [
  { title: 'Przegląd', href: '/dashboard', icon: LayoutGrid },
  { title: 'Zamówienia', href: '/dashboard/orders', icon: Package },
  { title: 'Lista życzeń', href: '/dashboard/wishlist', icon: Heart },
  { title: 'Kody rabatowe', href: '/dashboard/discounts', icon: Percent },
  { title: 'Program lojalnościowy', href: '/dashboard/loyalty', icon: Award },
  { title: 'Powiadomienia', href: '/dashboard/notifications', icon: Bell },
  { title: 'Ustawienia', href: '/dashboard/settings', icon: Cog },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isReady, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady && !user) router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
  }, [isReady, user, pathname, router]);

  if (!isReady) {
    return (
      <div className="container grid gap-8 py-10 md:grid-cols-[220px_1fr]">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-20 text-center">
        <p className="text-sm text-muted-foreground">Przekierowujemy do logowania…</p>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="grid gap-8 md:grid-cols-[230px_1fr]">
        <aside>
          <div className="mb-6 rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto md:flex-col" aria-label="Nawigacja panelu">
            {items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition',
                    active ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted',
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
          <Button
            variant="ghost"
            className="mt-4 w-full justify-start text-muted-foreground"
            onClick={() => {
              logout();
              router.push('/');
            }}
          >
            <LogOut className="mr-2 h-4 w-4" /> Wyloguj się
          </Button>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
