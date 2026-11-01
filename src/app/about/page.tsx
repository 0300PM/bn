import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="bg-background">
            <div className="container py-12 md:py-20">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Tworzymy przestrzenie, które inspirują.</h1>
                    <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
                        W BuyNest wierzymy, że dobrze zaprojektowane wnętrze ma moc zmieniania codziennego życia. Naszą misją jest dostarczanie wysokiej jakości, nowoczesnych mebli, które łączą w sobie estetykę, funkcjonalność i trwałość.
                    </p>
                </div>

                {/* Image Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    <div className="relative aspect-square col-span-2 row-span-2 rounded-lg overflow-hidden">
                         <Image src="https://picsum.photos/seed/about1/800/800" alt="Modern interior" fill className="object-cover" data-ai-hint="modern interior" />
                    </div>
                     <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image src="https://picsum.photos/seed/about2/400/400" alt="Design detail" fill className="object-cover" data-ai-hint="design detail" />
                    </div>
                     <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image src="https://picsum.photos/seed/about3/400/400" alt="Furniture workshop" fill className="object-cover" data-ai-hint="furniture workshop" />
                    </div>
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image src="https://picsum.photos/seed/about4/400/400" alt="Happy customer" fill className="object-cover" data-ai-hint="home decor" />
                    </div>
                     <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image src="https://picsum.photos/seed/about5/400/400" alt="Fabric samples" fill className="object-cover" data-ai-hint="fabric samples" />
                    </div>
                </div>

                {/* Our Values */}
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center">
                    <div>
                        <h3 className="text-xl font-bold mb-2">Jakość i Rzemiosło</h3>
                        <p className="text-muted-foreground">
                            Wybieramy tylko najlepsze materiały i współpracujemy z rzemieślnikami, którzy dzielą naszą pasję do detali.
                        </p>
                    </div>
                     <div>
                        <h3 className="text-xl font-bold mb-2">Nowoczesny Design</h3>
                        <p className="text-muted-foreground">
                            Nasze kolekcje są starannie kuratorowane, aby odzwierciedlały najnowsze trendy, pozostając jednocześnie ponadczasowymi.
                        </p>
                    </div>
                     <div>
                        <h3 className="text-xl font-bold mb-2">Zrównoważony Rozwój</h3>
                        <p className="text-muted-foreground">
                            Dbamy o naszą planetę, wybierając ekologiczne materiały i procesy produkcyjne, które minimalizują nasz wpływ na środowisko.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
