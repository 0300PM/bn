import { PackageCheck, RefreshCcw, ShieldCheck, Truck } from 'lucide-react';

const benefits = [
  { icon: Truck, title: 'Darmowa dostawa', description: 'dla zamówień od 2500 zł' },
  { icon: RefreshCcw, title: '60 dni na zwrot', description: 'odbiór opłacamy my' },
  { icon: ShieldCheck, title: '5 lat gwarancji', description: 'na konstrukcję mebli' },
  { icon: PackageCheck, title: 'Wysyłka w 24 h', description: 'z magazynu w Polsce' },
];

export function BenefitStrip() {
  return (
    <section className="border-b bg-muted/40" aria-label="Korzyści zakupowe">
      <div className="container grid grid-cols-2 gap-4 py-5 md:grid-cols-4">
        {benefits.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start gap-3">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-semibold">{title}</p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
