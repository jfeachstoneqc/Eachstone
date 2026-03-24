"use server";

import { createClient } from "@/lib/supabase/server";

export type JobActionState = { success: boolean; error: string | null };

export async function createJobAction(
  prevState: JobActionState,
  formData: FormData
): Promise<JobActionState> {
  const supabase = await createClient();

  const title = formData.get("title") as string | null;
  if (!title?.trim()) {
    return { success: false, error: "Le titre est requis." };
  }

  const clientIdRaw = formData.get("client_id") as string | null;
  const clientId =
    clientIdRaw && clientIdRaw.trim() !== "" ? clientIdRaw.trim() : null;

  const totalAmountRaw = formData.get("total_amount") as string | null;
  const totalAmount =
    totalAmountRaw && totalAmountRaw !== "" ? parseFloat(totalAmountRaw) : null;

  const scheduledDateRaw = formData.get("scheduled_date") as string | null;
  const scheduledDate =
    scheduledDateRaw && scheduledDateRaw !== "" ? scheduledDateRaw : null;

  const { error } = await supabase.from("jobs").insert({
    title: title.trim(),
    client_id: clientId,
    description: (formData.get("description") as string | null) ?? null,
    address: (formData.get("address") as string | null) ?? null,
    status: "pending",
    priority: (formData.get("priority") as string | null) ?? "normal",
    scheduled_date: scheduledDate,
    total_amount: totalAmount,
    notes: (formData.get("notes") as string | null) ?? null,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

export async function updateJobStatusAction(
  id: string,
  status: string
): Promise<JobActionState> {
  const supabase = await createClient();

  const updateData: Record<string, unknown> = { status };
  if (status === "completed") {
    updateData.completed_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from("jobs")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

export async function updateJobPaymentAction(
  id: string,
  paymentStatus: string,
  paymentMethod?: string
): Promise<JobActionState> {
  const supabase = await createClient();

  const updateData: Record<string, unknown> = { payment_status: paymentStatus };
  if (paymentMethod) updateData.payment_method = paymentMethod;

  const { error } = await supabase
    .from("jobs")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

export async function updateJobAction(
  id: string,
  prevState: JobActionState,
  formData: FormData
): Promise<JobActionState> {
  const supabase = await createClient();

  const title = formData.get("title") as string | null;
  if (!title?.trim()) {
    return { success: false, error: "Le titre est requis." };
  }

  const clientIdRaw = formData.get("client_id") as string | null;
  const clientId = clientIdRaw?.trim() || null;

  const totalAmountRaw = formData.get("total_amount") as string | null;
  const totalAmount = totalAmountRaw ? parseFloat(totalAmountRaw) : null;

  const estimatedHoursRaw = formData.get("estimated_hours") as string | null;
  const estimatedHours = estimatedHoursRaw ? parseFloat(estimatedHoursRaw) : null;

  const actualHoursRaw = formData.get("actual_hours") as string | null;
  const actualHours = actualHoursRaw ? parseFloat(actualHoursRaw) : null;

  const scheduledDateRaw = formData.get("scheduled_date") as string | null;
  const scheduledDate = scheduledDateRaw?.trim() || null;

  const { error } = await supabase
    .from("jobs")
    .update({
      title: title.trim(),
      client_id: clientId,
      description: (formData.get("description") as string | null) ?? null,
      address: (formData.get("address") as string | null) ?? null,
      priority: (formData.get("priority") as string | null) ?? "normal",
      scheduled_date: scheduledDate,
      estimated_hours: estimatedHours,
      actual_hours: actualHours,
      total_amount: totalAmount,
      notes: (formData.get("notes") as string | null) ?? null,
    })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

export async function deleteJobAction(id: string): Promise<JobActionState> {
  const supabase = await createClient();

  const { error } = await supabase.from("jobs").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}
