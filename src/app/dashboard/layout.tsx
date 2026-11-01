'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Cog, Heart, LayoutGrid, Package, Percent, User, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const sidebarNavItems = [
  { title: "Panel", href: "/dashboard", icon: <LayoutGrid className="h-5 w-5" /> },
  { title: "Zamówienia", href: "/dashboard/orders", icon: <Package className="h-5 w-5" /> },
  { title: "Lista życzeń", href: "/dashboard/wishlist", icon: <Heart className="h-5 w-5" /> },
  { title: "Kody rabatowe", href: "/dashboard/discounts", icon: <Percent className="h-5 w-5" /> },
  { title: "Program lojalnościowy", href: "/dashboard/loyalty", icon: <Award className="h-5 w-5" /> },
  { title: "Powiadomienia", href: "/dashboard/notifications", icon: <Bell className="h-5 w-5" /> },
  { title: "Ustawienia", href: "/dashboard/settings", icon: <Cog className="h-5 w-5" /> },
];

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
        <div className="container flex items-center justify-center min-h-[80vh]">
            <p>Ładowanie...</p>
        </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-4 gap-12">
        <aside className="md:col-span-1">
          <div className="flex items-center gap-4 mb-8">
            <User className="h-10 w-10 text-muted-foreground" />
            <div>
                <h2 className="font-bold text-lg">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            {sidebarNavItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="md:col-span-3">
            {children}
        </main>
      </div>
    </div>
  )
}
