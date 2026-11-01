'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Home } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/');
        }, 10000); // 10 seconds delay

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center text-center space-y-8">
             <Card className="w-full max-w-lg">
                <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="mt-4 text-2xl font-bold">Dziękujemy za Twoje zamówienie!</CardTitle>
                    <CardDescription>
                        Twoje zamówienie zostało pomyślnie przyjęte. Otrzymasz e-mail z potwierdzeniem.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {orderId && (
                        <p className="text-lg">
                            Numer Twojego zamówienia: <span className="font-bold text-primary">{orderId}</span>
                        </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                        Zostaniesz automatycznie przekierowany na stronę główną za 10 sekund.
                    </p>
                    <Button asChild>
                        <Link href="/">
                            <Home className="mr-2" />
                            Wróć do strony głównej
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
