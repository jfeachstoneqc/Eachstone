"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirm) {
      setMsg({ type: "error", text: "Les mots de passe ne correspondent pas." });
      return;
    }
    if (newPassword.length < 6) {
      setMsg({ type: "error", text: "Le mot de passe doit contenir au moins 6 caractères." });
      return;
    }
    setSaving(true);
    setMsg(null);

    const supabase = createClient();
    // Re-authenticate then update
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) {
      setMsg({ type: "error", text: "Session expirée. Reconnectez-vous." });
      setSaving(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });
    if (signInError) {
      setMsg({ type: "error", text: "Mot de passe actuel incorrect." });
      setSaving(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSaving(false);
    if (error) {
      setMsg({ type: "error", text: "Erreur lors de la mise à jour." });
    } else {
      setMsg({ type: "success", text: "Mot de passe mis à jour avec succès." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Paramètres</h1>

      <div className="max-w-2xl space-y-6">
        {/* Business info — display only */}
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
                <Input defaultValue="Eachstone" disabled />
              </div>
              <div className="space-y-2">
                <Label>Téléphone</Label>
                <Input defaultValue="(819) 201-3214" disabled />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Courriel</Label>
                <Input defaultValue="contact@eachstone.store" disabled />
              </div>
              <div className="space-y-2">
                <Label>Ville</Label>
                <Input defaultValue="Trois-Rivières" disabled />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Password change */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Changer le mot de passe</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label>Mot de passe actuel</Label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Nouveau mot de passe</Label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Confirmer le nouveau mot de passe</Label>
                <Input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </div>

              {msg && (
                <p className={`text-sm ${msg.type === "success" ? "text-green-500" : "text-destructive"}`}>
                  {msg.text}
                </p>
              )}

              <Button type="submit" size="sm" disabled={saving}>
                {saving ? "Mise à jour..." : "Changer le mot de passe"}
              </Button>
            </form>

            <Separator className="my-6" />
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Facturation — TPS 5% · TVQ 9,975%</p>
              <p className="text-xs text-muted-foreground">Préfixe de facture : EACH-</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
