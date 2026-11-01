import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading } from '@/components/shared/section-heading';

const looks = [
  { image: '/images/lookbook.jpg', title: 'Jasny minimalizm', href: '/shop?color=szary' },
  { image: '/images/hero-secondary.jpg', title: 'Ciepłe drewno', href: '/shop?category=tables' },
  { image: '/images/banner-vintage.jpg', title: 'Skóra i mosiądz', href: '/shop?category=chairs' },
  { image: '/images/story-craft.jpg', title: 'Rzemiosło i detal', href: '/about' },
];

export function Lookbook() {
  return (
    <section className="container py-12 md:py-16">
      <SectionHeading
        eyebrow="Lookbook"
        title="Aranżacje z katalogu 2026"
        description="Zainspiruj się gotowymi zestawami i skopiuj cały look jednym kliknięciem."
        href="/shop"
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {looks.map((look) => (
          <Link key={look.title} href={look.href} className="group relative overflow-hidden rounded-lg border">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
              <Image
                src={look.image}
                alt={look.title}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70" />
            </div>
            <p className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur">
              {look.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
