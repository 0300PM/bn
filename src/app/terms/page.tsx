import type { Metadata } from 'next';
import { PageHeader, Prose } from '@/components/shared/page-header';

export const metadata: Metadata = {
  title: 'Regulamin',
  description: 'Regulamin zakupów w sklepie internetowym BuyNest.',
};

export default function TermsPage() {
  return (
    <div>
      <PageHeader
        title="Regulamin sklepu"
        description="Obowiązuje od 1 listopada 2026. Zakupy w BuyNest są proste — te zasady opisują szczegóły."
        breadcrumbs={[{ href: '/terms', label: 'Regulamin' }]}
      />
      <div className="container py-10 md:py-14">
        <Prose>
          <h2>1. Postanowienia ogólne</h2>
          <p>
            Sklep internetowy buynest.pl prowadzi BuyNest Sp. z o.o. z siedzibą w Warszawie. Kontakt: pomoc@buynest.pl,
            tel. 800 123 456.
          </p>
          <h2>2. Zamówienia</h2>
          <p>
            Zamówienie uznajemy za przyjęte po potwierdzeniu płatności lub wyborze płatności przy odbiorze. Ceny w
            sklepie są cenami brutto w złotych i zawierają VAT.
          </p>
          <h2>3. Dostawa</h2>
          <p>
            Koszt dostawy standardowej wynosi 49 zł i jest bezpłatny dla zamówień powyżej 2500 zł. Termin realizacji
            to 2–4 dni roboczych dla produktów dostępnych w magazynie.
          </p>
          <h2>4. Prawo odstąpienia</h2>
          <p>
            Konsument może odstąpić od umowy w ciągu 60 dni od dostawy bez podania przyczyny. Produkt należy zwrócić
            kompletny, bez śladów użytkowania. Koszt odbioru pokrywa sprzedawca.
          </p>
          <h2>5. Gwarancja i reklamacje</h2>
          <p>
            Udzielamy 5 lat gwarancji na konstrukcję mebli i 2 lata na oświetlenie. Reklamacje rozpatrujemy w 7 dni
            roboczych od zgłoszenia wraz z dokumentacją zdjęciową.
          </p>
          <h2>6. Ochrona danych</h2>
          <p>
            Zasady przetwarzania danych opisuje polityka prywatności dostępna w stopce serwisu.
          </p>
        </Prose>
      </div>
    </div>
  );
}
