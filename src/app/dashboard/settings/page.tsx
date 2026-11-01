'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';
import { Separator } from '@/components/ui/separator';

const accountSchema = z.object({
  name: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki.'),
  email: z.string().email('Nieprawidłowy adres email.'),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Aktualne hasło jest wymagane."),
  newPassword: z.string().min(8, 'Nowe hasło musi mieć co najmniej 8 znaków.'),
  confirmPassword: z.string().min(8, 'Potwierdzenie hasła musi mieć co najmniej 8 znaków.'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Hasła muszą być takie same.",
  path: ["confirmPassword"],
});

export default function SettingsPage() {
    const { user } = useAuth();

    const accountForm = useForm<z.infer<typeof accountSchema>>({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
        },
    });

    const passwordForm = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const onAccountSubmit = (values: z.infer<typeof accountSchema>) => {
        console.log('Account update:', values);
        alert('Dane konta zaktualizowane!');
    };

    const onPasswordSubmit = (values: z.infer<typeof passwordSchema>) => {
        console.log('Password change attempt');
        alert('Hasło zostało zmienione!');
        passwordForm.reset();
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Ustawienia konta</CardTitle>
                    <CardDescription>Zaktualizuj swoje dane osobowe.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...accountForm}>
                        <form onSubmit={accountForm.handleSubmit(onAccountSubmit)} className="space-y-4">
                            <FormField control={accountForm.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Imię i nazwisko</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={accountForm.control} name="email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl><Input type="email" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Button type="submit">Zapisz zmiany</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Zmień hasło</CardTitle>
                    <CardDescription>Pamiętaj, aby używać silnego, unikalnego hasła.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                            <FormField control={passwordForm.control} name="currentPassword" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Aktualne hasło</FormLabel>
                                    <FormControl><Input type="password" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={passwordForm.control} name="newPassword" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nowe hasło</FormLabel>
                                    <FormControl><Input type="password" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                             <FormField control={passwordForm.control} name="confirmPassword" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Potwierdź nowe hasło</FormLabel>
                                    <FormControl><Input type="password" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Button type="submit">Zmień hasło</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
