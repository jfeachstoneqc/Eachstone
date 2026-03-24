import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, FileText, MapPin, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { JobActions } from "@/components/dashboard/job-actions";
import { JOB_STATUS_LABELS, JOB_PRIORITY_LABELS, type JobStatus, type JobPriority } from "@/lib/constants";

const priorityVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  low: "secondary",
  normal: "outline",
  high: "secondary",
  urgent: "destructive",
};

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: job } = await supabase
    .from("jobs")
    .select("*, clients(name, phone, address, city), job_items(*)")
    .eq("id", id)
    .single();

  if (!job) {
    return (
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard/jobs">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <p className="text-muted-foreground">Travail introuvable.</p>
      </div>
    );
  }

  type JobItem = {
    id: string;
    description: string | null;
    quantity: number | null;
    unit_price: number | null;
    total: number | null;
  };

  const items: JobItem[] = Array.isArray(job.job_items) ? job.job_items : [];
  const clientData = Array.isArray(job.clients)
    ? (job.clients[0] ?? null)
    : (job.clients as { name: string; phone: string | null; address: string | null; city: string | null } | null);

  const subtotal = items.length > 0
    ? items.reduce((sum, item) => sum + (item.total ?? 0), 0)
    : (job.total_amount ?? 0);

  const jobStatus = job.status as JobStatus;
  const jobPriority = (job.priority ?? "normal") as JobPriority;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard/jobs">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {job.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {clientData?.name ?? "—"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {JOB_STATUS_LABELS[jobStatus] ?? jobStatus}
          </Badge>
          <Badge variant={priorityVariant[jobPriority] ?? "outline"}>
            {JOB_PRIORITY_LABELS[jobPriority] ?? jobPriority}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Détails du travail
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {job.address && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {job.address}
                </div>
              )}
              {job.scheduled_date && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono">{job.scheduled_date}</span>
                </div>
              )}
              {(job.actual_hours != null || job.estimated_hours != null) && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono">
                    {job.actual_hours ?? 0}h / {job.estimated_hours ?? 0}h estimées
                  </span>
                </div>
              )}
            </div>

            {job.description && (
              <>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Description</p>
                  <p className="text-sm">{job.description}</p>
                </div>
              </>
            )}

            <Separator />

            {/* Items */}
            {items.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm font-medium">Items</p>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {item.description ?? "—"}{" "}
                      {item.quantity != null && item.unit_price != null && (
                        <span className="font-mono">
                          ({item.quantity} × {item.unit_price} $)
                        </span>
                      )}
                    </span>
                    <span className="font-mono tabular-nums">
                      {(item.total ?? 0).toFixed(2)} $
                    </span>
                  </div>
                ))}
                <Separator />
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>Sous-total</span>
                  <span className="font-mono tabular-nums">{subtotal.toFixed(2)} $</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-medium">Montant</p>
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>Total</span>
                  <span className="font-mono tabular-nums">
                    {job.total_amount != null ? `${job.total_amount} $` : "—"}
                  </span>
                </div>
              </div>
            )}

            {job.notes && (
              <>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm">{job.notes}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <JobActions jobId={job.id} status={job.status} />
            <Button className="w-full gap-2" variant="outline">
              <FileText className="h-4 w-4" />
              Générer facture
            </Button>
            <Separator />
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Paiement</p>
              <Badge variant="outline">
                {job.payment_status === "paid" ? "Payé" : "Non payé"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
