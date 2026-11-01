'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { searchProducts } from '@/lib/products';
import { formatPrice } from '@/lib/format';

const POPULAR = ['sofa modułowa', 'fotel bouclé', 'lampa podłogowa', 'stół dębowy'];

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const results = useMemo(() => (query.trim().length > 1 ? searchProducts(query, 5) : []), [query]);

  const goToResults = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    onOpenChange(false);
    router.push(value ? `/shop?q=${encodeURIComponent(value)}` : '/shop');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[12%] max-w-2xl translate-y-0 gap-0 p-0">
        <DialogTitle className="sr-only">Szukaj produktów</DialogTitle>
        <form onSubmit={goToResults} className="border-b p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Szukaj mebli, lamp, materiałów…"
              className="h-11 border-0 pl-9 shadow-none focus-visible:ring-0"
              aria-label="Szukaj produktów"
            />
          </div>
        </form>

        <div className="max-h-[60vh] overflow-y-auto p-3">
          {query.trim().length < 2 ? (
            <div className="space-y-3 p-2">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5" /> Popularne wyszukiwania
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuery(item)}
                    className="rounded-full border px-3 py-1.5 text-sm transition hover:border-foreground/30 hover:bg-muted"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">
              Brak wyników dla „{query}”. Spróbuj innej frazy.
            </p>
          ) : (
            <ul className="space-y-1">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={() => onOpenChange(false)}
                    className="flex items-center gap-3 rounded-md p-2 transition hover:bg-muted"
                  >
                    <Image
                      src={product.images[0]?.url ?? ''}
                      alt=""
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{product.name}</span>
                      <span className="block text-xs text-muted-foreground">{product.activeColor.name}</span>
                    </span>
                    <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
