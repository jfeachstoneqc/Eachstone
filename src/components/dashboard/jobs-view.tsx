"use client";

import { useState, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import Link from "next/link";
import { createJobAction, type JobActionState } from "@/actions/jobs";
import { JOB_STATUS_LABELS, type JobStatus } from "@/lib/constants";

export type JobRow = {
  id: string;
  title: string;
  status: string;
  priority: string | null;
  total_amount: number | null;
  scheduled_date: string | null;
  clients: { name: string } | null;
};

const priorityColor: Record<string, string> = {
  low: "text-muted-foreground",
  normal: "text-foreground",
  high: "text-orange-500",
  urgent: "text-destructive",
};

const statusColumns: JobStatus[] = [
  "pending",
  "scheduled",
  "in_progress",
  "completed",
];

const initialState: JobActionState = { success: false, error: null };

export function JobsView({ initialJobs }: { initialJobs: JobRow[] }) {
  const router = useRouter();
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    createJobAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      setOpen(false);
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Travaux</h1>
        <div className="flex items-center gap-2">
          <Tabs
            value={view}
            onValueChange={(v) => setView(v as "kanban" | "list")}
          >
            <TabsList>
              <TabsTrigger value="kanban">Kanban</TabsTrigger>
              <TabsTrigger value="list">Liste</TabsTrigger>
            </TabsList>
          </Tabs>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Nouveau travail
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nouveau travail</DialogTitle>
              </DialogHeader>
              <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Ex: Réparation robinet"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client_name">Nom du client</Label>
                  <Input
                    id="client_name"
                    name="client_name"
                    placeholder="Nom du client"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="123 rue Principale, Trois-Rivières"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="scheduled_date">Date planifiée</Label>
                    <Input
                      id="scheduled_date"
                      name="scheduled_date"
                      type="date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priorité</Label>
                    <Select name="priority" defaultValue="normal">
                      <SelectTrigger id="priority">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Basse</SelectItem>
                        <SelectItem value="normal">Normale</SelectItem>
                        <SelectItem value="high">Haute</SelectItem>
                        <SelectItem value="urgent">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total_amount">Montant estimé ($)</Label>
                  <Input
                    id="total_amount"
                    name="total_amount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Notes sur le travail..."
                  />
                </div>
                {state.error && (
                  <p className="text-sm text-destructive">{state.error}</p>
                )}
                <Button type="submit" className="w-full" disabled={pending}>
                  {pending ? "Enregistrement..." : "Créer le travail"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {view === "kanban" ? (
        <div className="grid gap-4 lg:grid-cols-4">
          {statusColumns.map((status) => {
            const jobs = initialJobs.filter((j) => j.status === status);
            return (
              <div key={status} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {JOB_STATUS_LABELS[status]}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {jobs.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {jobs.map((job) => (
                    <Link key={job.id} href={`/dashboard/jobs/${job.id}`}>
                      <Card className="cursor-pointer transition-colors hover:bg-accent/50">
                        <CardContent className="p-3">
                          <p className="text-sm font-medium">{job.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {job.clients?.name ?? "—"}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-mono text-xs tabular-nums text-muted-foreground">
                              {job.total_amount != null
                                ? `${job.total_amount} $`
                                : "—"}
                            </span>
                            <span
                              className={`text-xs ${priorityColor[job.priority ?? "normal"]}`}
                            >
                              {job.scheduled_date ?? ""}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                  {jobs.length === 0 && (
                    <div className="rounded-lg border border-dashed p-4 text-center text-xs text-muted-foreground">
                      Aucun travail
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Tous les travaux
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {initialJobs.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  Aucun travail
                </p>
              ) : (
                initialJobs.map((job) => (
                  <Link key={job.id} href={`/dashboard/jobs/${job.id}`}>
                    <div className="flex items-center justify-between rounded-lg border px-4 py-3 hover:bg-accent/50 transition-colors">
                      <div>
                        <p className="text-sm font-medium">{job.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {job.clients?.name ?? "—"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">
                          {JOB_STATUS_LABELS[job.status as JobStatus] ??
                            job.status}
                        </Badge>
                        <span className="font-mono text-sm tabular-nums">
                          {job.total_amount != null
                            ? `${job.total_amount} $`
                            : "—"}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
