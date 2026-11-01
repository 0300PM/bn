import type { Metadata } from 'next';
import { PageHeader, Prose } from '@/components/shared/page-header';

export const metadata: Metadata = {
  title: 'Polityka prywatności',
  description: 'Jak przetwarzamy dane osobowe klientów BuyNest.',
};

export default function PrivacyPage() {
  return (
    <div>
      <PageHeader
        title="Polityka prywatności"
        description="Ostatnia aktualizacja: 1 listopada 2026."
        breadcrumbs={[{ href: '/privacy', label: 'Polityka prywatności' }]}
      />
      <div className="container py-10 md:py-14">
        <Prose>
          <h2>Administrator danych</h2>
          <p>
            Administratorem danych jest BuyNest Sp. z o.o., ul. Prosta 12, 00-850 Warszawa, NIP 5252891234.
            Kontakt w sprawach danych osobowych: iod@buynest.pl.
          </p>
          <h2>Zakres przetwarzania</h2>
          <ul>
            <li>Dane zamówienia: imię, nazwisko, adres, e-mail, telefon — w celu realizacji umowy.</li>
            <li>Dane rozliczeniowe: NIP, adres firmy — w celu wystawienia faktury.</li>
            <li>Dane marketingowe: e-mail — na podstawie zgody, do odwołania w każdej chwili.</li>
            <li>Dane techniczne: pliki cookies niezbędne do działania koszyka i listy życzeń.</li>
          </ul>
          <h2>Okres przechowywania</h2>
          <p>
            Dane zamówień przechowujemy 6 lat zgodnie z przepisami podatkowymi. Dane marketingowe do momentu
            wycofania zgody. Koszyk i lista życzeń w przeglądarce — do wyczyszczenia danych przez użytkownika.
          </p>
          <h2>Twoje prawa</h2>
          <p>
            Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia oraz
            wniesienia sprzeciwu. Skargę możesz złożyć do Prezesa UODO.
          </p>
          <h2>Pliki cookies</h2>
          <p>
            Używamy cookies niezbędnych (sesja, koszyk) oraz analitycznych w celach statystycznych. Nie stosujemy
            profilowania reklamowego poza naszym serwisem. Ustawienia zmienisz w przeglądarce.
          </p>
        </Prose>
      </div>
    </div>
  );
}
