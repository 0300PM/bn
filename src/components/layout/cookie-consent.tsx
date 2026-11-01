'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useMounted } from '@/hooks/use-mounted';

const STORAGE_KEY = 'buynest.cookies.v1';

export function CookieConsent() {
  const mounted = useMounted();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    setVisible(!window.localStorage.getItem(STORAGE_KEY));
  }, [mounted]);

  const decide = (value: 'all' | 'necessary') => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-20 z-40 mx-auto max-w-3xl rounded-lg border bg-background/95 p-4 shadow-lg backdrop-blur md:bottom-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground sm:text-sm">
          Używamy plików cookies, żeby koszyk i lista życzeń działały poprawnie. Szczegóły w{' '}
          <Link href="/privacy" className="text-foreground underline">
            polityce prywatności
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="ghost" size="sm" onClick={() => decide('necessary')}>
            Tylko niezbędne
          </Button>
          <Button size="sm" onClick={() => decide('all')}>
            Akceptuję wszystkie
          </Button>
        </div>
      </div>
    </div>
  );
}
