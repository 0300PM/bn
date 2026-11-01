'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki.'),
  email: z.string().email('Nieprawidłowy adres email.'),
  password: z.string().min(8, 'Hasło musi mieć co najmniej 8 znaków.'),
});

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.655-3.449-11.303-8H6.306C9.656,39.663,16.318,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,35.85,44,30.338,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);

export default function SignupPage() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Here you would handle the signup logic
        console.log('Signup values:', values);
        // Simulate redirect to OTP verification
        router.push(`/verify-otp?email=${values.email}`);
    };

    const handleGoogleSignup = () => {
        // Here you would handle Google signup logic
        console.log('Signup with Google');
        // Simulate successful login and redirect
         router.push('/dashboard');
    }

  return (
    <div className="container flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Stwórz konto</CardTitle>
          <CardDescription>Dołącz do BuyNest i odkryj świat designu</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imię</FormLabel>
                    <FormControl>
                      <Input placeholder="Jan Kowalski" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hasło</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Co najmniej 8 znaków" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-xs text-muted-foreground pt-2">
                Rejestrując się, akceptujesz nasz{' '}
                <Link href="/terms" className="underline hover:text-primary">Regulamin</Link> i {' '}
                <Link href="/privacy" className="underline hover:text-primary">Politykę Prywatności</Link>.
              </p>
              <Button type="submit" className="w-full">Zarejestruj się</Button>
            </form>
          </Form>

          <Separator className="my-6">
            <span className="px-2 bg-background text-muted-foreground text-sm">LUB</span>
          </Separator>

          <Button variant="outline" className="w-full" onClick={handleGoogleSignup}>
            <GoogleIcon className="mr-2" />
            Kontynuuj z Google
          </Button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Masz już konto?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Zaloguj się
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
