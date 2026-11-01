'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { AuthShell } from '@/components/auth/auth-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/auth-context';
import { toast } from '@/hooks/use-toast';

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    const result = login(email, password);
    setIsLoading(false);
    if (!result.ok) {
      setError(result.message ?? 'Nie udało się zalogować.');
      return;
    }
    toast({ title: 'Zalogowano', description: 'Miło Cię widzieć ponownie!' });
    router.push(searchParams.get('redirect') ?? '/dashboard');
  };

  return (
    <AuthShell
      title="Zaloguj się"
      description="Zarządzaj zamówieniami, listami życzeń i danymi dostawy."
      footer={
        <>
          Nie masz konta?{' '}
          <Link href="/signup" className="font-medium text-foreground underline">
            Zarejestruj się
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="jan@example.com"
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Hasło</Label>
            <Link href="/forgot-password" className="text-xs text-muted-foreground underline-offset-2 hover:underline">
              Nie pamiętasz hasła?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {error ? <p className="text-xs text-destructive">{error}</p> : null}
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-accent" /> Zapamiętaj mnie na tym urządzeniu
        </label>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Zaloguj się
        </Button>
        <p className="rounded-md bg-muted p-3 text-xs text-muted-foreground">
          To prototyp — wpisz dowolny e-mail i hasło (min. 4 znaki), aby zobaczyć panel klienta.
        </p>
      </form>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="container py-20 text-center text-sm text-muted-foreground">Wczytywanie…</div>}>
      <LoginForm />
    </Suspense>
  );
}
