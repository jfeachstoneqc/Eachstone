"use server";

import { createClient } from "@/lib/supabase/server";
import { TPS_RATE, TVQ_RATE, INVOICE_PREFIX } from "@/lib/constants";

export type InvoiceActionState = { success: boolean; error: string | null; id?: string };

export async function createInvoiceAction(
  prevState: InvoiceActionState,
  formData: FormData
): Promise<InvoiceActionState> {
  const supabase = await createClient();

  const clientId = formData.get("client_id") as string | null;
  if (!clientId?.trim()) {
    return { success: false, error: "Le client est requis." };
  }

  const subtotalRaw = formData.get("subtotal") as string | null;
  const subtotal = subtotalRaw ? parseFloat(subtotalRaw) : 0;
  const tps = Math.round(subtotal * TPS_RATE * 100) / 100;
  const tvq = Math.round(subtotal * TVQ_RATE * 100) / 100;
  const total = Math.round((subtotal + tps + tvq) * 100) / 100;

  // Generate invoice number: EACH-YYYYMM-XXXX
  const now = new Date();
  const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
  const { count } = await supabase
    .from("invoices")
    .select("*", { count: "exact", head: true });
  const seq = String((count ?? 0) + 1).padStart(4, "0");
  const invoiceNumber = `${INVOICE_PREFIX}-${yearMonth}-${seq}`;

  const jobIdRaw = formData.get("job_id") as string | null;
  const jobId = jobIdRaw?.trim() || null;

  const dueDateRaw = formData.get("due_date") as string | null;
  const dueDate = dueDateRaw?.trim() || null;

  const { data, error } = await supabase
    .from("invoices")
    .insert({
      invoice_number: invoiceNumber,
      client_id: clientId.trim(),
      job_id: jobId,
      subtotal,
      tps,
      tvq,
      total,
      status: "draft",
      due_date: dueDate,
      notes: (formData.get("notes") as string | null) ?? null,
    })
    .select("id")
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null, id: data.id };
}

export async function updateInvoiceStatusAction(
  id: string,
  status: string,
  paymentMethod?: string
): Promise<InvoiceActionState> {
  const supabase = await createClient();

  const updateData: Record<string, unknown> = { status };
  if (status === "paid") {
    updateData.paid_at = new Date().toISOString();
    if (paymentMethod) updateData.payment_method = paymentMethod;
  }

  const { error } = await supabase
    .from("invoices")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

export async function deleteInvoiceAction(
  id: string
): Promise<InvoiceActionState> {
  const supabase = await createClient();

  const { error } = await supabase.from("invoices").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}
