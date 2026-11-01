'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function NotificationsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Ustawienia powiadomień</CardTitle>
                <CardDescription>Zarządzaj powiadomieniami, które od nas otrzymujesz.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <Label htmlFor="newsletter" className="font-medium">Newsletter</Label>
                        <p className="text-sm text-muted-foreground">Otrzymuj cotygodniowe inspiracje i informacje o nowościach.</p>
                    </div>
                    <Switch id="newsletter" defaultChecked />
                </div>
                 <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <Label htmlFor="promotions" className="font-medium">Promocje i wyprzedaże</Label>
                        <p className="text-sm text-muted-foreground">Bądź pierwszy, który dowie się o specjalnych ofertach.</p>
                    </div>
                    <Switch id="promotions" defaultChecked />
                </div>
                 <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <Label htmlFor="order-status" className="font-medium">Status zamówienia</Label>
                        <p className="text-sm text-muted-foreground">Otrzymuj powiadomienia o zmianach statusu Twoich zamówień.</p>
                    </div>
                    <Switch id="order-status" defaultChecked disabled />
                </div>
                <div className="pt-4">
                    <Button>Zapisz zmiany</Button>
                </div>
            </CardContent>
        </Card>
    );
}
