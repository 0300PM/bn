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
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
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


export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Simulate successful login
        const user = {
            id: 'user_123',
            name: 'Jan Kowalski',
            email: values.email,
            avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        };
        login(user);
        router.push('/dashboard');
    };

    const handleGoogleLogin = () => {
         // Simulate successful Google login
        const user = {
            id: 'user_google_456',
            name: 'Anna Nowak',
            email: 'anna.nowak.google@example.com',
            avatarUrl: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
        };
        login(user);
        router.push('/dashboard');
    }

  return (
    <div className="container flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Witaj ponownie!</CardTitle>
          <CardDescription>Zaloguj się, aby kontynuować</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                     <div className="text-right">
                        <Button asChild variant="link" size="sm" className="px-0 h-auto">
                            <Link href="/forgot-password">Nie pamiętasz hasła?</Link>
                        </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <p className="text-xs text-muted-foreground pt-2">
                Logując się, akceptujesz nasz{' '}
                <Link href="/terms" className="underline hover:text-primary">Regulamin</Link> i {' '}
                <Link href="/privacy" className="underline hover:text-primary">Politykę Prywatności</Link>.
              </p>
              <Button type="submit" className="w-full">Zaloguj się</Button>
            </form>
          </Form>

          <Separator className="my-6">
            <span className="px-2 bg-background text-muted-foreground text-sm">LUB</span>
          </Separator>

          <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
            <GoogleIcon className="mr-2" />
            Kontynuuj z Google
          </Button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Nie masz jeszcze konta?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Zarejestruj się
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
