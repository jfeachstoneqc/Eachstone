"use client";

import { useState, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { createClientAction, type ClientActionState } from "@/actions/clients";

export type ClientRow = {
  id: string;
  name: string;
  phone: string | null;
  city: string | null;
  status: string | null;
  created_at: string;
};

const statusBadge: Record<
  string,
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  active: { label: "Actif", variant: "default" },
  inactive: { label: "Inactif", variant: "secondary" },
  lead: { label: "Lead", variant: "outline" },
};

const initialState: ClientActionState = { success: false, error: null };

export function ClientsView({ initialClients }: { initialClients: ClientRow[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    createClientAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      setOpen(false);
      router.refresh();
    }
  }, [state.success, router]);

  const filtered = initialClients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone ?? "").includes(search) ||
      (c.city ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouveau client</DialogTitle>
            </DialogHeader>
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet *</Label>
                <Input id="name" name="name" placeholder="Nom du client" required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input id="phone" name="phone" placeholder="(819) 555-1234" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Courriel</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="client@courriel.ca"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="123 rue Principale"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    name="city"
                    defaultValue="Trois-Rivières"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="source">Source</Label>
                  <Select name="source">
                    <SelectTrigger id="source">
                      <SelectValue placeholder="Source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="referral">Référence</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="website">Site web</SelectItem>
                      <SelectItem value="walk-in">Sans rendez-vous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Notes sur le client..."
                />
              </div>
              {state.error && (
                <p className="text-sm text-destructive">{state.error}</p>
              )}
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "Enregistrement..." : "Ajouter le client"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Rechercher un client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead className="hidden sm:table-cell">Ville</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground py-8"
                >
                  Aucun client trouvé
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((client) => {
                const badge =
                  statusBadge[client.status ?? "active"] ?? statusBadge.active;
                return (
                  <TableRow key={client.id}>
                    <TableCell>
                      <Link
                        href={`/dashboard/clients/${client.id}`}
                        className="font-medium hover:underline"
                      >
                        {client.name}
                      </Link>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {client.phone ?? "—"}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {client.city ?? "—"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
