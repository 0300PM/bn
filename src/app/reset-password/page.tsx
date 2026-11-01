'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  password: z.string().min(8, 'Hasło musi mieć co najmniej 8 znaków.'),
  confirmPassword: z.string().min(8, 'Hasło musi mieć co najmniej 8 znaków.'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Hasła muszą być takie same.",
  path: ["confirmPassword"],
});

export default function ResetPasswordPage() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log('New password set:', values.password);
        // Simulate success and redirect
        router.push('/login');
    };

  return (
    <div className="container flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Ustaw nowe hasło</CardTitle>
          <CardDescription>Wprowadź swoje nowe hasło poniżej.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nowe hasło</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Potwierdź nowe hasło</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Zapisz nowe hasło</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
