-- ============================================
-- EACHSTONE — Seed Data (Demo)
-- ============================================
-- Run after migrations to populate demo data.
-- NOTE: Services are seeded in the migration.

-- CLIENTS
INSERT INTO clients (id, name, email, phone, address, city, source, status) VALUES
  ('11111111-0000-0000-0000-000000000001', 'Martin Beaulieu', 'martin.beaulieu@gmail.com', '(819) 555-0101', '245 rue des Érables', 'Trois-Rivières', 'referral', 'active'),
  ('11111111-0000-0000-0000-000000000002', 'Sylvie Champagne', 'sylvie.champagne@outlook.com', '(819) 555-0102', '12 boul. des Forges', 'Cap-de-la-Madeleine', 'facebook', 'active'),
  ('11111111-0000-0000-0000-000000000003', 'Robert Gagnon', NULL, '(819) 555-0103', '78 rue Laviolette', 'Trois-Rivières', 'walk-in', 'active'),
  ('11111111-0000-0000-0000-000000000004', 'Julie Tremblay', 'julie.tremblay@videotron.ca', '(819) 555-0104', '330 rue Saint-Maurice', 'Sainte-Marthe-du-Cap', 'referral', 'active'),
  ('11111111-0000-0000-0000-000000000005', 'André Côté', 'andre.cote@hotmail.com', '(819) 555-0105', '5 chemin du Lac', 'Pointe-du-Lac', 'website', 'active'),
  ('11111111-0000-0000-0000-000000000006', 'Louise Bergeron', NULL, '(819) 555-0106', '102 rue Notre-Dame', 'Trois-Rivières', 'facebook', 'inactive');

-- JOBS
INSERT INTO jobs (id, client_id, title, description, address, status, priority, scheduled_date, estimated_hours, actual_hours, total_amount, payment_method, payment_status, notes, completed_at, created_at) VALUES
  -- Completed jobs (for revenue charts)
  ('22222222-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001',
   'Peinture salon et couloir', 'Peinture complète du salon et du couloir, 2 couches', '245 rue des Érables, Trois-Rivières',
   'completed', 'normal', '2026-01-10', 8, 7.5, 412.50, 'cash', 'paid', NULL,
   '2026-01-10 17:00:00+00', '2026-01-08 09:00:00+00'),

  ('22222222-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000002',
   'Remplacement robinet cuisine', 'Remplacement robinet et joint sous évier', '12 boul. des Forges, Cap-de-la-Madeleine',
   'completed', 'high', '2026-01-15', 2, 1.5, 97.50, 'interac', 'paid', NULL,
   '2026-01-15 14:00:00+00', '2026-01-14 10:00:00+00'),

  ('22222222-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000003',
   'Installation luminaires', 'Installation 4 luminaires LED dans cuisine et salle à manger', '78 rue Laviolette, Trois-Rivières',
   'completed', 'normal', '2026-02-05', 3, 3, 180.00, 'cash', 'paid', NULL,
   '2026-02-05 16:00:00+00', '2026-02-03 08:00:00+00'),

  ('22222222-0000-0000-0000-000000000004', '11111111-0000-0000-0000-000000000004',
   'Assemblage meubles IKEA', 'Assemblage 2 bibliothèques + commode', '330 rue Saint-Maurice, Sainte-Marthe-du-Cap',
   'completed', 'low', '2026-02-12', 4, 4.5, 225.00, 'interac', 'paid', NULL,
   '2026-02-12 15:00:00+00', '2026-02-10 11:00:00+00'),

  ('22222222-0000-0000-0000-000000000005', '11111111-0000-0000-0000-000000000005',
   'Calfeutrage fenêtres', 'Calfeutrage extérieur 8 fenêtres + 2 portes', '5 chemin du Lac, Pointe-du-Lac',
   'completed', 'normal', '2026-02-20', 5, 5, 250.00, 'cheque', 'paid', NULL,
   '2026-02-20 17:00:00+00', '2026-02-18 09:00:00+00'),

  ('22222222-0000-0000-0000-000000000006', '11111111-0000-0000-0000-000000000001',
   'Réparation terrasse', 'Remplacement 6 planches pourries + traitement bois', '245 rue des Érables, Trois-Rivières',
   'completed', 'normal', '2026-03-05', 6, 6.5, 357.50, 'cash', 'paid', NULL,
   '2026-03-05 17:00:00+00', '2026-03-03 10:00:00+00'),

  ('22222222-0000-0000-0000-000000000007', '11111111-0000-0000-0000-000000000002',
   'Dégât d''eau mineur', 'Réparation joint baignoire + séchage plancher', '12 boul. des Forges, Cap-de-la-Madeleine',
   'completed', 'urgent', '2026-03-10', 3, 2.5, 187.50, 'interac', 'paid', NULL,
   '2026-03-10 14:00:00+00', '2026-03-10 09:00:00+00'),

  -- Active jobs
  ('22222222-0000-0000-0000-000000000008', '11111111-0000-0000-0000-000000000003',
   'Peinture chambre principale', 'Peinture chambre + garde-robe intégré', '78 rue Laviolette, Trois-Rivières',
   'in_progress', 'normal', '2026-03-24', 5, NULL, 275.00, NULL, 'unpaid', 'Couleur: Blanc cassé SW7012',
   NULL, '2026-03-22 08:00:00+00'),

  ('22222222-0000-0000-0000-000000000009', '11111111-0000-0000-0000-000000000004',
   'Installation support TV', 'Support TV mural + gestion de câbles', '330 rue Saint-Maurice, Sainte-Marthe-du-Cap',
   'scheduled', 'normal', '2026-03-26', 2, NULL, 110.00, NULL, 'unpaid', NULL,
   NULL, '2026-03-23 14:00:00+00'),

  ('22222222-0000-0000-0000-000000000010', '11111111-0000-0000-0000-000000000005',
   'Remplacement porte patio', 'Dépose ancienne porte + installation porte patio neuve', '5 chemin du Lac, Pointe-du-Lac',
   'pending', 'high', '2026-04-01', 6, NULL, 420.00, NULL, 'unpaid', 'Client fournit la porte',
   NULL, '2026-03-23 16:00:00+00'),

  -- Completed but unpaid (overdue)
  ('22222222-0000-0000-0000-000000000011', '11111111-0000-0000-0000-000000000006',
   'Réparation clôture', 'Remplacement 4 poteaux + remise à niveau', '102 rue Notre-Dame, Trois-Rivières',
   'completed', 'normal', '2026-03-15', 4, 4, 220.00, NULL, 'unpaid', NULL,
   '2026-03-15 16:00:00+00', '2026-03-13 09:00:00+00');

