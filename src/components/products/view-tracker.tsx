'use client';

import { useEffect } from 'react';
import { useRecentlyViewed } from '@/contexts/recently-viewed-context';

export function ViewTracker({ slug }: { slug: string }) {
  const { track } = useRecentlyViewed();

  useEffect(() => {
    track(slug);
  }, [slug]);

  return null;
}
