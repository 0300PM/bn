# BuyNest — klikalny prototyp sklepu z meblami

Nowoczesny, w pełni klikalny prototyp e-commerce zbudowany na Next.js 15 (App Router), React 18, TypeScript i Tailwind CSS. Paleta kolorów i komponenty UI pozostały bez zmian — prototyp rozwija oryginalny design system sklepu.

## Co jest w środku

- **Katalog 120 produktów** — 24 modele (sofy, fotele, stoły, oświetlenie) w pięciu wariantach kolorystycznych każdy, z ceną, oceną, opiniami, specyfikacją i stanem magazynowym.
- **Grafiki produktowe** — 360 renderów (widok główny, aranżacja, detal) generowanych z Warstwowego katalogu `src/lib/catalog/models.json` oraz zdjęcia lifestyle w `public/images`.
- **Sklep** (`/shop`) — filtrowanie po kategorii, podkategorii, kolorze, cenie, dostępności, ocenie i stylu; sortowanie, widok siatki/listy, aktywne filtry, paginacja, filtry mobilne w panelu bocznym.
- **Karta produktu** (`/product/[slug]`) — galeria z powiększeniem, wybór wariantu kolorystycznego, ilość, „kup teraz”, lista życzeń, porównanie, zakładki ze specyfikacją i opiniami, produkty podobne, ostatnio oglądane, dane strukturalne JSON-LD.
- **Koszyk i kasa** — trwały koszyk (localStorage), kody rabatowe, próg darmowej dostawy, formularz zamówienia z walidacją Zod, wybór dostawy i płatności, ekran potwierdzenia z numerem zamówienia.
- **Konto klienta** (`/dashboard`) — logowanie/rejestracja (demo), historia zamówień ze statusami, lista życzeń, kody rabatowe, program lojalnościowy, powiadomienia, ustawienia.
- **Dodatki** — wyszukiwarka z podpowiedziami (`⌘K`), szybki podgląd produktu, porównywarka, ostatnio oglądane, newsletter, baner cookies, tryb ciemny, menu mobilne z dolną nawigacją, sitemap i robots.

## Uruchomienie

```bash
npm install
npm run dev
```

Aplikacja działa na `http://localhost:9002`.

```bash
npm run build
npm run start
npm run typecheck
```

## Struktura

```
src/app/            trasy App Routera (strony sklepu, kasa, konto, treści)
src/components/     komponenty domenowe (produkty, sklep, koszyk, layout) + UI
src/contexts/       koszyk, lista życzeń, porównanie, ostatnio oglądane, zamówienia, autoryzacja
src/lib/            katalog produktów, zapytania, formatowanie, koszyk i rabaty
src/lib/catalog/    modele, manifest grafik i budowa katalogu
scripts/            generator grafik produktowych (SVG → JPEG)
public/products/    360 renderów produktów
public/images/      zdjęcia lifestyle, kategorie, hero
```

## Regeneracja grafik produktowych

```bash
node scripts/generate-product-images.mjs
```

Skrypt czyta `src/lib/catalog/models.json`, renderuje SVG dla każdego modelu i koloru, konwertuje do JPEG i zapisuje manifest `src/lib/catalog/images.json`.

## Dane demonstracyjne

Prototyp nie korzysta z backendu — koszyk, lista życzeń, porównanie i zamówienia są zapisywane w `localStorage`, a logowanie działa w trybie demo (dowolny e-mail i hasło, min. 4 znaki).
