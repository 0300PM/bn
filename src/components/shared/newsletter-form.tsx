'use client';

import { useState } from 'react';
import { Check, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function NewsletterForm({ className, compact }: { className?: string; compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.includes('@')) {
      toast({ title: 'Sprawdź adres e-mail', variant: 'destructive' });
      return;
    }
    if (!accepted) {
      toast({ title: 'Zaakceptuj regulamin newslettera', variant: 'destructive' });
      return;
    }
    setSubmitted(true);
    setEmail('');
    toast({
      title: 'Jesteś zapisany!',
      description: 'Kod powitalny −10% wyślemy na podany adres e-mail.',
    });
  };

  if (submitted) {
    return (
      <div className={cn('flex items-center gap-3 rounded-md border border-accent/40 bg-accent/10 p-4 text-sm', className)}>
        <Check className="h-5 w-5 text-accent" />
        <p>Dziękujemy! Sprawdź skrzynkę i odbierz kod rabatowy.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-3', className)} noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Twój adres e-mail"
            className="pl-9"
            aria-label="Adres e-mail do newslettera"
            required
          />
        </div>
        <Button type="submit" className="sm:w-auto">
          Zapisz się
        </Button>
      </div>
      <label className="flex items-start gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(event) => setAccepted(event.target.checked)}
          className="mt-0.5 h-3.5 w-3.5 rounded border-input accent-accent"
        />
        <span>
          Zgadzam się na otrzymywanie informacji marketingowych. {compact ? 'Możesz wypisać się w każdej chwili.' : 'Administratorem danych jest BuyNest.'}
        </span>
      </label>
    </form>
  );
}
