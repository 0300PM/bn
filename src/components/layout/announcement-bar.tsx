'use client';

import { useState } from 'react';
import { Truck, ShieldCheck, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const messages = [
  { icon: Truck, text: 'Darmowa dostawa od 2500 zł' },
  { icon: ShieldCheck, text: '60 dni na zwrot bez podawania przyczyny' },
  { icon: Sparkles, text: 'Kod powitalny −10% dla nowych klientów' },
];

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative z-50 bg-accent text-accent-foreground">
      <div className="container flex h-9 items-center justify-center gap-6 overflow-hidden text-xs">
        <ul className="flex items-center gap-6 overflow-hidden">
          {messages.map(({ icon: Icon, text }, index) => (
            <li key={text} className={cn('flex items-center gap-1.5 whitespace-nowrap', index > 0 && 'hidden md:flex')}>
              <Icon className="h-3.5 w-3.5" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="absolute right-4 rounded p-1 transition hover:bg-white/10"
          aria-label="Zamknij pasek informacyjny"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
