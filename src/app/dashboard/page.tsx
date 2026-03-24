import {
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Timer,
} from "lucide-react";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { PaymentChart } from "@/components/dashboard/payment-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";

const statusBadge: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  completed: { label: "Complété", variant: "default" },
  in_progress: { label: "En cours", variant: "secondary" },
  scheduled: { label: "Planifié", variant: "outline" },
  pending: { label: "En attente", variant: "outline" },
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()).toISOString();

  // Monthly revenue
  const { data: monthlyJobs } = await supabase
    .from("jobs")
    .select("total_amount")
    .eq("status", "completed")
    .gte("created_at", startOfMonth);

  const monthlyRevenue = (monthlyJobs ?? []).reduce(
    (sum, j) => sum + (j.total_amount ?? 0),
    0
  );

  // Weekly revenue
  const { data: weeklyJobs } = await supabase
    .from("jobs")
    .select("total_amount")
    .eq("status", "completed")
    .gte("created_at", startOfWeek);

  const weeklyRevenue = (weeklyJobs ?? []).reduce(
    (sum, j) => sum + (j.total_amount ?? 0),
    0
  );

  // Completed jobs this month count
  const completedJobsCount = (monthlyJobs ?? []).length;

  // Pending jobs count
  const { count: pendingCount } = await supabase
    .from("jobs")
    .select("id", { count: "exact", head: true })
    .in("status", ["pending", "scheduled", "in_progress"]);

  // Overdue payments count
  const { count: overdueCount } = await supabase
    .from("jobs")
    .select("id", { count: "exact", head: true })
    .eq("status", "completed")
    .eq("payment_status", "unpaid");

  // Avg hourly rate from monthly_revenue view
  const { data: monthlyRevData } = await supabase
    .from("monthly_revenue")
    .select("avg_hourly_rate")
    .order("month", { ascending: false })
    .limit(1);

  const avgHourlyRate = monthlyRevData?.[0]?.avg_hourly_rate ?? 0;

  // Revenue chart — last 6 months
  const { data: revenueViewData } = await supabase
    .from("monthly_revenue")
    .select("month, gross_revenue")
    .order("month", { ascending: false })
    .limit(6);

  const revenueChartData = (revenueViewData ?? [])
    .reverse()
    .map((row) => ({
      month: new Date(row.month).toLocaleDateString("fr-CA", { month: "short" }),
      revenue: row.gross_revenue ?? 0,
    }));

  // Payment method breakdown
  const { data: completedJobsAll } = await supabase
    .from("jobs")
    .select("payment_method, total_amount")
    .eq("status", "completed");

  const paymentMap: Record<string, number> = {};
  for (const job of completedJobsAll ?? []) {
    const method = job.payment_method ?? "other";
    paymentMap[method] = (paymentMap[method] ?? 0) + (job.total_amount ?? 0);
  }

  const paymentLabelMap: Record<string, string> = {
    cash: "Comptant",
    cheque: "Chèque",
    interac: "Interac",
    other: "Autre",
  };
  const paymentColors: Record<string, string> = {
    cash: "#2D5016",
    cheque: "#4A5568",
    interac: "#B87333",
    other: "#718096",
  };

  const paymentChartData = Object.entries(paymentMap).map(([key, value]) => ({
    name: paymentLabelMap[key] ?? key,
    value,
    color: paymentColors[key] ?? "#718096",
  }));

  // Recent 5 jobs with client names
  const { data: recentJobsData } = await supabase
    .from("jobs")
    .select("id, title, total_amount, status, clients(name)")
    .order("created_at", { ascending: false })
    .limit(5);

  type RecentJob = {
    id: string;
    title: string;
    total_amount: number | null;
    status: string;
    clients: { name: string } | null;
  };

  const recentJobs: RecentJob[] = (recentJobsData ?? []).map((j) => ({
    id: j.id,
    title: j.title,
    total_amount: j.total_amount,
    status: j.status,
    clients: Array.isArray(j.clients) ? (j.clients[0] ?? null) : (j.clients as { name: string } | null),
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        Vue d&apos;ensemble
      </h1>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard
          title="Revenus ce mois"
          value={`${monthlyRevenue.toLocaleString("fr-CA")} $`}
          icon={DollarSign}
        />
        <KpiCard
          title="Revenus semaine"
          value={`${weeklyRevenue.toLocaleString("fr-CA")} $`}
          icon={TrendingUp}
        />
        <KpiCard
          title="Jobs complétés"
          value={String(completedJobsCount)}
          icon={CheckCircle}
          subtitle="Ce mois"
        />
        <KpiCard
          title="Taux horaire moy."
          value={`${Number(avgHourlyRate).toFixed(2)} $`}
          icon={Timer}
        />
        <KpiCard
          title="Jobs en attente"
          value={String(pendingCount ?? 0)}
          icon={Clock}
        />
        <KpiCard
          title="Paiements en retard"
          value={String(overdueCount ?? 0)}
          icon={AlertCircle}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <RevenueChart data={revenueChartData} />
        <PaymentChart data={paymentChartData} />
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">
            Activité récente
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentJobs.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Aucune activité récente
            </p>
          ) : (
            <div className="space-y-3">
              {recentJobs.map((job) => {
                const badge = statusBadge[job.status] ?? statusBadge.pending;
                return (
                  <div
                    key={job.id}
                    className="flex items-center justify-between rounded-lg border px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{job.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {job.clients?.name ?? "—"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                      <span className="text-sm font-mono tabular-nums text-muted-foreground">
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
  );
}
