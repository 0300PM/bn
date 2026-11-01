'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Imię musi mieć co najmniej 2 znaki."),
  email: z.string().email("Nieprawidłowy adres email."),
  subject: z.string().min(3, "Temat musi mieć co najmniej 3 znaki."),
  message: z.string().min(10, "Wiadomość musi mieć co najmniej 10 znaków."),
});

export default function ContactPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        // Here you would handle form submission, e.g., send an email
        alert("Wiadomość wysłana! Dziękujemy za kontakt.");
        form.reset();
    }

    return (
        <div className="container py-12 md:py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight">Skontaktuj się z nami</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Masz pytania? Chętnie na nie odpowiemy.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-2xl font-bold mb-6">Informacje kontaktowe</h2>
                    <div className="space-y-6 text-muted-foreground">
                        <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold text-foreground">Adres</h3>
                                <p>ul. Przykładowa 123</p>
                                <p>00-001 Warszawa, Polska</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Phone className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold text-foreground">Telefon</h3>
                                <p>+48 123 456 789</p>
                                <p>Pn-Pt, 9:00 - 17:00</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Mail className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold text-foreground">Email</h3>
                                <p>kontakt@buynest.pl</p>
                                <p>Odpowiadamy w ciągu 24 godzin</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Wyślij nam wiadomość</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Imię</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="subject" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Temat</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="message" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Wiadomość</FormLabel>
                                        <FormControl><Textarea rows={5} {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <Button type="submit" className="w-full">Wyślij wiadomość</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
