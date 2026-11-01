'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreditCard, Landmark, Loader2, Lock, ShoppingBag, Truck, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/cart-context';
import { useOrders, toOrderItem } from '@/contexts/orders-context';
import { calculateTotals } from '@/lib/commerce';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';

const schema = z.object({
  email: z.string().email('Podaj poprawny adres e-mail.'),
  firstName: z.string().min(2, 'Podaj imię.'),
  lastName: z.string().min(2, 'Podaj nazwisko.'),
  phone: z.string().min(9, 'Podaj numer telefonu (min. 9 cyfr).'),
  street: z.string().min(5, 'Podaj ulicę i numer budynku.'),
  postalCode: z.string().regex(/^\d{2}-\d{3}$/, 'Format kodu: 00-000.'),
  city: z.string().min(2, 'Podaj miasto.'),
  notes: z.string().max(300).optional(),
  invoice: z.boolean().optional(),
  nip: z.string().optional(),
  terms: z.boolean().refine((value) => value, { message: 'Zaakceptuj regulamin i politykę prywatności.' }),
});

type FormValues = z.infer<typeof schema>;

const shippingMethods = [
  { id: 'standard', label: 'Dostawa standardowa', description: '2–4 dni robocze, wniesienie w cenie', icon: Truck },
  { id: 'express', label: 'Dostawa ekspresowa', description: '1–2 dni robocze, priorytetowa realizacja', icon: Loader2 },
  { id: 'pickup', label: 'Odbiór w showroomie', description: 'Warszawa, ul. Prosta 12 — dziś od 12:00', icon: ShoppingBag },
];

const paymentMethods = [
  { id: 'blik', label: 'BLIK', description: 'Kod BLIK z aplikacji banku', icon: Wallet },
  { id: 'card', label: 'Karta płatnicza', description: 'Visa, Mastercard, Apple Pay', icon: CreditCard },
  { id: 'transfer', label: 'Przelewy24', description: 'Szybki przelew online', icon: Landmark },
  { id: 'cod', label: 'Płatność przy odbiorze', description: 'Gotówka lub karta u kuriera', icon: Truck },
];

