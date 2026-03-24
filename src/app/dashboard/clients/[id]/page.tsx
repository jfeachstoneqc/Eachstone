import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const statusBadge: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  active: { label: "Actif", variant: "default" },
  inactive: { label: "Inactif", variant: "secondary" },
  lead: { label: "Lead", variant: "outline" },
};

const jobStatusBadge: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  completed: { label: "Complété", variant: "default" },
  in_progress: { label: "En cours", variant: "secondary" },
  scheduled: { label: "Planifié", variant: "outline" },
  pending: { label: "En attente", variant: "outline" },
  cancelled: { label: "Annulé", variant: "destructive" },
};

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  if (!client) {
    return (
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard/clients">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <p className="text-muted-foreground">Client introuvable.</p>
      </div>
    );
  }

  const { data: jobsData } = await supabase
    .from("jobs")
    .select("id, title, scheduled_date, total_amount, status")
    .eq("client_id", id)
    .order("created_at", { ascending: false });

  const jobs = jobsData ?? [];
  const clientStatus = client.status ?? "active";
  const badge = statusBadge[clientStatus] ?? statusBadge.active;

  const sourceLabels: Record<string, string> = {
    referral: "Référence",
    facebook: "Facebook",
    website: "Site web",
    "walk-in": "Sans rendez-vous",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard/clients">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {client.name}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={badge.variant}>{badge.label}</Badge>
            {client.source && (
              <span className="text-sm text-muted-foreground">
                Source: {sourceLabels[client.source] ?? client.source}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Contact info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {client.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono">{client.phone}</span>
              </div>
            )}
            {client.email && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {client.email}
              </div>
            )}
            {(client.address || client.city) && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {[client.address, client.city].filter(Boolean).join(", ")}
              </div>
            )}
            {client.notes && (
              <>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm">{client.notes}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Job history */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Historique des travaux
            </CardTitle>
          </CardHeader>
          <CardContent>
            {jobs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Aucun travail pour ce client
              </p>
            ) : (
              <div className="space-y-3">
                {jobs.map((job) => {
                  const jbadge = jobStatusBadge[job.status] ?? jobStatusBadge.pending;
                  return (
                    <div
                      key={job.id}
                      className="flex items-center justify-between rounded-lg border px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-medium">{job.title}</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {job.scheduled_date ?? "—"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={jbadge.variant}>{jbadge.label}</Badge>
                        <span className="text-sm font-mono tabular-nums">
                          {job.total_amount != null ? `${job.total_amount} $` : "—"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
