import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Printer } from "lucide-react";
import Link from "next/link";
import { TPS_RATE, TVQ_RATE } from "@/lib/constants";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  void id;

  // Mock invoice
  const invoice = {
    number: "EACH-2026-001",
    date: "2026-03-15",
    dueDate: "2026-04-15",
    status: "paid",
    client: {
      name: "Marie-Claude Tremblay",
      phone: "(819) 555-1234",
      email: "marie@email.ca",
      address: "123 rue Laviolette, Trois-Rivières",
    },
    items: [
      { description: "Réparation de robinet — main-d'œuvre", qty: 2, price: 65, total: 130 },
      { description: "Pièces — cartouche robinet Moen", qty: 1, price: 45, total: 45 },
      { description: "Déplacement", qty: 1, price: 10, total: 10 },
    ],
  };

  const subtotal = invoice.items.reduce((sum, item) => sum + item.total, 0);
  const tps = Math.round(subtotal * TPS_RATE * 100) / 100;
  const tvq = Math.round(subtotal * TVQ_RATE * 100) / 100;
  const total = subtotal + tps + tvq;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard/invoices">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Facture {invoice.number}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">Payée</Badge>
          <Button variant="outline" size="sm" className="gap-2">
            <Printer className="h-4 w-4" />
            Imprimer
          </Button>
        </div>
      </div>

      {/* Invoice preview */}
      <Card className="max-w-2xl">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold">Eachstone</h2>
              <p className="text-sm text-muted-foreground">
                Homme à tout faire
              </p>
              <p className="text-sm text-muted-foreground">
                Trois-Rivières, QC
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-lg font-semibold">
                {invoice.number}
              </p>
              <p className="text-sm text-muted-foreground">
                Date: {invoice.date}
              </p>
              <p className="text-sm text-muted-foreground">
                Échéance: {invoice.dueDate}
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Client */}
          <div>
            <p className="text-xs uppercase text-muted-foreground mb-1">
              Facturé à
            </p>
            <p className="font-medium">{invoice.client.name}</p>
            <p className="text-sm text-muted-foreground">
              {invoice.client.address}
            </p>
            <p className="text-sm text-muted-foreground">
              {invoice.client.phone}
            </p>
          </div>

          <Separator className="my-6" />

          {/* Items */}
          <div className="space-y-3">
            <div className="grid grid-cols-12 text-xs uppercase text-muted-foreground">
              <span className="col-span-6">Description</span>
              <span className="col-span-2 text-right">Qté</span>
              <span className="col-span-2 text-right">Prix</span>
              <span className="col-span-2 text-right">Total</span>
            </div>
            {invoice.items.map((item, i) => (
              <div key={i} className="grid grid-cols-12 text-sm">
                <span className="col-span-6">{item.description}</span>
                <span className="col-span-2 text-right font-mono">
                  {item.qty}
                </span>
                <span className="col-span-2 text-right font-mono">
                  {item.price.toFixed(2)} $
                </span>
                <span className="col-span-2 text-right font-mono">
                  {item.total.toFixed(2)} $
                </span>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          {/* Totals */}
          <div className="space-y-1 text-right text-sm">
            <div className="flex justify-end gap-8">
              <span className="text-muted-foreground">Sous-total</span>
              <span className="font-mono tabular-nums w-24">
                {subtotal.toFixed(2)} $
              </span>
            </div>
            <div className="flex justify-end gap-8">
              <span className="text-muted-foreground">TPS (5%)</span>
              <span className="font-mono tabular-nums w-24">
                {tps.toFixed(2)} $
              </span>
            </div>
            <div className="flex justify-end gap-8">
              <span className="text-muted-foreground">TVQ (9,975%)</span>
              <span className="font-mono tabular-nums w-24">
                {tvq.toFixed(2)} $
              </span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-end gap-8 font-semibold text-base">
              <span>Total</span>
              <span className="font-mono tabular-nums w-24">
                {total.toFixed(2)} $
              </span>
            </div>
          </div>

          <Separator className="my-6" />

          <p className="text-xs text-muted-foreground text-center">
            Merci pour votre confiance! — Eachstone, Trois-Rivières
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
