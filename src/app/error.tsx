'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-2xl font-bold">Coś poszło nie tak</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Nie udało się wczytać tej sekcji. Spróbuj ponownie — jeśli problem się powtarza, napisz na pomoc@buynest.pl.
      </p>
      <div className="mt-6 flex gap-2">
        <Button onClick={reset}>
          <RefreshCw className="mr-2 h-4 w-4" /> Spróbuj ponownie
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Wróć na stronę główną</Link>
        </Button>
      </div>
    </div>
  );
}
