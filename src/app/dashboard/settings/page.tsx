'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/auth-context';
import { toast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    city: user?.city ?? '',
  });

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Ustawienia konta</h1>
        <p className="mt-1 text-sm text-muted-foreground">Dane kontaktowe i preferencje zakupowe.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Dane osobowe</CardTitle>
          <CardDescription>Używamy ich do potwierdzeń zamówień i kontaktu z kurierem.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              updateProfile(form);
              toast({ title: 'Dane zapisane' });
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="name">Imię i nazwisko</Label>
              <Input id="name" value={form.name} onChange={update('name')} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" value={form.email} onChange={update('email')} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" value={form.phone} onChange={update('phone')} placeholder="+48 600 000 000" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="city">Miasto</Label>
              <Input id="city" value={form.city} onChange={update('city')} />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit">Zapisz zmiany</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Bezpieczeństwo</CardTitle>
          <CardDescription>Zmiana hasła i wylogowanie ze wszystkich urządzeń.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => toast({ title: 'Link do zmiany hasła wysłany' })}>
            Zmień hasło
          </Button>
          <Button variant="outline" onClick={() => toast({ title: 'Wylogowano pozostałe urządzenia' })}>
            Wyloguj inne urządzenia
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
