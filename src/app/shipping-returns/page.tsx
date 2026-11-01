import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader, Prose } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Dostawa i zwroty',
  description: 'Koszty dostawy, terminy, wniesienie mebli oraz zasady zwrotów i reklamacji.',
};

export default function ShippingReturnsPage() {
  return (
    <div>
      <PageHeader
        title="Dostawa i zwroty"
        description="Przejrzyste zasady: dostawa od 49 zł, darmowa od 2500 zł, 60 dni na zwrot i odbiór po naszej stronie."
        breadcrumbs={[{ href: '/shipping-returns', label: 'Dostawa i zwroty' }]}
      />
      <div className="container py-10 md:py-14">
        <Prose>
          <h2>Koszty i terminy dostawy</h2>
          <ul>
            <li><strong>Standardowa:</strong> 49 zł, darmowa od 2500 zł, 2–4 dni robocze.</li>
            <li><strong>Ekspresowa:</strong> 99 zł, dostawa 1–2 dni robocze (zamówienie do 12:00).</li>
            <li><strong>Odbiór w showroomie:</strong> bezpłatny, Warszawa ul. Prosta 12, tego samego dnia od 12:00.</li>
            <li><strong>Meble na zamówienie:</strong> około 3 tygodni, termin potwierdzamy e-mailem.</li>
          </ul>

          <h2>Wniesienie i montaż</h2>
          <p>
            Standardowa dostawa obejmuje wniesienie mebla do wskazanego pomieszczenia. Montaż jest bezpłatny w
            Warszawie, Krakowie, Wrocławiu i Gdańsku. W pozostałych miastach kosztuje 149 zł i można go dodać w koszyku.
          </p>

          <h2>Zwroty</h2>
          <p>
            Masz 60 dni od dostawy na zwrot bez podania przyczyny. Zgłoszenie przyjmujemy w panelu klienta lub przez
            formularz kontaktowy. Odbiór przesyłki organizujemy sami, a zwrot środków następuje w ciągu 5 dni roboczych
            od odebrania paczki. Produkt powinien być kompletny i bez śladów użytkowania.
          </p>

          <h2>Reklamacje</h2>
          <p>
            Jeśli produkt dotarł uszkodzony lub ma wadę, zgłoś to w ciągu 14 dni. Do zgłoszenia dołącz zdjęcia —
            rozpatrujemy sprawę w 7 dni roboczych. Drobne części zamienne wysyłamy w 48 h na nasz koszt.
          </p>

          <h2>Śledzenie przesyłki</h2>
          <p>
            Numer listu przewozowego znajdziesz w e-mailu z potwierdzeniem wysyłki oraz w{' '}
            <Link href="/dashboard/orders" className="text-foreground underline">panelu klienta</Link>.
          </p>
        </Prose>
        <div className="mt-10 flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/shop">Wróć do sklepu</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Zgłoś zwrot</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
