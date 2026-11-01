import Image from 'next/image';
import Link from 'next/link';
import { Sofa } from 'lucide-react';

export function AuthShell({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="container py-10 md:py-16">
      <div className="grid overflow-hidden rounded-xl border bg-card lg:grid-cols-2">
        <div className="p-6 sm:p-10">
          <Link href="/" className="flex items-center gap-2">
            <Sofa className="h-5 w-5" />
            <span className="font-bold">BuyNest</span>
          </Link>
          <div className="mt-8 max-w-sm space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            {children}
            {footer ? <div className="text-sm text-muted-foreground">{footer}</div> : null}
          </div>
        </div>
        <div className="relative hidden min-h-[420px] lg:block">
          <Image
            src="/images/hero-secondary.jpg"
            alt="Wnętrze z meblami BuyNest"
            fill
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="text-sm font-semibold">Konto klienta BuyNest</p>
            <p className="text-xs text-white/80">
              Historia zamówień, zapisane adresy, listy życzeń i kody rabatowe w jednym miejscu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
