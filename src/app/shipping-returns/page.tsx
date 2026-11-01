'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Package, RefreshCw, Truck } from "lucide-react";

export default function ShippingReturnsPage() {
    return (
        <div className="container py-12 md:py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight">Dostawa i Zwroty</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Wszystko, co musisz wiedzieć o wysyłce i zwrotach w BuyNest.
                </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
                <Accordion type="multiple" defaultValue={['shipping', 'returns']} className="w-full">
                    <AccordionItem value="shipping">
                        <AccordionTrigger className="text-2xl font-semibold">
                            <div className="flex items-center gap-3">
                                <Truck className="h-6 w-6" />
                                Opcje Dostawy
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 prose max-w-none prose-p:text-muted-foreground">
                            <p>Oferujemy kilka opcji dostawy, aby zapewnić wygodę i szybkość:</p>
                            <ul>
                                <li><strong>Dostawa standardowa (3-5 dni roboczych):</strong> Darmowa dla wszystkich zamówień.</li>
                                <li><strong>Dostawa ekspresowa (1-2 dni robocze):</strong> Dostępna za dodatkową opłatą w wysokości 19.99 zł.</li>
                                <li><strong>Odbiór w punkcie:</strong> Możliwość odbioru w wybranych punktach partnerskich (InPost, Żabka, Orlen).</li>
                            </ul>
                            <p>Wszystkie nasze przesyłki są ubezpieczone i starannie zapakowane, aby dotarły do Ciebie w nienaruszonym stanie.</p>
                        </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="packaging">
                        <AccordionTrigger className="text-2xl font-semibold">
                           <div className="flex items-center gap-3">
                                <Package className="h-6 w-6" />
                                Śledzenie Zamówienia
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 prose max-w-none prose-p:text-muted-foreground">
                            <p>Po złożeniu zamówienia otrzymasz e-mail z potwierdzeniem oraz linkiem do śledzenia przesyłki. Dzięki temu będziesz mógł na bieżąco monitorować status dostawy.</p>
                            <p>Status zamówienia możesz również sprawdzić w panelu klienta w sekcji "Moje zamówienia".</p>
                        </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="returns">
                        <AccordionTrigger className="text-2xl font-semibold">
                             <div className="flex items-center gap-3">
                                <RefreshCw className="h-6 w-6" />
                                Polityka Zwrotów
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 prose max-w-none prose-p:text-muted-foreground">
                            <p>Twoje zadowolenie jest dla nas priorytetem. Jeśli z jakiegoś powodu produkt nie spełnia Twoich oczekiwań, masz <strong>30 dni</strong> na jego zwrot bez podawania przyczyny.</p>
                            <h4>Jak dokonać zwrotu?</h4>
                            <ol>
                                <li>Zaloguj się na swoje konto i przejdź do sekcji "Moje zamówienia".</li>
                                <li>Wybierz zamówienie, które chcesz zwrócić i kliknij "Zwróć produkty".</li>
                                <li>Postępuj zgodnie z instrukcjami, aby wygenerować etykietę zwrotną.</li>
                                <li>Zapakuj produkt i nadaj przesyłkę w dowolnym punkcie przewoźnika.</li>
                            </ol>
                            <p>Zwrot środków nastąpi w ciągu 14 dni od otrzymania przez nas przesyłki. Pamiętaj, że zwracany towar nie może nosić śladów użytkowania i powinien posiadać oryginalne opakowanie.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
