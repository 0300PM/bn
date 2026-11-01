'use client';

import { useState } from 'react';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const channels = [
  { icon: Phone, title: 'Infolinia', value: '800 123 456', hint: 'pon.–pt. 9:00–18:00' },
  { icon: Mail, title: 'E-mail', value: 'pomoc@buynest.pl', hint: 'odpowiadamy w 24 h' },
  { icon: MapPin, title: 'Showroom', value: 'ul. Prosta 12, Warszawa', hint: 'sob. 10:00–16:00' },
  { icon: Clock, title: 'Czas realizacji', value: '2–4 dni robocze', hint: 'wysyłka w 24 h' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: 'Zamówienie', message: '' });

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  return (
    <div>
      <PageHeader
        title="Kontakt"
        description="Odpowiadamy na wiadomości w ciągu 24 godzin w dni robocze. W sprawie zamówienia podaj jego numer."
        breadcrumbs={[{ href: '/contact', label: 'Kontakt' }]}
      />
      <div className="container grid gap-8 py-10 md:py-14 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-3">
          {channels.map((channel) => (
            <Card key={channel.title}>
              <CardContent className="flex items-start gap-3 p-4">
                <channel.icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{channel.title}</p>
                  <p className="font-medium">{channel.value}</p>
                  <p className="text-xs text-muted-foreground">{channel.hint}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-5 sm:p-6">
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                toast({ title: 'Wiadomość wysłana', description: 'Odpowiemy w ciągu 24 godzin roboczych.' });
                setForm({ name: '', email: '', topic: 'Zamówienie', message: '' });
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Imię i nazwisko</Label>
                  <Input id="name" required value={form.name} onChange={update('name')} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" required value={form.email} onChange={update('email')} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="topic">Temat</Label>
                <select
                  id="topic"
                  value={form.topic}
                  onChange={update('topic')}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option>Zamówienie</option>
                  <option>Dostawa</option>
                  <option>Zwrot lub reklamacja</option>
                  <option>Doradztwo wnętrz</option>
                  <option>Współpraca</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">Wiadomość</Label>
                <Textarea id="message" rows={5} required value={form.message} onChange={update('message')} />
              </div>
              <Button type="submit">
                <Send className="mr-2 h-4 w-4" /> Wyślij wiadomość
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
