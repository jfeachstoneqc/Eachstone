"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { JOB_STATUS_LABELS, type JobStatus } from "@/lib/constants";

// Mock data
const mockJobs = [
  { id: "1", title: "Peinture salon", client: "Sophie Bergeron", status: "pending" as const, priority: "normal", amount: 750, date: "2026-03-25" },
  { id: "2", title: "Installation tablettes", client: "Jean Lavoie", status: "scheduled" as const, priority: "normal", amount: 320, date: "2026-03-26" },
  { id: "3", title: "Réparation terrasse", client: "Marc Dufresne", status: "in_progress" as const, priority: "high", amount: 1200, date: "2026-03-23" },
  { id: "4", title: "Changement luminaire", client: "Isabelle Roy", status: "completed" as const, priority: "low", amount: 120, date: "2026-03-22" },
  { id: "5", title: "Réparation robinet", client: "Marie Tremblay", status: "completed" as const, priority: "urgent", amount: 185, date: "2026-03-21" },
  { id: "6", title: "Peinture chambre", client: "Luc Fortin", status: "pending" as const, priority: "normal", amount: 550, date: "2026-03-28" },
];

const priorityColor: Record<string, string> = {
  low: "text-muted-foreground",
  normal: "text-foreground",
  high: "text-orange-500",
  urgent: "text-destructive",
};

const statusColumns: JobStatus[] = ["pending", "scheduled", "in_progress", "completed"];

export default function JobsPage() {
  const [view, setView] = useState<"kanban" | "list">("kanban");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Travaux</h1>
        <div className="flex items-center gap-2">
          <Tabs value={view} onValueChange={(v) => setView(v as "kanban" | "list")}>
            <TabsList>
              <TabsTrigger value="kanban">Kanban</TabsTrigger>
              <TabsTrigger value="list">Liste</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Nouveau travail
          </Button>
        </div>
      </div>

      {view === "kanban" ? (
        <div className="grid gap-4 lg:grid-cols-4">
          {statusColumns.map((status) => {
            const jobs = mockJobs.filter((j) => j.status === status);
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
                            {job.client}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-mono text-xs tabular-nums text-muted-foreground">
                              {job.amount} $
                            </span>
                            <span className={`text-xs ${priorityColor[job.priority]}`}>
                              {job.date}
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
              {mockJobs.map((job) => (
                <Link key={job.id} href={`/dashboard/jobs/${job.id}`}>
                  <div className="flex items-center justify-between rounded-lg border px-4 py-3 hover:bg-accent/50 transition-colors">
                    <div>
                      <p className="text-sm font-medium">{job.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {job.client}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">
                        {JOB_STATUS_LABELS[job.status]}
                      </Badge>
                      <span className="font-mono text-sm tabular-nums">
                        {job.amount} $
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
