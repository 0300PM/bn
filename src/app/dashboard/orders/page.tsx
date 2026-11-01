'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

const orders = [
    {
        id: "BUN-1672665045",
        date: "1 stycznia 2024",
        status: "Dostarczono",
        total: 450.00,
        items: [{ name: "Marble Coffee Table", image: "https://picsum.photos/seed/table2/100/100" }]
    },
    {
        id: "BUN-1672405845",
        date: "28 grudnia 2023",
        status: "Wysłano",
        total: 899.99,
        items: [{ name: "Minimalist Lounge Sofa", image: "https://picsum.photos/seed/sofa1/100/100" }]
    },
    {
        id: "BUN-1671989445",
        date: "24 grudnia 2023",
        status: "Anulowano",
        total: 180.50,
        items: [{ name: "Industrial Floor Lamp", image: "https://picsum.photos/seed/lamp1/100/100" }]
    }
];

export default function OrdersPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Historia zamówień</CardTitle>
                <CardDescription>Przeglądaj swoje przeszłe i obecne zamówienia.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Zamówienie</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Suma</TableHead>
                            <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>
                                    <Badge variant={order.status === 'Dostarczono' ? 'default' : order.status === 'Anulowano' ? 'destructive' : 'secondary'}>
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                                <TableCell><Button variant="outline" size="sm">Szczegóły</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
