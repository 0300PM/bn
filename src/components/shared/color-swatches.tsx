'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ColorVariant } from '@/lib/types';

type ColorSwatchesProps = {
  colors: ColorVariant[];
  activeSlug?: string;
  buildHref?: (color: ColorVariant) => string;
  onSelect?: (color: ColorVariant) => void;
  size?: 'sm' | 'md';
  className?: string;
  max?: number;
};

export function ColorSwatches({
  colors,
  activeSlug,
  buildHref,
  onSelect,
  size = 'sm',
  className,
  max,
}: ColorSwatchesProps) {
  const visible = max ? colors.slice(0, max) : colors;
  const rest = max ? colors.length - visible.length : 0;

  return (
    <div className={cn('flex flex-wrap items-center gap-1.5', className)}>
      {visible.map((color) => {
        const isActive = color.slug === activeSlug;
        const dot = (
          <span
            className={cn(
              'block rounded-full border border-black/10 shadow-sm transition',
              size === 'sm' ? 'h-3.5 w-3.5' : 'h-6 w-6',
            )}
            style={{ backgroundColor: color.hex }}
          />
        );
        const baseClass = cn(
          'grid place-items-center rounded-full transition ring-offset-2 ring-offset-background',
          size === 'sm' ? 'h-5 w-5' : 'h-8 w-8',
          isActive ? 'ring-1 ring-foreground' : 'hover:ring-1 hover:ring-border',
        );

        if (onSelect) {
          return (
            <button
              key={color.slug}
              type="button"
              onClick={() => onSelect(color)}
              className={baseClass}
              aria-label={color.name}
              aria-pressed={isActive}
              title={color.name}
            >
              {dot}
            </button>
          );
        }

        return (
          <Link
            key={color.slug}
            href={buildHref ? buildHref(color) : '#'}
            className={baseClass}
            aria-label={color.name}
            title={color.name}
            scroll={false}
          >
            {dot}
          </Link>
        );
      })}
      {rest > 0 ? <span className="text-xs text-muted-foreground">+{rest}</span> : null}
    </div>
  );
}
