// Generated from supabase/migrations/001_initial_schema.sql
export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
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
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email?: string | null;
          phone: string;
          address?: string | null;
          city?: string;
          notes?: string | null;
          source?: string | null;
          status?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string | null;
          phone?: string;
          address?: string | null;
          city?: string;
          notes?: string | null;
          source?: string | null;
          status?: string;
        };
        Relationships: [];
      };
      services: {
        Row: {
          id: string;
          name: string;
          category: string;
          description: string | null;
          base_rate: number | null;
          rate_type: string;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          description?: string | null;
          base_rate?: number | null;
          rate_type?: string;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          description?: string | null;
          base_rate?: number | null;
          rate_type?: string;
          is_active?: boolean;
        };
        Relationships: [];
      };
      jobs: {
        Row: {
          id: string;
          created_at: string;
          client_id: string | null;
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
        Insert: {
          id?: string;
          created_at?: string;
          client_id?: string | null;
          title: string;
          description?: string | null;
          address?: string | null;
          status?: string;
          priority?: string;
          scheduled_date?: string | null;
          scheduled_time?: string | null;
          estimated_hours?: number | null;
          actual_hours?: number | null;
          total_amount?: number | null;
          payment_method?: string | null;
          payment_status?: string;
          notes?: string | null;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          client_id?: string | null;
          title?: string;
          description?: string | null;
          address?: string | null;
          status?: string;
          priority?: string;
          scheduled_date?: string | null;
          scheduled_time?: string | null;
          estimated_hours?: number | null;
          actual_hours?: number | null;
          total_amount?: number | null;
          payment_method?: string | null;
          payment_status?: string;
          notes?: string | null;
          completed_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "jobs_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "clients";
            referencedColumns: ["id"];
          }
        ];
      };
      job_items: {
        Row: {
          id: string;
          job_id: string | null;
          service_id: string | null;
          description: string;
          quantity: number;
          unit_price: number;
          total: number;
        };
        Insert: {
          id?: string;
          job_id?: string | null;
          service_id?: string | null;
          description: string;
          quantity?: number;
          unit_price: number;
        };
        Update: {
          id?: string;
          job_id?: string | null;
          service_id?: string | null;
          description?: string;
          quantity?: number;
          unit_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "job_items_job_id_fkey";
            columns: ["job_id"];
            isOneToOne: false;
            referencedRelation: "jobs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "job_items_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          }
        ];
      };
      invoices: {
        Row: {
          id: string;
          created_at: string;
          invoice_number: string;
          job_id: string | null;
          client_id: string | null;
          subtotal: number | null;
          tps: number | null;
          tvq: number | null;
          total: number | null;
          status: string;
          due_date: string | null;
          paid_at: string | null;
          payment_method: string | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          invoice_number: string;
          job_id?: string | null;
          client_id?: string | null;
          subtotal?: number | null;
          tps?: number | null;
          tvq?: number | null;
          total?: number | null;
          status?: string;
          due_date?: string | null;
          paid_at?: string | null;
          payment_method?: string | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          invoice_number?: string;
          job_id?: string | null;
          client_id?: string | null;
          subtotal?: number | null;
          tps?: number | null;
          tvq?: number | null;
          total?: number | null;
          status?: string;
          due_date?: string | null;
          paid_at?: string | null;
          payment_method?: string | null;
          notes?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "clients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoices_job_id_fkey";
            columns: ["job_id"];
            isOneToOne: false;
            referencedRelation: "jobs";
            referencedColumns: ["id"];
          }
        ];
      };
      expenses: {
        Row: {
          id: string;
          created_at: string;
          date: string;
          category: string;
          description: string;
          amount: number;
          job_id: string | null;
          receipt_url: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          date: string;
          category: string;
          description: string;
          amount: number;
          job_id?: string | null;
          receipt_url?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          date?: string;
          category?: string;
          description?: string;
          amount?: number;
          job_id?: string | null;
          receipt_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "expenses_job_id_fkey";
            columns: ["job_id"];
            isOneToOne: false;
            referencedRelation: "jobs";
            referencedColumns: ["id"];
          }
        ];
      };
      leads: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          phone: string;
          email: string | null;
          service_type: string | null;
          message: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          phone: string;
          email?: string | null;
          service_type?: string | null;
          message?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          phone?: string;
          email?: string | null;
          service_type?: string | null;
          message?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      monthly_revenue: {
        Row: {
          month: string | null;
          total_jobs: number | null;
          gross_revenue: number | null;
          total_hours: number | null;
          avg_hourly_rate: number | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [key: string]: never;
    };
    Enums: {
      [key: string]: never;
    };
  };
};

export type Client = Database["public"]["Tables"]["clients"]["Row"];
export type Service = Database["public"]["Tables"]["services"]["Row"];
export type Job = Database["public"]["Tables"]["jobs"]["Row"];
export type JobItem = Database["public"]["Tables"]["job_items"]["Row"];
export type Invoice = Database["public"]["Tables"]["invoices"]["Row"];
export type Expense = Database["public"]["Tables"]["expenses"]["Row"];
export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type MonthlyRevenue = Database["public"]["Views"]["monthly_revenue"]["Row"];

// Extended types with relations
export type JobWithClient = Job & { clients: Client };
export type JobWithItems = Job & { job_items: JobItem[] };
export type InvoiceWithClient = Invoice & { clients: Client };
