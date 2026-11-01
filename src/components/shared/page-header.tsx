import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type PageHeaderProps = {
  title: string;
  description?: string;
  breadcrumbs?: { href: string; label: string }[];
};

export function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <header className="border-b bg-muted/30">
      <div className="container py-8 md:py-12">
        {breadcrumbs?.length ? (
          <nav className="mb-3 flex flex-wrap items-center gap-1 text-xs text-muted-foreground" aria-label="Ścieżka nawigacji">
            <Link href="/" className="hover:text-foreground">Strona główna</Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.href} className="flex items-center gap-1">
                <ChevronRight className="h-3.5 w-3.5" />
                <Link href={crumb.href} className="hover:text-foreground">{crumb.label}</Link>
              </span>
            ))}
          </nav>
        ) : null}
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
        {description ? <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p> : null}
      </div>
    </header>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:mt-1 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5">
      {children}
    </div>
  );
}
