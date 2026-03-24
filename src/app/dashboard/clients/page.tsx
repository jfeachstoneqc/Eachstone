import { createClient } from "@/lib/supabase/server";
import { ClientsView, type ClientRow } from "@/components/dashboard/clients-view";

export default async function ClientsPage() {
  const supabase = await createClient();

  const { data: clientsData } = await supabase
    .from("clients")
    .select("id, name, phone, city, status, created_at")
    .order("created_at", { ascending: false });

  const clients: ClientRow[] = (clientsData ?? []).map((c) => ({
    id: c.id,
    name: c.name,
    phone: c.phone ?? null,
    city: c.city ?? null,
    status: c.status ?? null,
    created_at: c.created_at,
  }));

  return <ClientsView initialClients={clients} />;
}
