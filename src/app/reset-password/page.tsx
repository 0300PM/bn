'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { AuthShell } from '@/components/auth/auth-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [error, setError] = useState<string | null>(null);

  return (
    <AuthShell
      title="Nowe hasło"
      description="Ustaw hasło, którego nie używasz nigdzie indziej."
      footer={
        <Link href="/login" className="font-medium text-foreground underline">
          Wróć do logowania
        </Link>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (password.length < 6) {
            setError('Hasło musi mieć co najmniej 6 znaków.');
            return;
          }
          if (password !== repeat) {
            setError('Hasła nie są identyczne.');
            return;
          }
          toast({ title: 'Hasło zmienione', description: 'Możesz zalogować się nowym hasłem.' });
          router.push('/login');
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="password">Nowe hasło</Label>
          <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="repeat">Powtórz hasło</Label>
          <Input id="repeat" type="password" value={repeat} onChange={(event) => setRepeat(event.target.value)} />
        </div>
        {error ? <p className="text-xs text-destructive">{error}</p> : null}
        <Button type="submit" className="w-full">
          <Lock className="mr-2 h-4 w-4" /> Zapisz nowe hasło
        </Button>
      </form>
    </AuthShell>
  );
}
