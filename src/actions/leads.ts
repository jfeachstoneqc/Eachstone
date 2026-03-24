"use server";

import { createClient } from "@/lib/supabase/server";

export type LeadFormState = {
  success: boolean;
  error: string | null;
};

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = (formData.get("email") as string) || null;
  const service_type = (formData.get("service_type") as string) || null;
  const message = (formData.get("message") as string) || null;

  if (!name || !phone) {
    return { success: false, error: "Le nom et le téléphone sont requis." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    name,
    phone,
    email,
    service_type,
    message,
  });

  if (error) {
    return { success: false, error: "Une erreur est survenue. Veuillez réessayer." };
  }

  return { success: true, error: null };
}
