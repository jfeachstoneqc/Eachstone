"use server";

import { createClient } from "@/lib/supabase/server";

export type ExpenseActionState = { success: boolean; error: string | null };

export async function createExpenseAction(
  prevState: ExpenseActionState,
  formData: FormData
): Promise<ExpenseActionState> {
  const supabase = await createClient();

  const description = formData.get("description") as string | null;
  if (!description?.trim()) {
    return { success: false, error: "La description est requise." };
  }

  const amountRaw = formData.get("amount") as string | null;
  if (!amountRaw || parseFloat(amountRaw) <= 0) {
    return { success: false, error: "Le montant est requis." };
  }

  const date = formData.get("date") as string | null;
  if (!date?.trim()) {
    return { success: false, error: "La date est requise." };
  }

  const category = formData.get("category") as string | null;
  if (!category?.trim()) {
    return { success: false, error: "La catégorie est requise." };
  }

  const jobIdRaw = formData.get("job_id") as string | null;
  const jobId = jobIdRaw?.trim() || null;

  const { error } = await supabase.from("expenses").insert({
    description: description.trim(),
    amount: parseFloat(amountRaw),
    date: date.trim(),
    category: category.trim(),
    job_id: jobId,
    receipt_url: (formData.get("receipt_url") as string | null) ?? null,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

export async function deleteExpenseAction(
  id: string
): Promise<ExpenseActionState> {
  const supabase = await createClient();

  const { error } = await supabase.from("expenses").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}
