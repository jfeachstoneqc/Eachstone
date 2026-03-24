-- ============================================
-- EACHSTONE — Initial Database Schema
-- ============================================

-- CLIENTS
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  address TEXT,
  city TEXT DEFAULT 'Trois-Rivières',
  notes TEXT,
  source TEXT, -- 'referral', 'facebook', 'website', 'walk-in'
  status TEXT DEFAULT 'active' -- 'active', 'inactive', 'lead'
);

-- SERVICES (catalogue)
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  base_rate DECIMAL(10,2),
  rate_type TEXT DEFAULT 'hourly', -- 'hourly', 'fixed', 'sqft'
  is_active BOOLEAN DEFAULT true
);

-- JOBS (travaux)
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  client_id UUID REFERENCES clients(id),
  title TEXT NOT NULL,
  description TEXT,
  address TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'scheduled', 'in_progress', 'completed', 'cancelled'
  priority TEXT DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
  scheduled_date DATE,
  scheduled_time TIME,
  estimated_hours DECIMAL(5,2),
  actual_hours DECIMAL(5,2),
  total_amount DECIMAL(10,2),
  payment_method TEXT, -- 'cash', 'cheque', 'interac'
  payment_status TEXT DEFAULT 'unpaid', -- 'unpaid', 'partial', 'paid'
  notes TEXT,
  completed_at TIMESTAMPTZ
);

-- JOB ITEMS (line items per job)
CREATE TABLE job_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id),
  description TEXT NOT NULL,
  quantity DECIMAL(10,2) DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED
);

-- INVOICES
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  invoice_number TEXT UNIQUE NOT NULL,
  job_id UUID REFERENCES jobs(id),
  client_id UUID REFERENCES clients(id),
  subtotal DECIMAL(10,2),
  tps DECIMAL(10,2), -- TPS 5%
  tvq DECIMAL(10,2), -- TVQ 9.975%
  total DECIMAL(10,2),
  status TEXT DEFAULT 'draft', -- 'draft', 'sent', 'paid', 'overdue'
  due_date DATE,
  paid_at TIMESTAMPTZ,
  payment_method TEXT,
  notes TEXT
);

-- EXPENSES
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  date DATE NOT NULL,
  category TEXT NOT NULL, -- 'materials', 'gas', 'tools', 'vehicle', 'other'
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  job_id UUID REFERENCES jobs(id),
  receipt_url TEXT
);

-- LEADS (landing page form submissions)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service_type TEXT,
  message TEXT
);

-- MONTHLY REVENUE VIEW
CREATE VIEW monthly_revenue AS
SELECT
  DATE_TRUNC('month', completed_at) AS month,
  COUNT(*)::INTEGER AS total_jobs,
  COALESCE(SUM(total_amount), 0) AS gross_revenue,
  COALESCE(SUM(actual_hours), 0) AS total_hours,
  CASE
    WHEN SUM(actual_hours) > 0
    THEN ROUND(SUM(total_amount) / SUM(actual_hours), 2)
    ELSE 0
  END AS avg_hourly_rate
FROM jobs
WHERE status = 'completed'
GROUP BY DATE_TRUNC('month', completed_at)
ORDER BY month DESC;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Authenticated users can do everything on business tables
CREATE POLICY "Authenticated users full access" ON clients
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users full access" ON services
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users full access" ON jobs
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users full access" ON job_items
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users full access" ON invoices
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users full access" ON expenses
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Leads: public INSERT (landing page), authenticated for everything else
CREATE POLICY "Anyone can submit a lead" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view leads" ON leads
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update leads" ON leads
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete leads" ON leads
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- ============================================
-- SEED DATA: Services catalogue
-- ============================================

INSERT INTO services (name, category, description, base_rate, rate_type) VALUES
  ('Rénovation intérieure', 'renovation', 'Peinture, plâtre, céramique, plancher', 55.00, 'hourly'),
  ('Rénovation extérieure', 'renovation', 'Clôtures, terrasses, bardeau, gouttières', 60.00, 'hourly'),
  ('Plomberie légère', 'plumbing', 'Robinets, toilettes, chauffe-eau', 65.00, 'hourly'),
  ('Électricité légère', 'electrical', 'Prises, luminaires, ventilateurs', 60.00, 'hourly'),
  ('Menuiserie', 'carpentry', 'Armoires, tablettes, moulures, portes', 55.00, 'hourly'),
  ('Assemblage & installation', 'assembly', 'Meubles, électroménagers, supports TV', 50.00, 'hourly'),
  ('Entretien saisonnier', 'maintenance', 'Calfeutrage, nettoyage gouttières, préparation hiver', 50.00, 'hourly'),
  ('Déménagement & transport', 'moving', 'Aide au déménagement, ramassage', 55.00, 'hourly'),
  ('Urgences mineures', 'emergency', 'Dégâts d''eau légers, serrures, vitres brisées', 75.00, 'hourly');
