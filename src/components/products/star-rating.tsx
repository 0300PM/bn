import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type StarRatingProps = {
  rating: number;
  className?: string;
  starClassName?: string;
  showValue?: boolean;
};

export function StarRating({ rating, className, starClassName, showValue }: StarRatingProps) {
  return (
    <span className={cn('inline-flex items-center gap-1', className)} aria-label={`Ocena ${rating} na 5`}>
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => {
          const fill = Math.min(1, Math.max(0, rating - index));
          return (
            <span key={index} className="relative inline-block">
              <Star className={cn('h-4 w-4 text-muted-foreground/30', starClassName)} />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star className={cn('h-4 w-4 fill-accent text-accent', starClassName)} />
              </span>
            </span>
          );
        })}
      </span>
      {showValue ? <span className="text-sm font-medium tabular-nums">{rating.toFixed(1)}</span> : null}
    </span>
  );
}
