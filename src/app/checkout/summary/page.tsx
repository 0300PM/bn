'use client';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ShoppingCart } from 'lucide-react';

export default function SummaryPage() {
    const { cart, cartTotal, itemCount } = useCart();
    const router = useRouter();

    if (itemCount === 0) {
        return (
            <div className="text-center py-20">
                <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
                <h1 className="mt-4 text-2xl font-bold">Twój koszyk jest pusty</h1>
                <p className="mt-2 text-muted-foreground">Wygląda na to, że nie masz żadnych produktów w koszyku.</p>
                <Button asChild className="mt-6">
                    <Link href="/">Wróć do sklepu</Link>
                </Button>
            </div>
        );
    }
    
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">1. Podsumowanie zamówienia</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Produkty w koszyku ({itemCount})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {cart.map(item => (
                            <div key={item.id} className="flex items-center gap-4">
                                <Image src={item.images[0].url} alt={item.name} width={80} height={80} className="rounded-md object-cover"/>
                                <div className="flex-grow">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">Ilość: {item.quantity}</p>
                                </div>
                                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <Separator className="my-6" />
                    <div className="space-y-2 text-right">
                        <p>Suma częściowa: <span className="font-medium">${cartTotal.toFixed(2)}</span></p>
                        <p>Wysyłka: <span className="font-medium">Darmowa</span></p>
                        <p className="text-xl font-bold">Do zapłaty: <span className="text-primary">${cartTotal.toFixed(2)}</span></p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button size="lg" onClick={() => router.push('/checkout/shipping')}>
                        Przejdź do wysyłki <ArrowRight className="ml-2" />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
