import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  className?: string;
  starClassName?: string;
}

export function StarRating({ rating, className, starClassName }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center", className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className={cn("h-4 w-4 text-yellow-400 fill-yellow-400", starClassName)} />
      ))}
      {halfStar && (
        <div className="relative">
          <Star className={cn("h-4 w-4 text-yellow-400", starClassName)} />
          <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
             <Star className={cn("h-4 w-4 text-yellow-400 fill-yellow-400", starClassName)} />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className={cn("h-4 w-4 text-gray-300 fill-gray-300", starClassName)} />
      ))}
    </div>
  );
}
