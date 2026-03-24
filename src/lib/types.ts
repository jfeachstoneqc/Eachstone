// Placeholder Database type — replace with `supabase gen types typescript` output later.
// Using a minimal definition so the Supabase client works without strict table typing.
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type Database = {};

export type Client = {
  id: string;
  created_at: string;
  name: string;
  email: string | null;
  phone: string;
  address: string | null;
  city: string;
  notes: string | null;
  source: string | null;
  status: string;
};

export type Service = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  base_rate: number | null;
  rate_type: string;
  is_active: boolean;
};

export type Job = {
  id: string;
  created_at: string;
  client_id: string;
  title: string;
  description: string | null;
  address: string | null;
  status: string;
  priority: string;
  scheduled_date: string | null;
  scheduled_time: string | null;
  estimated_hours: number | null;
  actual_hours: number | null;
  total_amount: number | null;
  payment_method: string | null;
  payment_status: string;
  notes: string | null;
  completed_at: string | null;
};

export type JobItem = {
  id: string;
  job_id: string;
  service_id: string | null;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
};

export type Invoice = {
  id: string;
  created_at: string;
  invoice_number: string;
  job_id: string | null;
  client_id: string;
  subtotal: number;
  tps: number;
  tvq: number;
  total: number;
  status: string;
  due_date: string | null;
  paid_at: string | null;
  payment_method: string | null;
  notes: string | null;
};

export type Expense = {
  id: string;
  created_at: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  job_id: string | null;
  receipt_url: string | null;
};

export type Lead = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  service_type: string | null;
  message: string | null;
};

export type MonthlyRevenue = {
  month: string;
  total_jobs: number;
  gross_revenue: number;
  total_hours: number;
  avg_hourly_rate: number;
};

// Extended types with relations
export type JobWithClient = Job & { clients: Client };
export type JobWithItems = Job & { job_items: JobItem[] };
export type InvoiceWithClient = Invoice & { clients: Client };
