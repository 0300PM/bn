'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email('Nieprawidłowy adres email.'),
});

export default function ForgotPasswordPage() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log('Password reset for:', values.email);
        // Simulate sending email and redirecting
        router.push(`/verify-otp?email=${values.email}&reason=reset`);
    };

  return (
    <div className="container flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Zapomniałeś hasła?</CardTitle>
          <CardDescription>Podaj swój adres e-mail, a wyślemy Ci instrukcje, jak ustawić nowe hasło.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="jan.kowalski@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Wyślij instrukcje</Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
             <Button asChild variant="ghost" size="sm">
                <Link href="/login" className="flex items-center justify-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Wróć do logowania
                </Link>
             </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
