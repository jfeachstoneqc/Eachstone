import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon } from "lucide-react";
import Link from "next/link";
import { JOB_STATUS_LABELS, type JobStatus } from "@/lib/constants";

const statusVariant: Record<JobStatus, "default" | "secondary" | "outline" | "destructive"> = {
  pending: "outline",
  scheduled: "outline",
  in_progress: "secondary",
  completed: "default",
  cancelled: "destructive",
};

export default async function CalendarPage() {
  const supabase = await createClient();

  const { data: jobsData } = await supabase
    .from("jobs")
    .select("id, title, scheduled_date, status, clients(name)")
    .in("status", ["pending", "scheduled", "in_progress"])
    .not("scheduled_date", "is", null)
    .order("scheduled_date", { ascending: true })
    .limit(30);

  type ScheduledJob = {
    id: string;
    title: string;
    scheduled_date: string;
    status: JobStatus;
    clientName: string;
  };

  const jobs: ScheduledJob[] = (jobsData ?? []).map((j) => {
    const clientRaw = j.clients;
    const clientName = Array.isArray(clientRaw)
      ? ((clientRaw[0] as { name?: string })?.name ?? "—")
      : ((clientRaw as { name?: string } | null)?.name ?? "—");
    return {
      id: j.id,
      title: j.title,
      scheduled_date: j.scheduled_date as string,
      status: (j.status as JobStatus) ?? "pending",
      clientName,
    };
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Calendrier</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <CalendarIcon className="h-4 w-4" />
            Travaux à venir
          </CardTitle>
        </CardHeader>
        <CardContent>
          {jobs.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              Aucun travail planifié.
            </p>
          ) : (
            <div className="space-y-3">
              {jobs.map((job) => {
                const d = new Date(job.scheduled_date + "T00:00:00");
                return (
                  <Link key={job.id} href={`/dashboard/jobs/${job.id}`}>
                    <div className="flex items-center justify-between rounded-lg border px-4 py-3 hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="text-center w-10">
                          <p className="font-mono text-xs text-muted-foreground capitalize">
                            {d.toLocaleDateString("fr-CA", { weekday: "short" })}
                          </p>
                          <p className="font-mono text-lg font-semibold tabular-nums leading-tight">
                            {d.getDate()}
                          </p>
                          <p className="font-mono text-xs text-muted-foreground">
                            {d.toLocaleDateString("fr-CA", { month: "short" })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{job.title}</p>
                          <p className="text-xs text-muted-foreground">{job.clientName}</p>
                        </div>
                      </div>
                      <Badge variant={statusVariant[job.status]}>
                        {JOB_STATUS_LABELS[job.status]}
                      </Badge>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
