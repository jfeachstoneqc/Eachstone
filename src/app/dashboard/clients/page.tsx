"use client";

import { useState } from "react";
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

// Mock data
const mockClients = [
  { id: "1", name: "Marie-Claude Tremblay", phone: "(819) 555-1234", city: "Trois-Rivières", jobs: 5, lastJob: "2026-03-15", status: "active" },
  { id: "2", name: "Jean-Pierre Lavoie", phone: "(819) 555-2345", city: "Cap-de-la-Madeleine", jobs: 3, lastJob: "2026-03-10", status: "active" },
  { id: "3", name: "Sophie Bergeron", phone: "(819) 555-3456", city: "Sainte-Marthe-du-Cap", jobs: 1, lastJob: "2026-02-28", status: "active" },
  { id: "4", name: "Marc-André Dufresne", phone: "(819) 555-4567", city: "Pointe-du-Lac", jobs: 2, lastJob: "2026-03-20", status: "active" },
  { id: "5", name: "Isabelle Roy", phone: "(819) 555-5678", city: "Trois-Rivières", jobs: 0, lastJob: "-", status: "lead" },
];

const statusBadge: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  active: { label: "Actif", variant: "default" },
  inactive: { label: "Inactif", variant: "secondary" },
  lead: { label: "Lead", variant: "outline" },
};

export default function ClientsPage() {
  const [search, setSearch] = useState("");

  const filtered = mockClients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
        <Dialog>
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
            <form className="space-y-4">
              <div className="space-y-2">
                <Label>Nom complet *</Label>
                <Input placeholder="Nom du client" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Téléphone *</Label>
                  <Input placeholder="(819) 555-1234" />
                </div>
                <div className="space-y-2">
                  <Label>Courriel</Label>
                  <Input type="email" placeholder="client@courriel.ca" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Adresse</Label>
                <Input placeholder="123 rue Principale" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Ville</Label>
                  <Input defaultValue="Trois-Rivières" />
                </div>
                <div className="space-y-2">
                  <Label>Source</Label>
                  <Select>
                    <SelectTrigger>
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
                <Label>Notes</Label>
                <Textarea placeholder="Notes sur le client..." />
              </div>
              <Button type="submit" className="w-full">
                Ajouter le client
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
              <TableHead className="hidden md:table-cell">Jobs</TableHead>
              <TableHead className="hidden lg:table-cell">Dernier job</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((client) => {
              const badge = statusBadge[client.status] ?? statusBadge.active;
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
                    {client.phone}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {client.city}
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-mono">
                    {client.jobs}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground font-mono text-sm">
                    {client.lastJob}
                  </TableCell>
                  <TableCell>
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
