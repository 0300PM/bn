'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const groups = [
  {
    title: 'Zamówienia i płatności',
    items: [
      { q: 'Jakie metody płatności są dostępne?', a: 'BLIK, karta (Visa, Mastercard, Apple Pay), Przelewy24 oraz płatność przy odbiorze do 4000 zł. Raty 0% do 12 miesięcy uruchamiasz w kasie.' },
      { q: 'Czy mogę zmienić zamówienie po złożeniu?', a: 'Tak, jeśli nie zostało jeszcze spakowane. Napisz na pomoc@buynest.pl lub zadzwoń 800 123 456 — zwykle odpowiadamy w godzinę.' },
      { q: 'Czy otrzymam fakturę VAT?', a: 'Tak. W kasie zaznacz „Chcę fakturę na firmę” i podaj NIP. Faktura trafia na e-mail w ciągu 24 h od wysyłki.' },
    ],
  },
  {
    title: 'Dostawa',
    items: [
      { q: 'Ile trwa dostawa?', a: 'Standardowo 2–4 dni robocze, ekspresowa 1–2 dni. Meble na zamówienie: około 3 tygodni — termin widzisz na karcie produktu.' },
      { q: 'Czy dostawa jest darmowa?', a: 'Dla zamówień powyżej 2500 zł dostawa jest bezpłatna, łącznie z wniesieniem. Poniżej tej kwoty koszt wynosi 49 zł.' },
      { q: 'Czy kurier wniesie meble do mieszkania?', a: 'Tak, standardowa dostawa obejmuje wniesienie do pomieszczenia. Montaż oferujemy gratis w Warszawie, Krakowie, Wrocławiu i Gdańsku.' },
    ],
  },
  {
    title: 'Zwroty i gwarancja',
    items: [
      { q: 'Ile mam czasu na zwrot?', a: '60 dni od otrzymania przesyłki, bez podawania przyczyny. Odbiór organizujemy sami — zgłaszasz zwrot w panelu klienta.' },
      { q: 'Jaka jest gwarancja?', a: '5 lat na konstrukcję mebli i 2 lata na oświetlenie. Przez 10 lat wysyłamy części zamienne do naszych modeli.' },
      { q: 'Co jeśli produkt dotarł uszkodzony?', a: 'Zrób zdjęcia i zgłoś reklamację w panelu. Nowy element wysyłamy w 48 h, a uszkodzony odbieramy na nasz koszt.' },
    ],
  },
];

export default function FaqPage() {
  return (
    <div>
      <PageHeader
        title="Najczęstsze pytania"
        description="Zebraliśmy odpowiedzi na pytania, które dostajemy najczęściej. Nie znalazłeś swojego? Napisz do nas."
        breadcrumbs={[{ href: '/faq', label: 'FAQ' }]}
      />
      <div className="container max-w-4xl space-y-8 py-10 md:py-14">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="mb-3 text-lg font-semibold">{group.title}</h2>
            <Accordion type="single" collapsible className="rounded-lg border bg-card px-4">
              {group.items.map((item) => (
                <AccordionItem key={item.q} value={item.q}>
                  <AccordionTrigger className="text-left text-sm font-medium">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}

        <div className="flex flex-col items-start justify-between gap-3 rounded-lg border bg-muted/40 p-5 sm:flex-row sm:items-center">
          <p className="text-sm">Nadal masz pytanie? Nasz zespół odpowiada w 24 godziny.</p>
          <Button asChild>
            <Link href="/contact">Napisz do nas</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
