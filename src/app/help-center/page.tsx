'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LifeBuoy } from "lucide-react";

const helpSchema = z.object({
  name: z.string().min(2, "Imię jest wymagane."),
  email: z.string().email("Nieprawidłowy adres email."),
  orderId: z.string().optional(),
  message: z.string().min(10, "Wiadomość musi mieć co najmniej 10 znaków."),
});

export default function HelpCenterPage() {
    const form = useForm<z.infer<typeof helpSchema>>({
        resolver: zodResolver(helpSchema),
        defaultValues: {
            name: "",
            email: "",
            orderId: "",
            message: "",
        },
    });

    function onSubmit(values: z.infer<typeof helpSchema>) {
        console.log("Help request:", values);
        alert("Twoje zapytanie zostało wysłane. Skontaktujemy się z Tobą wkrótce!");
        form.reset();
    }

    return (
        <div className="container py-12 md:py-16">
            <div className="max-w-xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <LifeBuoy className="mx-auto h-12 w-12 text-primary" />
                        <CardTitle className="mt-4">Centrum Pomocy</CardTitle>
                        <CardDescription>
                            Masz problem lub pytanie? Wypełnij formularz poniżej, a nasz zespół wsparcia skontaktuje się z Tobą najszybciej jak to możliwe.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <FormField control={form.control} name="name" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Twoje imię</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Twój e-mail</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                </div>
                                <FormField control={form.control} name="orderId" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Numer zamówienia (opcjonalnie)</FormLabel>
                                        <FormControl><Input placeholder="np. BUN-123456789" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="message" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Jak możemy Ci pomóc?</FormLabel>
                                        <FormControl><Textarea rows={6} placeholder="Opisz swój problem lub pytanie..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <Button type="submit" className="w-full">Wyślij zapytanie</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
