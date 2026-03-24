import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon } from "lucide-react";

// Simple calendar placeholder — will integrate a proper calendar library later
export default function CalendarPage() {
  const upcomingJobs = [
    { date: "2026-03-24", title: "Peinture salon", client: "Sophie Bergeron", time: "9h00" },
    { date: "2026-03-25", title: "Installation tablettes", client: "Jean Lavoie", time: "13h00" },
    { date: "2026-03-26", title: "Réparation clôture", client: "Luc Fortin", time: "8h30" },
    { date: "2026-03-28", title: "Peinture chambre", client: "Anne Gagnon", time: "10h00" },
    { date: "2026-03-31", title: "Pose céramique", client: "Pierre Bouchard", time: "8h00" },
  ];

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
          <div className="space-y-3">
            {upcomingJobs.map((job, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border px-4 py-3"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="font-mono text-xs text-muted-foreground">
                      {new Date(job.date).toLocaleDateString("fr-CA", {
                        weekday: "short",
                      })}
                    </p>
                    <p className="font-mono text-lg font-semibold tabular-nums">
                      {new Date(job.date).getDate()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{job.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {job.client}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="font-mono">
                  {job.time}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
