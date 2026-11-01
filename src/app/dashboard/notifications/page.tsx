'use client';

import { Bell, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const notifications = [
  { title: 'Zamówienie wysłane', description: 'Twoja paczka opuściła magazyn w Warszawie.', date: '2 dni temu', unread: true },
  { title: 'Nowa kolekcja dostępna', description: 'Modele z tkanin bouclé właśnie trafiły do sprzedaży.', date: '5 dni temu', unread: true },
  { title: 'Kod rabatowy czeka', description: 'Twój kod BUYNEST10 jest ważny do końca miesiąca.', date: 'tydzień temu', unread: false },
];

const channels = [
  { id: 'orders', label: 'Statusy zamówień', description: 'E-mail i SMS o wysyłce oraz dostawie', default: true },
  { id: 'promo', label: 'Promocje i wyprzedaże', description: 'Maksymalnie 2 wiadomości w miesiącu', default: true },
  { id: 'newsletter', label: 'Newsletter z inspiracjami', description: 'Aranżacje i poradniki co dwa tygodnie', default: false },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Powiadomienia</h1>
        <p className="mt-1 text-sm text-muted-foreground">Zarządzaj tym, o czym chcemy Cię informować.</p>
      </header>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Ostatnie powiadomienia</CardTitle>
            <CardDescription>Wiadomości powiązane z Twoim kontem.</CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            <CheckCheck className="mr-2 h-4 w-4" /> Oznacz jako przeczytane
          </Button>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {notifications.map((notification) => (
              <li key={notification.title} className="flex items-start gap-3 py-3">
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-sm font-medium">
                    {notification.title}
                    {notification.unread ? <span className="h-1.5 w-1.5 rounded-full bg-accent" /> : null}
                  </p>
                  <p className="text-xs text-muted-foreground">{notification.description}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{notification.date}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Kanały powiadomień</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {channels.map((channel) => (
            <div key={channel.id} className="flex items-center justify-between gap-4">
              <div>
                <Label htmlFor={`channel-${channel.id}`} className="text-sm">
                  {channel.label}
                </Label>
                <p className="text-xs text-muted-foreground">{channel.description}</p>
              </div>
              <Switch id={`channel-${channel.id}`} defaultChecked={channel.default} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
