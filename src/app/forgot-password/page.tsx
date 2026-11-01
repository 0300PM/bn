'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MailCheck } from 'lucide-react';
import { AuthShell } from '@/components/auth/auth-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <AuthShell
      title="Odzyskiwanie hasła"
      description="Wyślemy link do ustawienia nowego hasła."
      footer={
        <Link href="/login" className="font-medium text-foreground underline">
          Wróć do logowania
        </Link>
      }
    >
      {sent ? (
        <div className="space-y-4 rounded-md border bg-muted/50 p-4">
          <MailCheck className="h-6 w-6 text-accent" />
          <p className="text-sm">
            Jeśli konto <strong>{email}</strong> istnieje, wysłaliśmy na nie link do zmiany hasła.
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/reset-password">Przejdź do ustawienia hasła (demo)</Link>
          </Button>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <Button type="submit" className="w-full">
            Wyślij link
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
