import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Printer } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { TPS_RATE, TVQ_RATE, INVOICE_STATUS_LABELS, type InvoiceStatus } from "@/lib/constants";

const statusVariant: Record<
  InvoiceStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  draft: "secondary",
  sent: "outline",
  paid: "default",
  overdue: "destructive",
};

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: invoice } = await supabase
    .from("invoices")
    .select("*, clients(*), jobs(*, job_items(*))")
    .eq("id", id)
    .single();

  if (!invoice) {
    return (
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard/invoices">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <p className="text-muted-foreground">Facture introuvable.</p>
      </div>
    );
  }

  const client = Array.isArray(invoice.clients)
    ? (invoice.clients[0] ?? null)
    : (invoice.clients as Record<string, string> | null);

  const jobData = Array.isArray(invoice.jobs)
    ? (invoice.jobs[0] ?? null)
    : (invoice.jobs as { job_items?: { description: string | null; quantity: number | null; unit_price: number | null; total: number | null }[] } | null);

  const items: { description: string | null; quantity: number | null; unit_price: number | null; total: number | null }[] =
    jobData?.job_items ?? [];

  const subtotal =
    invoice.subtotal ??
    (items.length > 0
      ? items.reduce((s, i) => s + (i.total ?? 0), 0)
      : null);

  const tps = invoice.tps ?? (subtotal != null ? Math.round(subtotal * TPS_RATE * 100) / 100 : null);
  const tvq = invoice.tvq ?? (subtotal != null ? Math.round(subtotal * TVQ_RATE * 100) / 100 : null);
  const total = invoice.total ?? (subtotal != null && tps != null && tvq != null ? subtotal + tps + tvq : null);

  const invoiceStatus = (invoice.status as InvoiceStatus) ?? "draft";

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
            Facture {invoice.invoice_number}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={statusVariant[invoiceStatus]}>
            {INVOICE_STATUS_LABELS[invoiceStatus]}
          </Badge>
          <Button variant="outline" size="sm" className="gap-2" onClick={undefined}>
            <Printer className="h-4 w-4" />
            Imprimer
          </Button>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold">Eachstone</h2>
              <p className="text-sm text-muted-foreground">Homme à tout faire</p>
              <p className="text-sm text-muted-foreground">Trois-Rivières, QC</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-lg font-semibold">{invoice.invoice_number}</p>
              <p className="text-sm text-muted-foreground">
                Date: {new Date(invoice.created_at).toLocaleDateString("fr-CA")}
              </p>
              {invoice.due_date && (
                <p className="text-sm text-muted-foreground">
                  Échéance: {invoice.due_date}
                </p>
              )}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Client */}
          {client && (
            <div>
              <p className="text-xs uppercase text-muted-foreground mb-1">Facturé à</p>
              <p className="font-medium">{client.name}</p>
              {client.address && (
                <p className="text-sm text-muted-foreground">{client.address}, {client.city}</p>
              )}
              {client.phone && (
                <p className="text-sm text-muted-foreground">{client.phone}</p>
              )}
            </div>
          )}

          <Separator className="my-6" />

          {/* Items */}
          {items.length > 0 && (
            <div className="space-y-3">
              <div className="grid grid-cols-12 text-xs uppercase text-muted-foreground">
                <span className="col-span-6">Description</span>
                <span className="col-span-2 text-right">Qté</span>
                <span className="col-span-2 text-right">Prix</span>
                <span className="col-span-2 text-right">Total</span>
              </div>
              {items.map((item, i) => (
                <div key={i} className="grid grid-cols-12 text-sm">
                  <span className="col-span-6">{item.description ?? "—"}</span>
                  <span className="col-span-2 text-right font-mono">{item.quantity ?? 1}</span>
                  <span className="col-span-2 text-right font-mono">
                    {item.unit_price != null ? `${item.unit_price.toFixed(2)} $` : "—"}
                  </span>
                  <span className="col-span-2 text-right font-mono">
                    {item.total != null ? `${item.total.toFixed(2)} $` : "—"}
                  </span>
                </div>
              ))}
            </div>
          )}

          <Separator className="my-4" />

          {/* Totals */}
          <div className="space-y-1 text-right text-sm">
            {subtotal != null && (
              <div className="flex justify-end gap-8">
                <span className="text-muted-foreground">Sous-total</span>
                <span className="font-mono tabular-nums w-24">{subtotal.toFixed(2)} $</span>
              </div>
            )}
            {tps != null && (
              <div className="flex justify-end gap-8">
                <span className="text-muted-foreground">TPS (5%)</span>
                <span className="font-mono tabular-nums w-24">{tps.toFixed(2)} $</span>
              </div>
            )}
            {tvq != null && (
              <div className="flex justify-end gap-8">
                <span className="text-muted-foreground">TVQ (9,975%)</span>
                <span className="font-mono tabular-nums w-24">{tvq.toFixed(2)} $</span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-end gap-8 font-semibold text-base">
              <span>Total</span>
              <span className="font-mono tabular-nums w-24">
                {total != null ? `${total.toFixed(2)} $` : "—"}
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
