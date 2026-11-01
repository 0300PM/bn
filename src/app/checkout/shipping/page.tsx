'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const shippingSchema = z.object({
    firstName: z.string().min(2, "Imię musi mieć co najmniej 2 znaki."),
    lastName: z.string().min(2, "Nazwisko musi mieć co najmniej 2 znaki."),
    address: z.string().min(5, "Adres musi mieć co najmniej 5 znaków."),
    city: z.string().min(2, "Miasto musi mieć co najmniej 2 znaki."),
    zipCode: z.string().regex(/^\d{2}-\d{3}$/, "Nieprawidłowy kod pocztowy (format: XX-XXX)."),
    country: z.string().min(2, "Kraj musi mieć co najmniej 2 znaki."),
    phone: z.string().min(9, "Telefon musi mieć co najmniej 9 cyfr.").optional(),
});

export default function ShippingPage() {
    const router = useRouter();
    const form = useForm<z.infer<typeof shippingSchema>>({
        resolver: zodResolver(shippingSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            zipCode: '',
            country: 'Polska',
            phone: '',
        }
    });

    function onSubmit(values: z.infer<typeof shippingSchema>) {
        console.log('Shipping details:', values);
        // Here you would typically save shipping data to state or context
        router.push('/checkout/payment');
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">2. Dane do wysyłki</h1>
            <Card>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardHeader>
                            <CardTitle>Adres dostawy</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="firstName" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Imię</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                             <FormField control={form.control} name="lastName" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nazwisko</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="address" render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Adres</FormLabel>
                                    <FormControl><Input placeholder="Ulica i numer domu" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="city" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Miasto</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="zipCode" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kod pocztowy</FormLabel>
                                    <FormControl><Input placeholder="00-000" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="country" render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Kraj</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                             <FormField control={form.control} name="phone" render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Telefon (opcjonalnie)</FormLabel>
                                    <FormControl><Input type="tel" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                             <Button variant="outline" onClick={() => router.back()}>
                                <ArrowLeft className="mr-2" /> Wróć
                            </Button>
                            <Button size="lg" type="submit">
                                Przejdź do płatności <ArrowRight className="ml-2" />
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
