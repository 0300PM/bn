'use client';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function CartPage() {
    const { cart, cartTotal, itemCount, updateQuantity, removeFromCart } = useCart();
    const router = useRouter();

    if (itemCount === 0) {
        return (
            <div className="container text-center py-20">
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
        <div className="container py-12">
            <h1 className="text-3xl font-bold mb-8">Twój koszyk</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Produkty w koszyku ({itemCount})</CardTitle>
                        </CardHeader>
                        <CardContent className="divide-y">
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center gap-4 py-4">
                                    <Image src={item.images[0].url} alt={item.name} width={100} height={100} className="rounded-md object-cover"/>
                                    <div className="flex-grow">
                                        <Link href={`/product/${item.slug}`} className="font-medium hover:underline">{item.name}</Link>
                                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <Input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => {
                                                const quantity = parseInt(e.target.value, 10);
                                                if (!isNaN(quantity) && quantity > 0) {
                                                    updateQuantity(item.id, quantity)
                                                }
                                            }}
                                            className="w-16 text-center"
                                        />
                                        <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="font-semibold w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                                    <Button size="icon" variant="ghost" className="text-muted-foreground" onClick={() => removeFromCart(item.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                     <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>Podsumowanie</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span>Suma częściowa</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Wysyłka</span>
                                <span className="font-medium">Darmowa</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Do zapłaty</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button size="lg" className="w-full" onClick={() => router.push('/checkout')}>Przejdź do kasy</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
