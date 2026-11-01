'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData = [
    {
        question: "Jakie są dostępne metody płatności?",
        answer: "Akceptujemy płatności kartami kredytowymi i debetowymi (Visa, Mastercard), przelewy bankowe, BLIK oraz płatność przy odbiorze."
    },
    {
        question: "Ile wynosi czas oczekiwania na zamówienie?",
        answer: "Standardowy czas dostawy wynosi od 3 do 5 dni roboczych. Oferujemy również dostawę ekspresową w ciągu 1-2 dni roboczych za dodatkową opłatą."
    },
    {
        question: "Czy mogę zwrócić produkt, jeśli mi się nie spodoba?",
        answer: "Oczywiście! Masz 30 dni na zwrot produktu bez podawania przyczyny. Produkt nie może nosić śladów użytkowania i powinien być zwrócony w oryginalnym opakowaniu."
    },
    {
        question: "Jak mogę śledzić swoje zamówienie?",
        answer: "Po wysłaniu zamówienia otrzymasz od nas e-mail z linkiem do śledzenia przesyłki. Możesz również sprawdzić status zamówienia w panelu klienta w sekcji 'Moje zamówienia'."
    },
    {
        question: "Czy oferujecie gwarancję na produkty?",
        answer: "Tak, wszystkie nasze produkty objęte są 2-letnią gwarancją producenta. Szczegółowe informacje na temat gwarancji znajdziesz w opisie każdego produktu."
    },
    {
        question: "Czy jest możliwość montażu mebli?",
        answer: "Niektóre z naszych produktów wymagają montażu. Do każdego z nich dołączona jest szczegółowa instrukcja. Obecnie nie oferujemy usługi montażu, ale planujemy wprowadzić ją w przyszłości."
    }
]

export default function FAQPage() {
    return (
        <div className="container py-12 md:py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight">Często zadawane pytania (FAQ)</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Znajdź odpowiedzi na najczęściej zadawane pytania.
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                    {faqData.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-left font-semibold text-lg">{item.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
