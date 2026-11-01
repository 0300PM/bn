'use client';

import { Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function LoyaltyPage() {
    const points = 1250;
    const pointsToGo = 2000 - points;
    const progressPercentage = (points / 2000) * 100;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Program lojalnościowy</CardTitle>
                <CardDescription>Zbieraj punkty za zakupy i wymieniaj je na nagrody.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="bg-muted p-6 rounded-lg text-center">
                    <Award className="mx-auto h-12 w-12 text-primary" />
                    <p className="text-sm text-muted-foreground mt-2">Twoje punkty</p>
                    <p className="text-4xl font-bold">{points}</p>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium">Postęp do następnej nagrody</p>
                        <p className="text-sm font-bold">2000 pkt</p>
                    </div>
                    <Progress value={progressPercentage} className="w-full" />
                    <p className="text-sm text-muted-foreground mt-2">Brakuje Ci {pointsToGo} punktów do zdobycia bonu o wartości 50 zł.</p>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Jak to działa?</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                        <li>Za każde wydane 1 zł otrzymujesz 1 punkt.</li>
                        <li>Punkty są dodawane do Twojego konta po zrealizowaniu zamówienia.</li>
                        <li>Zebrane punkty możesz wymieniać na bony rabatowe i specjalne nagrody.</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
