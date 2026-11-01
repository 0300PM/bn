'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";

const discounts = [
    { code: "WELCOME10", description: "10% zniżki na pierwsze zamówienie", expiry: "Wygasa: 31.12.2024", type: "procent" },
    { code: "FREESHIP", description: "Darmowa dostawa ekspresowa", expiry: "Wygasa: 30.11.2024", type: "dostawa" },
    { code: "WINTER25", description: "25 zł zniżki na zamówienia powyżej 250 zł", expiry: "Wygasa: 28.02.2025", type: "kwota" },
];

export default function DiscountsPage() {

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        // Add a toast notification here in a real app
        alert(`Kod "${code}" skopiowany do schowka!`);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Kody rabatowe</CardTitle>
                <CardDescription>Twoje dostępne kody rabatowe. Użyj ich przy składaniu zamówienia.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {discounts.map((discount, index) => (
                    <div key={index} className="border p-4 rounded-lg flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-4">
                                <p className="text-lg font-mono font-bold text-primary">{discount.code}</p>
                                <Badge variant={discount.type === 'procent' ? 'default' : 'secondary'}>{discount.type}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{discount.description}</p>
                            <p className="text-xs text-muted-foreground mt-2">{discount.expiry}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleCopy(discount.code)}>
                            <Copy className="h-5 w-5" />
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
