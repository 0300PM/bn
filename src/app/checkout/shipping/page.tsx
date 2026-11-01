import { redirect } from 'next/navigation';

export default function LegacyCheckoutStep() {
  redirect('/checkout');
}
