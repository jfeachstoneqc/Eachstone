// Quebec tax rates
export const TPS_RATE = 0.05;
export const TVQ_RATE = 0.09975;

// Invoice prefix
export const INVOICE_PREFIX = "EACH";

// Job statuses
export const JOB_STATUSES = [
  "pending",
  "scheduled",
  "in_progress",
  "completed",
  "cancelled",
] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  pending: "En attente",
  scheduled: "Planifié",
  in_progress: "En cours",
  completed: "Complété",
  cancelled: "Annulé",
};

// Job priorities
export const JOB_PRIORITIES = ["low", "normal", "high", "urgent"] as const;
export type JobPriority = (typeof JOB_PRIORITIES)[number];

export const JOB_PRIORITY_LABELS: Record<JobPriority, string> = {
  low: "Basse",
  normal: "Normale",
  high: "Haute",
  urgent: "Urgente",
};

// Invoice statuses
export const INVOICE_STATUSES = [
  "draft",
  "sent",
  "paid",
  "overdue",
] as const;
export type InvoiceStatus = (typeof INVOICE_STATUSES)[number];

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  draft: "Brouillon",
  sent: "Envoyée",
  paid: "Payée",
  overdue: "En retard",
};

// Payment methods
export const PAYMENT_METHODS = ["cash", "cheque", "interac"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  cash: "Argent comptant",
  cheque: "Chèque",
  interac: "Virement Interac",
};

// Client statuses
export const CLIENT_STATUSES = ["active", "inactive", "lead"] as const;
export type ClientStatus = (typeof CLIENT_STATUSES)[number];

// Client sources
export const CLIENT_SOURCES = [
  "referral",
  "facebook",
  "website",
  "walk-in",
] as const;
export type ClientSource = (typeof CLIENT_SOURCES)[number];

// Expense categories
export const EXPENSE_CATEGORIES = [
  "materials",
  "gas",
  "tools",
  "vehicle",
  "other",
] as const;
export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  materials: "Matériaux",
  gas: "Essence",
  tools: "Outils",
  vehicle: "Véhicule",
  other: "Autre",
};

// Service categories for landing page & catalogue
export const SERVICE_CATEGORIES = [
  {
    name: "Rénovation intérieure",
    description: "Peinture, plâtre, céramique, plancher",
    icon: "Paintbrush",
  },
  {
    name: "Rénovation extérieure",
    description: "Clôtures, terrasses, bardeau, gouttières",
    icon: "Home",
  },
  {
    name: "Électricité légère",
    description: "Prises, luminaires, ventilateurs",
    icon: "Zap",
  },
  {
    name: "Menuiserie",
    description: "Armoires, tablettes, moulures, portes",
    icon: "Hammer",
  },
  {
    name: "Assemblage & installation",
    description: "Meubles, électroménagers, supports TV",
    icon: "Wrench",
  },
  {
    name: "Entretien saisonnier",
    description: "Calfeutrage, nettoyage gouttières, préparation hiver",
    icon: "Snowflake",
  },
  {
    name: "Urgences mineures",
    description: "Dégâts d'eau légers, serrures, vitres brisées",
    icon: "AlertTriangle",
  },
] as const;

// Served municipalities
export const SERVICE_AREAS = [
  "Trois-Rivières",
  "Cap-de-la-Madeleine",
  "Sainte-Marthe-du-Cap",
  "Pointe-du-Lac",
  "Saint-Louis-de-France",
];
