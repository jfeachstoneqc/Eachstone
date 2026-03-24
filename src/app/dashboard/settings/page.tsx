import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Paramètres</h1>

      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Informations de l&apos;entreprise
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Nom de l&apos;entreprise</Label>
                <Input defaultValue="Eachstone" />
              </div>
              <div className="space-y-2">
                <Label>Téléphone</Label>
                <Input defaultValue="(819) 201-3214" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Courriel</Label>
                <Input defaultValue="contact@eachstone.store" />
              </div>
              <div className="space-y-2">
                <Label>Ville</Label>
                <Input defaultValue="Trois-Rivières" />
              </div>
            </div>
            <Button size="sm">Sauvegarder</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Facturation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>TPS (%)</Label>
                <Input defaultValue="5" type="number" step="0.01" disabled className="font-mono" />
              </div>
              <div className="space-y-2">
                <Label>TVQ (%)</Label>
                <Input defaultValue="9.975" type="number" step="0.001" disabled className="font-mono" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Préfixe de facture</Label>
              <Input defaultValue="EACH" className="font-mono" />
            </div>
            <Separator />
            <p className="text-xs text-muted-foreground">
              Les taux de taxes sont fixés par le gouvernement du Québec et ne
              peuvent pas être modifiés.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
