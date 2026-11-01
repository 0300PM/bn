'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { Package, Heart, Percent, Award } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Witaj, {user?.name?.split(' ')[0]}!</h1>
            <p className="text-muted-foreground mb-8">Oto przegląd Twojego konta.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Aktywne zamówienia</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">w trakcie realizacji</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Na liście życzeń</CardTitle>
                        <Heart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">zapisanych produktów</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Twoje punkty</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,250</div>
                        <p className="text-xs text-muted-foreground">w programie lojalnościowym</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Kody rabatowe</CardTitle>
                        <Percent className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">dostępne do wykorzystania</p>
                    </CardContent>
                </Card>
            </div>
            
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Ostatnie zamówienie</CardTitle>
                    <CardDescription>Szczegóły Twojego ostatniego zakupu.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold">Zamówienie #BUN-1672665045</p>
                            <p className="text-sm text-muted-foreground">Data: 1 stycznia 2024</p>
                        </div>
                        <div className="text-right">
                             <p className="font-semibold">$450.00</p>
                             <p className="text-sm text-green-600">Dostarczono</p>
                        </div>
                    </div>
                     <Link href="/dashboard/orders" className="text-primary text-sm font-semibold mt-4 inline-block">
                        Zobacz wszystkie zamówienia
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
