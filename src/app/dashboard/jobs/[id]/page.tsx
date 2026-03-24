import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, FileText, MapPin, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  void id;

  // Mock data
  const job = {
    title: "Réparation terrasse",
    client: "Marc-André Dufresne",
    status: "in_progress",
    priority: "high",
    address: "456 boul. des Forges, Trois-Rivières",
    scheduledDate: "2026-03-23",
    estimatedHours: 8,
    actualHours: 5.5,
    items: [
      { description: "Main-d'œuvre — réparation structure", qty: 6, price: 60, total: 360 },
      { description: "Bois traité — planches 2x6", qty: 12, price: 18, total: 216 },
      { description: "Vis à terrasse inox", qty: 2, price: 24, total: 48 },
    ],
    notes: "Remplacer 4 planches pourries et renforcer la structure. Client fournit la teinture.",
  };

  const subtotal = job.items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard/jobs">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {job.title}
          </h1>
          <p className="text-sm text-muted-foreground">{job.client}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">En cours</Badge>
          <Badge variant="destructive">Haute priorité</Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Détails du travail
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {job.address}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono">{job.scheduledDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono">{job.actualHours}h / {job.estimatedHours}h estimées</span>
              </div>
            </div>

            <Separator />

            {/* Items */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Items</p>
              {job.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">
                    {item.description}{" "}
                    <span className="font-mono">
                      ({item.qty} × {item.price} $)
                    </span>
                  </span>
                  <span className="font-mono tabular-nums">{item.total} $</span>
                </div>
              ))}
              <Separator />
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>Sous-total</span>
                <span className="font-mono tabular-nums">{subtotal} $</span>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-xs text-muted-foreground mb-1">Notes</p>
              <p className="text-sm">{job.notes}</p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="default">
              Marquer comme complété
            </Button>
            <Button className="w-full gap-2" variant="outline">
              <FileText className="h-4 w-4" />
              Générer facture
            </Button>
            <Separator />
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Paiement</p>
              <Badge variant="outline">Non payé</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
