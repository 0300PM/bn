'use client';

import { Award, Gift, Sparkles, Truck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useOrders } from '@/contexts/orders-context';
import { formatPrice } from '@/lib/format';

const tiers = [
  { name: 'Brąz', points: 0, perks: ['1 pkt za 10 zł', 'Urodzinowy rabat 5%'] },
  { name: 'Srebro', points: 350, perks: ['Darmowa dostawa bez limitu', 'Wcześniejszy dostęp do wyprzedaży'] },
  { name: 'Złoto', points: 1000, perks: ['5% zniżki na wszystko', 'Darmowy montaż mebli'] },
  { name: 'Platyna', points: 2500, perks: ['Dedykowany doradca', 'Darmowe projektowanie wnętrza'] },
];

export default function LoyaltyPage() {
  const { orders } = useOrders();
  const points = 350 + orders.reduce((sum, order) => sum + Math.floor(order.total / 10), 0);
  const currentTier = [...tiers].reverse().find((tier) => points >= tier.points) ?? tiers[0];
  const nextTier = tiers.find((tier) => tier.points > points);
  const progress = nextTier ? ((points - currentTier.points) / (nextTier.points - currentTier.points)) * 100 : 100;

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Program lojalnościowy</h1>
        <p className="mt-1 text-sm text-muted-foreground">Zbieraj punkty za zakupy i wymieniaj je na korzyści.</p>
      </header>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Award className="h-4 w-4 text-accent" /> Klub BuyNest · {currentTier.name}
          </CardTitle>
          <CardDescription>
            {points} punktów{nextTier ? ` · do poziomu ${nextTier.name} brakuje ${nextTier.points - points}` : ' · najwyższy poziom'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Punkty naliczamy po dostarczeniu zamówienia. 1 punkt = 1 zł przy kolejnych zakupach.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        {tiers.map((tier) => (
          <Card key={tier.name} className={tier.name === currentTier.name ? 'border-foreground' : undefined}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{tier.name}</CardTitle>
              <CardDescription>od {tier.points} punktów</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" /> {perk}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="grid gap-3 p-4 sm:grid-cols-3">
          {[
            { icon: Gift, title: 'Wymień punkty', text: '500 pkt = 25 zł rabatu' },
            { icon: Truck, title: 'Darmowa dostawa', text: `od ${formatPrice(2500)} dla Srebra` },
            { icon: Award, title: 'Punkty za opinię', text: '50 pkt za opinię z zdjęciem' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-2 text-sm">
              <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.text}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
