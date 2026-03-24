import { createClient } from "@/lib/supabase/server";
import { CalculatorClient } from "./calculator-client";

export default async function CalculatorPage() {
  const supabase = await createClient();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const startOfYear = new Date(now.getFullYear(), 0, 1).toISOString();

  // Revenus et heures ce mois
  const { data: monthJobs } = await supabase
    .from("jobs")
    .select("total_amount, actual_hours, payment_method")
    .eq("status", "completed")
    .gte("created_at", startOfMonth);

  const monthlyRevenue = (monthJobs ?? []).reduce((s, j) => s + (j.total_amount ?? 0), 0);
  const monthlyHours = (monthJobs ?? []).reduce((s, j) => s + (j.actual_hours ?? 0), 0);

  // Dépenses ce mois (table optionnelle — graceful fallback)
  const { data: expensesData } = await supabase
    .from("expenses")
    .select("amount")
    .gte("created_at", startOfMonth);

  const monthlyExpenses = (expensesData ?? []).reduce((s, e) => s + (e.amount ?? 0), 0);

  // Taux horaire moyen (sur l'année)
  const { data: yearJobs } = await supabase
    .from("jobs")
    .select("total_amount, actual_hours")
    .eq("status", "completed")
    .gte("created_at", startOfYear)
    .not("actual_hours", "is", null)
    .gt("actual_hours", 0);

  const totalRevYear = (yearJobs ?? []).reduce((s, j) => s + (j.total_amount ?? 0), 0);
  const totalHrsYear = (yearJobs ?? []).reduce((s, j) => s + (j.actual_hours ?? 0), 0);
  const avgHourlyRate = totalHrsYear > 0 ? totalRevYear / totalHrsYear : 0;

  // Nombre de jobs complétés ce mois
  const completedCount = (monthJobs ?? []).length;
  const avgJobAmount = completedCount > 0 ? monthlyRevenue / completedCount : 0;

  // Jours écoulés ce mois
  const daysElapsed = now.getDate();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  return (
    <CalculatorClient
      monthlyRevenue={monthlyRevenue}
      monthlyExpenses={monthlyExpenses}
      monthlyHours={monthlyHours}
      avgHourlyRate={avgHourlyRate}
      avgJobAmount={avgJobAmount}
      daysElapsed={daysElapsed}
      daysInMonth={daysInMonth}
      currentMonth={now.toLocaleDateString("fr-CA", { month: "long", year: "numeric" })}
    />
  );
}
