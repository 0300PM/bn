'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthShell } from '@/components/auth/auth-shell';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const LENGTH = 4;

export default function VerifyOtpPage() {
  const router = useRouter();
  const [values, setValues] = useState<string[]>(Array.from({ length: LENGTH }, () => ''));
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const setDigit = (index: number, digit: string) => {
    const sanitized = digit.replace(/\D/g, '').slice(-1);
    setValues((current) => current.map((value, position) => (position === index ? sanitized : value)));
    if (sanitized && index < LENGTH - 1) inputs.current[index + 1]?.focus();
  };

  return (
    <AuthShell
      title="Potwierdź numer telefonu"
      description="Wysłaliśmy 4-cyfrowy kod SMS. Wpisz go, aby dokończyć rejestrację."
      footer={
        <Link href="/login" className="font-medium text-foreground underline">
          Wróć do logowania
        </Link>
      }
    >
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          if (values.some((value) => !value)) {
            toast({ title: 'Wpisz pełny kod', variant: 'destructive' });
            return;
          }
          toast({ title: 'Numer potwierdzony' });
          router.push('/dashboard');
        }}
      >
        <div className="flex gap-2">
          {values.map((value, index) => (
            <input
              key={index}
              ref={(element) => {
                inputs.current[index] = element;
              }}
              value={value}
              onChange={(event) => setDigit(index, event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Backspace' && !value && index > 0) inputs.current[index - 1]?.focus();
              }}
              inputMode="numeric"
              maxLength={1}
              className="h-12 w-12 rounded-md border bg-background text-center text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Cyfra ${index + 1}`}
            />
          ))}
        </div>
        <Button type="submit" className="w-full">
          Potwierdź
        </Button>
        <p className="text-xs text-muted-foreground">
          Nie dostałeś kodu?{' '}
          <button type="button" onClick={() => toast({ title: 'Kod wysłany ponownie' })} className="underline">
            Wyślij ponownie
          </button>
        </p>
      </form>
    </AuthShell>
  );
}
