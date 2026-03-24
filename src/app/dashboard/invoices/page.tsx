"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

const mockInvoices = [
  { id: "1", number: "EACH-2026-001", client: "Marie Tremblay", total: 194.24, status: "paid" as const, date: "2026-03-15" },
  { id: "2", number: "EACH-2026-002", client: "Jean Lavoie", total: 336.96, status: "sent" as const, date: "2026-03-18" },
  { id: "3", number: "EACH-2026-003", client: "Sophie Bergeron", total: 789.71, status: "draft" as const, date: "2026-03-22" },
  { id: "4", number: "EACH-2026-004", client: "Marc Dufresne", total: 1263.54, status: "overdue" as const, date: "2026-03-01" },
];

const statusVariant: Record<InvoiceStatus, "default" | "secondary" | "outline" | "destructive"> = {
  draft: "secondary",
  sent: "outline",
  paid: "default",
  overdue: "destructive",
};

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Factures</h1>
      </div>

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
            {mockInvoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell>
                  <Link
                    href={`/dashboard/invoices/${inv.id}`}
                    className="font-mono text-sm font-medium hover:underline"
                  >
                    {inv.number}
                  </Link>
                </TableCell>
                <TableCell>{inv.client}</TableCell>
                <TableCell className="hidden sm:table-cell font-mono text-sm text-muted-foreground">
                  {inv.date}
                </TableCell>
                <TableCell className="font-mono tabular-nums">
                  {inv.total.toLocaleString("fr-CA", { minimumFractionDigits: 2 })} $
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
    </div>
  );
}
