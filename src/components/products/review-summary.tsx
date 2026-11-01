import { CheckCircle2, ThumbsUp } from 'lucide-react';
import { StarRating } from '@/components/products/star-rating';
import { Progress } from '@/components/ui/progress';
import { formatDate } from '@/lib/format';
import type { Review } from '@/lib/types';

const distribution = (reviews: Review[]) =>
  [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((review) => review.rating === stars).length,
  }));

export function ReviewSummary({ rating, reviewCount, reviews }: { rating: number; reviewCount: number; reviews: Review[] }) {
  const buckets = distribution(reviews);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <div className="space-y-3 rounded-lg border bg-card p-5">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold">{rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">/ 5</span>
        </div>
        <StarRating rating={rating} starClassName="h-4 w-4" />
        <p className="text-xs text-muted-foreground">Na podstawie {reviewCount} opinii klientów</p>
        <div className="space-y-1.5 pt-2">
          {buckets.map((bucket) => (
            <div key={bucket.stars} className="flex items-center gap-2 text-xs">
              <span className="w-8 shrink-0 text-muted-foreground">{bucket.stars}★</span>
              <Progress
                value={reviews.length ? (bucket.count / reviews.length) * 100 : 0}
                className="h-1.5"
              />
              <span className="w-5 shrink-0 text-right text-muted-foreground">{bucket.count}</span>
            </div>
          ))}
        </div>
        <p className="pt-2 text-xs text-muted-foreground">
          <CheckCircle2 className="mr-1 inline h-3.5 w-3.5 text-accent" />
          Wszystkie opinie pochodzą od zweryfikowanych zamówień.
        </p>
      </div>

      <ul className="space-y-5">
        {reviews.map((review) => (
          <li key={review.id} className="border-b pb-5 last:border-none">
            <div className="flex flex-wrap items-center gap-2">
              <StarRating rating={review.rating} starClassName="h-3.5 w-3.5" />
              <span className="text-sm font-semibold">{review.title}</span>
              {review.verified ? (
                <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  Zakup potwierdzony
                </span>
              ) : null}
              <span className="ml-auto text-xs text-muted-foreground">{formatDate(review.date)}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{review.text}</p>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{review.author}</span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-3 w-3" /> Pomocna ({review.helpful})
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
