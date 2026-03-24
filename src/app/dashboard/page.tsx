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

// Mock data — will be replaced with Supabase queries
const mockKpis = {
  monthlyRevenue: 8450,
  weeklyRevenue: 2150,
  completedJobs: 12,
  avgHourlyRate: 58.5,
  pendingJobs: 4,
  overduePayments: 1,
};

const mockRevenueData = [
  { month: "Oct", revenue: 6200 },
  { month: "Nov", revenue: 7800 },
  { month: "Déc", revenue: 5400 },
  { month: "Jan", revenue: 7100 },
  { month: "Fév", revenue: 8900 },
  { month: "Mars", revenue: 8450 },
];

const mockPaymentData = [
  { name: "Comptant", value: 4200, color: "#2D5016" },
  { name: "Interac", value: 3100, color: "#B87333" },
  { name: "Chèque", value: 1150, color: "#4A5568" },
];

const mockRecentJobs = [
  {
    id: "1",
    title: "Réparation de robinet",
    client: "Marie Tremblay",
    status: "completed",
    amount: 185,
  },
  {
    id: "2",
    title: "Installation tablettes",
    client: "Jean Lavoie",
    status: "in_progress",
    amount: 320,
  },
  {
    id: "3",
    title: "Peinture salon",
    client: "Sophie Bergeron",
    status: "scheduled",
    amount: 750,
  },
  {
    id: "4",
    title: "Réparation terrasse",
    client: "Marc Dufresne",
    status: "pending",
    amount: 1200,
  },
  {
    id: "5",
    title: "Changement luminaire",
    client: "Isabelle Roy",
    status: "completed",
    amount: 120,
  },
];

const statusBadge: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  completed: { label: "Complété", variant: "default" },
  in_progress: { label: "En cours", variant: "secondary" },
  scheduled: { label: "Planifié", variant: "outline" },
  pending: { label: "En attente", variant: "outline" },
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        Vue d&apos;ensemble
      </h1>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard
          title="Revenus ce mois"
          value={`${mockKpis.monthlyRevenue.toLocaleString("fr-CA")} $`}
          icon={DollarSign}
        />
        <KpiCard
          title="Revenus semaine"
          value={`${mockKpis.weeklyRevenue.toLocaleString("fr-CA")} $`}
          icon={TrendingUp}
        />
        <KpiCard
          title="Jobs complétés"
          value={String(mockKpis.completedJobs)}
          icon={CheckCircle}
          subtitle="Ce mois"
        />
        <KpiCard
          title="Taux horaire moy."
          value={`${mockKpis.avgHourlyRate.toFixed(2)} $`}
          icon={Timer}
        />
        <KpiCard
          title="Jobs en attente"
          value={String(mockKpis.pendingJobs)}
          icon={Clock}
        />
        <KpiCard
          title="Paiements en retard"
          value={String(mockKpis.overduePayments)}
          icon={AlertCircle}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <RevenueChart data={mockRevenueData} />
        <PaymentChart data={mockPaymentData} />
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">
            Activité récente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockRecentJobs.map((job) => {
              const badge = statusBadge[job.status] ?? statusBadge.pending;
              return (
                <div
                  key={job.id}
                  className="flex items-center justify-between rounded-lg border px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{job.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {job.client}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                    <span className="text-sm font-mono tabular-nums text-muted-foreground">
                      {job.amount} $
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