export function CheckoutForm() {
  const router = useRouter();
  const { lines, subtotal, coupon, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('blik');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { invoice: false, terms: false },
  });

  const totals = useMemo(
    () => calculateTotals({ subtotal, coupon, express: shippingMethod === 'express' }),
    [subtotal, coupon, shippingMethod],
  );
  const finalTotal = shippingMethod === 'pickup' ? totals.total - totals.shipping : totals.total;

  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    const order = placeOrder({
      items: lines.map((line) => toOrderItem(line.product, line.quantity)),
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: shippingMethod === 'pickup' ? 0 : totals.shipping,
      total: finalTotal,
      paymentMethod,
      shippingMethod,
      customer: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
      },
      address: {
        street: values.street,
        postalCode: values.postalCode,
        city: values.city,
        country: 'Polska',
      },
    });
    clearCart();
    router.push(`/checkout/confirmation?order=${order.id}`);
  };

  if (lines.length === 0) {
    return (
      <div className="py-20 text-center">
        <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Nie ma czego zamawiać</h1>
        <p className="mt-2 text-sm text-muted-foreground">Dodaj produkty do koszyka, aby przejść do kasy.</p>
        <Button asChild className="mt-6">
          <Link href="/shop">Przejdź do sklepu</Link>
        </Button>
      </div>
    );
  }

  const errors = form.formState.errors;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-[1fr_380px]" noValidate>
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-foreground text-xs text-background">1</span>
              Dane kontaktowe i dostawa
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" autoComplete="email" placeholder="jan@example.com" {...form.register('email')} />
              {errors.email ? <p className="mt-1 text-xs text-destructive">{errors.email.message}</p> : null}
            </div>
            <div>
              <Label htmlFor="firstName">Imię</Label>
              <Input id="firstName" autoComplete="given-name" {...form.register('firstName')} />
              {errors.firstName ? <p className="mt-1 text-xs text-destructive">{errors.firstName.message}</p> : null}
            </div>
            <div>
              <Label htmlFor="lastName">Nazwisko</Label>
              <Input id="lastName" autoComplete="family-name" {...form.register('lastName')} />
              {errors.lastName ? <p className="mt-1 text-xs text-destructive">{errors.lastName.message}</p> : null}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" type="tel" autoComplete="tel" placeholder="+48 600 000 000" {...form.register('phone')} />
              {errors.phone ? <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p> : null}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="street">Ulica i numer</Label>
              <Input id="street" autoComplete="street-address" {...form.register('street')} />
              {errors.street ? <p className="mt-1 text-xs text-destructive">{errors.street.message}</p> : null}
            </div>
            <div>
              <Label htmlFor="postalCode">Kod pocztowy</Label>
              <Input id="postalCode" autoComplete="postal-code" placeholder="00-001" {...form.register('postalCode')} />
              {errors.postalCode ? <p className="mt-1 text-xs text-destructive">{errors.postalCode.message}</p> : null}
            </div>
            <div>
              <Label htmlFor="city">Miasto</Label>
              <Input id="city" autoComplete="address-level2" {...form.register('city')} />
              {errors.city ? <p className="mt-1 text-xs text-destructive">{errors.city.message}</p> : null}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="notes">Uwagi do zamówienia (opcjonalnie)</Label>
              <Textarea id="notes" rows={2} placeholder="Kod do klatki, preferowany termin dostawy…" {...form.register('notes')} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-foreground text-xs text-background">2</span>
              Metoda dostawy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="grid gap-3 sm:grid-cols-3">
              {shippingMethods.map(({ id, label, description, icon: Icon }) => (
                <Label
                  key={id}
                  htmlFor={`shipping-${id}`}
                  className={cn(
                    'flex cursor-pointer flex-col gap-1 rounded-md border p-3 transition hover:border-foreground/30',
                    shippingMethod === id && 'border-foreground bg-muted/50',
                  )}
                >
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <RadioGroupItem value={id} id={`shipping-${id}`} />
                    <Icon className="h-4 w-4" /> {label}
                  </span>
                  <span className="text-xs text-muted-foreground">{description}</span>
                  <span className="text-xs font-semibold">
                    {id === 'pickup' ? '0 zł' : id === 'express' ? formatPrice(99) : totals.isFreeShipping ? 'Gratis' : formatPrice(49)}
                  </span>
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-foreground text-xs text-background">3</span>
              Płatność
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid gap-2 sm:grid-cols-2">
              {paymentMethods.map(({ id, label, description, icon: Icon }) => (
                <Label
                  key={id}
                  htmlFor={`payment-${id}`}
                  className={cn(
                    'flex cursor-pointer items-start gap-3 rounded-md border p-3 transition hover:border-foreground/30',
                    paymentMethod === id && 'border-foreground bg-muted/50',
                  )}
                >
                  <RadioGroupItem value={id} id={`payment-${id}`} className="mt-0.5" />
                  <span>
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <Icon className="h-4 w-4" /> {label}
                    </span>
                    <span className="block text-xs text-muted-foreground">{description}</span>
                  </span>
                </Label>
              ))}
            </RadioGroup>

            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" className="mt-0.5 h-3.5 w-3.5 accent-accent" {...form.register('invoice')} />
              Chcę fakturę na firmę (dane uzupełnisz w następnym kroku)
            </label>

            <div className="rounded-md border bg-muted/40 p-3">
              <label className="flex items-start gap-2 text-xs">
                <input type="checkbox" className="mt-0.5 h-3.5 w-3.5 accent-accent" {...form.register('terms')} />
                <span>
                  Akceptuję <Link href="/terms" className="underline">regulamin</Link> oraz{' '}
                  <Link href="/privacy" className="underline">politykę prywatności</Link>.
                </span>
              </label>
              {errors.terms ? <p className="mt-1 text-xs text-destructive">{errors.terms.message}</p> : null}
            </div>
          </CardContent>
        </Card>
      </div>

      <aside className="space-y-4">
        <Card className="sticky top-24">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Twoje zamówienie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="max-h-64 space-y-3 overflow-y-auto pr-1">
              {lines.map(({ product, quantity, lineTotal }) => (
                <li key={product.slug} className="flex items-center gap-3">
                  <Image
                    src={product.images[0]?.url ?? ''}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded border object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.activeColor.name} · {quantity} szt.
                    </p>
                  </div>
                  <span className="text-sm font-semibold">{formatPrice(lineTotal)}</span>
                </li>
              ))}
            </ul>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Produkty</span>
                <span>{formatPrice(totals.subtotal)}</span>
              </div>
              {totals.discount > 0 ? (
                <div className="flex justify-between text-accent">
                  <span>Rabat ({coupon?.code})</span>
                  <span>−{formatPrice(totals.discount)}</span>
                </div>
              ) : null}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dostawa</span>
                <span>{shippingMethod === 'pickup' ? 'Odbiór osobisty' : totals.shipping === 0 ? 'Gratis' : formatPrice(totals.shipping)}</span>
              </div>
              <Separator />
              <div className="flex items-baseline justify-between">
                <span className="font-semibold">Do zapłaty</span>
                <span className="text-xl font-bold">{formatPrice(finalTotal)}</span>
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
              Zapłać i złóż zamówienie
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Płatność szyfrowana SSL. Nie pobieramy danych karty — obsługę przejmuje operator płatności.
            </p>
          </CardContent>
        </Card>
      </aside>
    </form>
  );
}
