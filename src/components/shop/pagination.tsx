'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type PaginationProps = { page: number; totalPages: number };

export function Pagination({ page, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const href = (target: number) => {
    const next = new URLSearchParams(searchParams.toString());
    if (target === 1) next.delete('page');
    else next.set('page', String(target));
    const query = next.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter(
    (item) => item === 1 || item === totalPages || Math.abs(item - page) <= 1,
  );

  return (
    <nav className="mt-10 flex items-center justify-center gap-1" aria-label="Stronicowanie">
      <Link
        href={href(Math.max(1, page - 1))}
        aria-disabled={page === 1}
        className={cn(
          'grid h-9 w-9 place-items-center rounded-md border transition hover:bg-muted',
          page === 1 && 'pointer-events-none opacity-40',
        )}
        aria-label="Poprzednia strona"
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {pages.map((item, index) => {
        const previous = pages[index - 1];
        const gap = previous && item - previous > 1;
        return (
          <span key={item} className="flex items-center gap-1">
            {gap ? <span className="px-1 text-muted-foreground">…</span> : null}
            <Link
              href={href(item)}
              aria-current={item === page ? 'page' : undefined}
              className={cn(
                'grid h-9 min-w-9 place-items-center rounded-md border px-2 text-sm transition hover:bg-muted',
                item === page && 'border-foreground bg-foreground text-background hover:bg-foreground',
              )}
            >
              {item}
            </Link>
          </span>
        );
      })}

      <Link
        href={href(Math.min(totalPages, page + 1))}
        aria-disabled={page === totalPages}
        className={cn(
          'grid h-9 w-9 place-items-center rounded-md border transition hover:bg-muted',
          page === totalPages && 'pointer-events-none opacity-40',
        )}
        aria-label="Następna strona"
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}
