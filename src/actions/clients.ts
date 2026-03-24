"use server";

import { createClient } from "@/lib/supabase/server";

export type ClientActionState = { success: boolean; error: string | null };

export async function createClientAction(
  prevState: ClientActionState,
  formData: FormData
): Promise<ClientActionState> {
  const supabase = await createClient();

  const name = formData.get("name") as string | null;
  if (!name?.trim()) {
    return { success: false, error: "Le nom est requis." };
  }

  const { error } = await supabase.from("clients").insert({
    name: name.trim(),
    phone: (formData.get("phone") as string | null) ?? null,
    email: (formData.get("email") as string | null) ?? null,
    address: (formData.get("address") as string | null) ?? null,
    city: (formData.get("city") as string | null) ?? "Trois-Rivières",
    source: (formData.get("source") as string | null) ?? null,
    notes: (formData.get("notes") as string | null) ?? null,
    status: "active",
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

export async function updateClientAction(
  id: string,
  prevState: ClientActionState,
  formData: FormData
): Promise<ClientActionState> {
  const supabase = await createClient();

  const name = formData.get("name") as string | null;
  if (!name?.trim()) {
    return { success: false, error: "Le nom est requis." };
  }

  const { error } = await supabase
    .from("clients")
    .update({
      name: name.trim(),
      phone: (formData.get("phone") as string | null) ?? null,
      email: (formData.get("email") as string | null) ?? null,
      address: (formData.get("address") as string | null) ?? null,
      city: (formData.get("city") as string | null) ?? "Trois-Rivières",
      source: (formData.get("source") as string | null) ?? null,
      status: (formData.get("status") as string | null) ?? "active",
      notes: (formData.get("notes") as string | null) ?? null,
    })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

export async function deleteClientAction(
  id: string
): Promise<ClientActionState> {
  const supabase = await createClient();

  const { error } = await supabase.from("clients").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}
