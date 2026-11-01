const priceFormatter = new Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const preciseFormatter = new Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat('pl-PL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export const formatPrice = (value: number) => priceFormatter.format(value).replace('\u00a0', ' ');

export const formatPricePrecise = (value: number) => preciseFormatter.format(value).replace('\u00a0', ' ');

export const formatDate = (value: string) => dateFormatter.format(new Date(value));

export const formatDiscount = (price: number, compareAtPrice?: number) =>
  compareAtPrice ? Math.round((1 - price / compareAtPrice) * 100) : 0;

export const formatDimensions = (dimensions: { width: number; depth: number; height: number }) =>
  `${dimensions.width} × ${dimensions.depth} × ${dimensions.height} cm`;

export const formatCount = (value: number) => new Intl.NumberFormat('pl-PL').format(value);
