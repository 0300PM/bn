import React from 'react';
import Link from 'next/link';
import { Sofa, Mail, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageSwitcher: React.FC = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    Polski
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>Polski</DropdownMenuItem>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Deutsch</DropdownMenuItem>
                <DropdownMenuItem>Русский</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};


export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 pr-8">
             <Link href="/" className="flex items-center space-x-2 mb-4">
              <Sofa className="h-6 w-6 text-foreground" />
              <span className="font-bold text-lg text-foreground">BuyNest</span>
            </Link>
            <p className="text-sm mb-6">Minimalistyczny, nowoczesny sklep, w którym znajdziesz inspiracje do swojego wnętrza.</p>
            <h3 className="font-semibold text-foreground mb-3">Zapisz się do newslettera</h3>
            <p className="text-sm mb-3">Otrzymuj informacje o nowościach i specjalnych promocjach.</p>
            <form className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Twój adres email" />
                <Button type="submit">
                    <Mail className="h-4 w-4" />
                </Button>
            </form>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Sklep</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#products" className="hover:text-foreground">Produkty</Link></li>
              <li><Link href="/categories" className="hover:text-foreground">Kategorie</Link></li>
              <li><Link href="#" className="hover:text-foreground">Nowości</Link></li>
              <li><Link href="#" className="hover:text-foreground">Promocje</Link></li>
              <li><Link href="/dashboard/discounts" className="hover:text-foreground">Kody Rabatowe</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Pomoc i Informacje</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-foreground">Kontakt</Link></li>
              <li><Link href="/help-center" className="hover:text-foreground">Centrum Pomocy</Link></li>
              <li><Link href="/shipping-returns" className="hover:text-foreground">Dostawa i zwroty</Link></li>
              <li><Link href="/faq" className="hover:text-foreground">FAQ</Link></li>
              <li><Link href="#" className="hover:text-foreground">Śledź przesyłkę</Link></li>
              <li><Link href="#" className="hover:text-foreground">Reklamacje</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">O BuyNest</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-foreground">O nas</Link></li>
              <li><Link href="#" className="hover:text-foreground">Kariera w BuyNest</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">Regulamin sklepu</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground">Polityka Prywatności</Link></li>
              <li><Link href="#" className="hover:text-foreground">Informacje prawne</Link></li>
               <li><Link href="#" className="hover:text-foreground">Dane firmy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-center text-sm">&copy; {new Date().getFullYear()} BuyNest. Wszelkie prawa zastrzeżone.</p>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