-- JOB ITEMS (for in_progress job)
INSERT INTO job_items (job_id, description, quantity, unit_price) VALUES
  ('22222222-0000-0000-0000-000000000008', 'Main d''œuvre - peinture (heures)', 5, 55.00);

-- INVOICES
INSERT INTO invoices (invoice_number, job_id, client_id, subtotal, tps, tvq, total, status, due_date, paid_at, payment_method, created_at) VALUES
  ('EACH-202601-0001', '22222222-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001',
   412.50, 20.63, 41.15, 474.28, 'paid', '2026-01-24', '2026-01-10 17:30:00+00', 'cash', '2026-01-08 09:30:00+00'),

  ('EACH-202601-0002', '22222222-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000002',
   97.50, 4.88, 9.73, 112.11, 'paid', '2026-01-29', '2026-01-15 14:30:00+00', 'interac', '2026-01-14 10:30:00+00'),

  ('EACH-202602-0003', '22222222-0000-0000-0000-000000000004', '11111111-0000-0000-0000-000000000004',
   225.00, 11.25, 22.44, 258.69, 'paid', '2026-02-26', '2026-02-13 10:00:00+00', 'interac', '2026-02-10 11:30:00+00'),

  ('EACH-202603-0004', '22222222-0000-0000-0000-000000000011', '11111111-0000-0000-0000-000000000006',
   220.00, 11.00, 21.95, 252.95, 'overdue', '2026-03-29', NULL, NULL, '2026-03-13 09:30:00+00');

-- EXPENSES
INSERT INTO expenses (date, category, description, amount, job_id) VALUES
  ('2026-01-10', 'materials', 'Peinture Sico 4L blanc — salon', 68.50, '22222222-0000-0000-0000-000000000001'),
  ('2026-01-10', 'materials', 'Ruban à masquer + toile de protection', 22.00, '22222222-0000-0000-0000-000000000001'),
  ('2026-01-15', 'materials', 'Joints et téflon', 12.75, '22222222-0000-0000-0000-000000000002'),
  ('2026-02-05', 'materials', 'Luminaires LED x4', 156.00, '22222222-0000-0000-0000-000000000003'),
  ('2026-02-20', 'materials', 'Calfeutrant extérieur silicone x6', 45.00, '22222222-0000-0000-0000-000000000005'),
  ('2026-03-05', 'materials', 'Planches cèdre 2x6 x8 pieds', 94.00, '22222222-0000-0000-0000-000000000006'),
  ('2026-03-05', 'materials', 'Traitement bois + pinceau', 38.50, '22222222-0000-0000-0000-000000000006'),
  ('2026-03-01', 'gas', 'Essence — semaine du 25 fév.', 75.00, NULL),
  ('2026-03-15', 'gas', 'Essence — semaine du 10 mars', 68.00, NULL),
  ('2026-02-01', 'tools', 'Scie circulaire Dewalt', 189.00, NULL),
  ('2026-01-05', 'vehicle', 'Changement d''huile — camion', 95.00, NULL);

-- LEADS (landing page submissions)
INSERT INTO leads (name, phone, email, service_type, message, created_at) VALUES
  ('Pierre Lalonde', '(819) 555-0201', NULL, 'renovation', 'J''aimerais faire peinturer mon sous-sol.', '2026-03-20 10:15:00+00'),
  ('Carole Simard', '(819) 555-0202', 'carole.simard@gmail.com', 'plumbing', 'Mon robinet de cuisine coule. Besoin d''une réparation rapide.', '2026-03-21 14:30:00+00'),
  ('François Nadeau', '(819) 555-0203', NULL, 'assembly', 'J''ai reçu des meubles à assembler — environ 5 boîtes.', '2026-03-22 09:45:00+00'),
  ('Diane Morin', '(819) 555-0204', 'diane.morin@outlook.com', 'maintenance', 'Besoin de calfeutrer avant l''hiver prochain.', '2026-03-23 16:00:00+00');
