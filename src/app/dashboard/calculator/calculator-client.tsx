"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Target, TrendingUp, DollarSign } from "lucide-react";

interface Props {
  monthlyRevenue: number;
  monthlyExpenses: number;
  monthlyHours: number;
  avgHourlyRate: number;
  avgJobAmount: number;
  daysElapsed: number;
  daysInMonth: number;
  currentMonth: string;
}

export function CalculatorClient({
  monthlyRevenue,
  monthlyExpenses,
  monthlyHours,
  avgHourlyRate,
  avgJobAmount,
  daysElapsed,
  daysInMonth,
  currentMonth,
}: Props) {
  const [monthlyGoal, setMonthlyGoal] = useState(10000);
  const [dailyHours, setDailyHours] = useState(0);
  const [dailyAmount, setDailyAmount] = useState(0);

  const workingDays = 22;
  const dailyGoal = monthlyGoal / workingDays;
  const effectiveRate = avgHourlyRate > 0 ? avgHourlyRate : 55;
  const effectiveAvgJob = avgJobAmount > 0 ? avgJobAmount : 400;
  const requiredHoursPerDay = dailyGoal / effectiveRate;
  const requiredJobsPerDay = dailyGoal / effectiveAvgJob;

  const monthlyNet = monthlyRevenue - monthlyExpenses;
  const projectedMonthly = daysElapsed > 0
    ? (monthlyRevenue / daysElapsed) * daysInMonth
    : 0;

  const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        Calculateur de revenus
      </h1>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Goal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Target className="h-4 w-4" />
              Objectif mensuel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Objectif ($)</Label>
              <Input
                type="number"
                value={monthlyGoal}
                onChange={(e) => setMonthlyGoal(Number(e.target.value))}
                className="font-mono"
              />
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Objectif quotidien</span>
                <span className="font-mono tabular-nums">{dailyGoal.toFixed(0)} $</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Heures/jour requises</span>
                <span className="font-mono tabular-nums">{requiredHoursPerDay.toFixed(1)}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Jobs/jour requis</span>
                <span className="font-mono tabular-nums">{requiredJobsPerDay.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taux horaire moyen (réel)</span>
                <span className="font-mono tabular-nums">
                  {effectiveRate > 0 ? effectiveRate.toFixed(2) : "—"} $/h
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              Tracker quotidien
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Heures aujourd&apos;hui</Label>
                <Input
                  type="number"
                  step="0.5"
                  value={dailyHours}
                  onChange={(e) => setDailyHours(Number(e.target.value))}
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label>Montant gagné ($)</Label>
                <Input
                  type="number"
                  value={dailyAmount}
                  onChange={(e) => setDailyAmount(Number(e.target.value))}
                  className="font-mono"
                />
              </div>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Revenu du jour</span>
                <span className="font-mono tabular-nums font-semibold">{dailyAmount} $</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taux horaire du jour</span>
                <span className="font-mono tabular-nums">
                  {dailyHours > 0 ? (dailyAmount / dailyHours).toFixed(2) : "—"} $/h
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">vs objectif quotidien</span>
                <span
                  className={`font-mono tabular-nums ${
                    dailyAmount >= dailyGoal ? "text-green-500" : "text-muted-foreground"
                  }`}
                >
                  {dailyAmount >= dailyGoal
                    ? "Atteint ✓"
                    : `${(dailyGoal - dailyAmount).toFixed(0)} $ restant`}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Summary — real data */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <DollarSign className="h-4 w-4" />
              Résumé mensuel — {capitalizedMonth}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              <div>
                <p className="text-xs text-muted-foreground">Revenu brut</p>
                <p className="text-2xl font-semibold font-mono tabular-nums">
                  {monthlyRevenue.toLocaleString("fr-CA")} $
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Dépenses</p>
                <p className="text-2xl font-semibold font-mono tabular-nums text-destructive">
                  -{monthlyExpenses.toLocaleString("fr-CA")} $
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Revenu net</p>
                <p className={`text-2xl font-semibold font-mono tabular-nums ${monthlyNet >= 0 ? "text-green-500" : "text-destructive"}`}>
                  {monthlyNet.toLocaleString("fr-CA")} $
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Heures travaillées</p>
                <p className="text-2xl font-semibold font-mono tabular-nums">
                  {monthlyHours > 0 ? `${monthlyHours.toFixed(1)}h` : "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Projection fin de mois</p>
                <p className="text-2xl font-semibold font-mono tabular-nums">
                  {projectedMonthly > 0
                    ? projectedMonthly.toLocaleString("fr-CA", { maximumFractionDigits: 0 }) + " $"
                    : "—"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
