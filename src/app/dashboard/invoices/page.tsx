import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { INVOICE_STATUS_LABELS, type InvoiceStatus } from "@/lib/constants";
import Link from "next/link";

const statusVariant: Record<
  InvoiceStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  draft: "secondary",
  sent: "outline",
  paid: "default",
  overdue: "destructive",
};

export default async function InvoicesPage() {
  const supabase = await createClient();

  const { data: invoicesData } = await supabase
    .from("invoices")
    .select("id, invoice_number, total, status, created_at, clients(name)")
    .order("created_at", { ascending: false });

  type InvoiceRow = {
    id: string;
    invoice_number: string;
    clientName: string;
    total: number | null;
    status: InvoiceStatus;
    created_at: string;
  };

  const invoices: InvoiceRow[] = (invoicesData ?? []).map((inv) => {
    const clientRaw = inv.clients;
    const clientName = Array.isArray(clientRaw)
      ? ((clientRaw[0] as { name?: string })?.name ?? "—")
      : ((clientRaw as { name?: string } | null)?.name ?? "—");
    return {
      id: inv.id,
      invoice_number: inv.invoice_number,
      clientName,
      total: inv.total,
      status: (inv.status as InvoiceStatus) ?? "draft",
      created_at: inv.created_at,
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Factures</h1>
      </div>

      {invoices.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4">Aucune facture.</p>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numéro</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell>
                    <Link
                      href={`/dashboard/invoices/${inv.id}`}
                      className="font-mono text-sm font-medium hover:underline"
                    >
                      {inv.invoice_number}
                    </Link>
                  </TableCell>
                  <TableCell>{inv.clientName}</TableCell>
                  <TableCell className="hidden sm:table-cell font-mono text-sm text-muted-foreground">
                    {new Date(inv.created_at).toLocaleDateString("fr-CA")}
                  </TableCell>
                  <TableCell className="font-mono tabular-nums">
                    {inv.total != null
                      ? inv.total.toLocaleString("fr-CA", {
                          minimumFractionDigits: 2,
                        }) + " $"
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[inv.status]}>
                      {INVOICE_STATUS_LABELS[inv.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/dashboard/invoices/${inv.id}`}>Voir</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
