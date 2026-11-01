export const SHIPPING = {
  freeThreshold: 2500,
  standardCost: 49,
  expressCost: 99,
} as const;

export type Coupon = {
  code: string;
  label: string;
  type: 'percent' | 'amount' | 'shipping';
  value: number;
  minimum: number;
};

export const COUPONS: Coupon[] = [
  { code: 'BUYNEST10', label: '−10% na całe zamówienie', type: 'percent', value: 10, minimum: 0 },
  { code: 'SALON200', label: '−200 zł od 2000 zł', type: 'amount', value: 200, minimum: 2000 },
  { code: 'DOSTAWA0', label: 'Darmowa dostawa', type: 'shipping', value: 0, minimum: 0 },
];

export const findCoupon = (code: string) =>
  COUPONS.find((coupon) => coupon.code === code.trim().toUpperCase()) ?? null;

export type CartLine = { slug: string; quantity: number };

export type TotalsInput = {
  subtotal: number;
  coupon: Coupon | null;
  express?: boolean;
};

export type Totals = {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  freeShippingRemaining: number;
  isFreeShipping: boolean;
};

export const calculateTotals = ({ subtotal, coupon, express = false }: TotalsInput): Totals => {
  const validCoupon = coupon && subtotal >= coupon.minimum ? coupon : null;
  const discount =
    validCoupon?.type === 'percent'
      ? Math.round(subtotal * (validCoupon.value / 100))
      : validCoupon?.type === 'amount'
        ? Math.min(validCoupon.value, subtotal)
        : 0;

  const baseShipping = subtotal >= SHIPPING.freeThreshold ? 0 : SHIPPING.standardCost;
  const expressFee = express ? SHIPPING.expressCost : 0;
  const shipping = validCoupon?.type === 'shipping' ? expressFee : baseShipping + expressFee;
  const afterDiscount = subtotal - discount;

  return {
    subtotal,
    discount,
    shipping,
    total: Math.max(0, afterDiscount + shipping),
    freeShippingRemaining: Math.max(0, SHIPPING.freeThreshold - subtotal),
    isFreeShipping: subtotal >= SHIPPING.freeThreshold,
  };
};

export const MAX_QUANTITY = 10;
