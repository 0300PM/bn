import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Badge as BadgeType } from '@/lib/types';

const BADGE_LABELS: Record<BadgeType, string> = {
  nowosc: 'Nowość',
  bestseller: 'Bestseller',
  promocja: 'Promocja',
  eko: 'Eko',
};

const BADGE_STYLES: Record<BadgeType, string> = {
  nowosc: 'bg-accent text-accent-foreground border-transparent',
  bestseller: 'bg-foreground text-background border-transparent',
  promocja: 'bg-primary text-primary-foreground border-transparent',
  eko: 'bg-background/90 text-accent border-accent/40',
};

export function ProductBadges({ badges, className }: { badges: BadgeType[]; className?: string }) {
  if (!badges.length) return null;
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {badges.slice(0, 2).map((badge) => (
        <Badge key={badge} className={cn('px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide', BADGE_STYLES[badge])}>
          {BADGE_LABELS[badge]}
        </Badge>
      ))}
    </div>
  );
}

export const badgeLabel = (badge: BadgeType) => BADGE_LABELS[badge];
