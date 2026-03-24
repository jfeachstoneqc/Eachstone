import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Plus, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

// Mock data — will be replaced with Supabase query
const mockClient = {
  id: "1",
  name: "Marie-Claude Tremblay",
  phone: "(819) 555-1234",
  email: "marie@email.ca",
  address: "123 rue Laviolette",
  city: "Trois-Rivières",
  status: "active",
  source: "referral",
  notes: "Très bonne cliente, toujours ponctuelle pour les paiements.",
  jobs: [
    { id: "j1", title: "Peinture cuisine", date: "2026-03-15", amount: 450, status: "completed" },
    { id: "j2", title: "Réparation robinet", date: "2026-02-20", amount: 185, status: "completed" },
    { id: "j3", title: "Installation tablettes", date: "2026-01-10", amount: 320, status: "completed" },
  ],
};

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // TODO: fetch client by id from Supabase
  void id;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard/clients">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {mockClient.name}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="default">Actif</Badge>
            <span className="text-sm text-muted-foreground">
              Source: Référence
            </span>
          </div>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Nouveau travail
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Contact info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="font-mono">{mockClient.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              {mockClient.email}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              {mockClient.address}, {mockClient.city}
            </div>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground mb-1">Notes</p>
              <p className="text-sm">{mockClient.notes}</p>
            </div>
          </CardContent>
        </Card>

        {/* Job history */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Historique des travaux
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockClient.jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between rounded-lg border px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">{job.title}</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {job.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="default">Complété</Badge>
                    <span className="text-sm font-mono tabular-nums">
                      {job.amount} $
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
