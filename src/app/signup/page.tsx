'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { AuthShell } from '@/components/auth/auth-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/auth-context';
import { toast } from '@/hooks/use-toast';

const benefits = ['Dostęp do przedsprzedaży kolekcji', 'Kod −10% na pierwsze zamówienie', 'Historia zamówień i zwrotów'];

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    const result = signup(form);
    setIsLoading(false);
    if (!result.ok) {
      setError(result.message ?? 'Nie udało się utworzyć konta.');
      return;
    }
    toast({ title: 'Konto utworzone', description: 'Kod BUYNEST10 czeka w Twoim panelu.' });
    router.push('/dashboard');
  };

  return (
    <AuthShell
      title="Załóż konto"
      description="Zapisujemy Twoje listy życzeń i przyspieszamy kolejne zakupy."
      footer={
        <>
          Masz już konto?{' '}
          <Link href="/login" className="font-medium text-foreground underline">
            Zaloguj się
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="name">Imię i nazwisko</Label>
          <Input id="name" autoComplete="name" value={form.name} onChange={update('name')} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" autoComplete="email" value={form.email} onChange={update('email')} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Hasło</Label>
          <Input id="password" type="password" autoComplete="new-password" value={form.password} onChange={update('password')} />
          <p className="text-xs text-muted-foreground">Minimum 6 znaków.</p>
        </div>
        {error ? <p className="text-xs text-destructive">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Utwórz konto
        </Button>
        <ul className="space-y-1.5 pt-1">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> {benefit}
            </li>
          ))}
        </ul>
      </form>
    </AuthShell>
  );
}
