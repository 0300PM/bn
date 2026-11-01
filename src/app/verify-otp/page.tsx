'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function VerifyOtpPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const reason = searchParams.get('reason'); // 'signup' or 'reset'

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would verify the OTP
        console.log("Verifying OTP");
        if (reason === 'reset') {
            // In a real app, you'd pass a token to the reset page
            router.push('/reset-password');
        } else {
            router.push('/login');
        }
    };

    return (
        <div className="container flex items-center justify-center min-h-[80vh]">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle>Zweryfikuj swój adres e-mail</CardTitle>
                    <CardDescription>
                        Wysłaliśmy 6-cyfrowy kod na adres <strong>{email}</strong>. Wprowadź go poniżej.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleVerify} className="space-y-6">
                        <div className="flex justify-center gap-2">
                            {[...Array(6)].map((_, i) => (
                                <Input
                                    key={i}
                                    type="text"
                                    maxLength={1}
                                    className="w-12 h-12 text-center text-xl"
                                    // Basic logic to move to the next input
                                    onChange={(e) => {
                                        if (e.target.value.length === 1) {
                                            const nextSibling = e.currentTarget.nextElementSibling as HTMLInputElement | null;
                                            nextSibling?.focus();
                                        }
                                    }}
                                />
                            ))}
                        </div>
                        <Button type="submit" className="w-full">Zweryfikuj</Button>
                    </form>
                     <div className="mt-4 text-center">
                        <p className="text-sm text-muted-foreground">
                            Nie otrzymałeś kodu? <Button variant="link" size="sm">Wyślij ponownie</Button>
                        </p>
                         <Button asChild variant="ghost" size="sm" className="mt-4">
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
