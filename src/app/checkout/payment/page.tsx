'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, CreditCard, Landmark, Truck } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/cart-context';

export default function PaymentPage() {
    const router = useRouter();
    const { clearCart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isLoading, setIsLoading] = useState(false);

    const handlePlaceOrder = () => {
        setIsLoading(true);
        // Simulate API call to place order
        setTimeout(() => {
            const orderId = `BUN-${Date.now()}`;
            clearCart();
            router.push(`/checkout/confirmation?orderId=${orderId}`);
        }, 1500);
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">3. Metoda płatności</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Wybierz płatność</CardTitle>
                    <CardDescription>Wybierz preferowaną metodę płatności, aby sfinalizować zamówienie.</CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                        <Label htmlFor="card" className="flex items-center p-4 border rounded-md cursor-pointer has-[:checked]:border-primary">
                            <RadioGroupItem value="card" id="card" className="mr-4" />
                            <CreditCard className="mr-3" />
                            <span>Karta kredytowa / debetowa</span>
                        </Label>
                        <Label htmlFor="blik" className="flex items-center p-4 border rounded-md cursor-pointer has-[:checked]:border-primary">
                            <RadioGroupItem value="blik" id="blik" className="mr-4" />
                            <Landmark className="mr-3" />
                            <span>Przelew bankowy / BLIK</span>
                        </Label>
                        <Label htmlFor="cod" className="flex items-center p-4 border rounded-md cursor-pointer has-[:checked]:border-primary">
                            <RadioGroupItem value="cod" id="cod" className="mr-4" />
                            <Truck className="mr-3" />
                            <span>Płatność przy odbiorze</span>
                        </Label>
                    </RadioGroup>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => router.back()}>
                        <ArrowLeft className="mr-2" /> Wróć
                    </Button>
                    <Button size="lg" onClick={handlePlaceOrder} disabled={isLoading}>
                        {isLoading ? 'Przetwarzanie...' : 'Złóż zamówienie'}
                        {!isLoading && <ArrowRight className="ml-2" />}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
