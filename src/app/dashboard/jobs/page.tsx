import { createClient } from "@/lib/supabase/server";
import { JobsView, type JobRow } from "@/components/dashboard/jobs-view";

export default async function JobsPage() {
  const supabase = await createClient();

  const { data: jobsData } = await supabase
    .from("jobs")
    .select("id, title, status, priority, total_amount, scheduled_date, clients(name)")
    .order("created_at", { ascending: false });

  const jobs: JobRow[] = (jobsData ?? []).map((j) => ({
    id: j.id,
    title: j.title,
    status: j.status,
    priority: j.priority ?? null,
    total_amount: j.total_amount ?? null,
    scheduled_date: j.scheduled_date ?? null,
    clients: Array.isArray(j.clients)
      ? (j.clients[0] ? { name: (j.clients[0] as { name: string }).name } : null)
      : (j.clients as { name: string } | null),
  }));

  return <JobsView initialJobs={jobs} />;
}
