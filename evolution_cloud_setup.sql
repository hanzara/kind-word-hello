-- Evolution Cloud Database Setup
-- Run this SQL in your Supabase SQL Editor to create the required tables

-- Evolution Ledger Table
CREATE TABLE IF NOT EXISTS public.evolution_ledger (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mutation_id text NOT NULL UNIQUE,
  type text NOT NULL CHECK (type IN ('performance', 'security', 'cost', 'feature')),
  description text NOT NULL,
  gain text NOT NULL,
  status text NOT NULL CHECK (status IN ('success', 'rolled_back', 'in_progress', 'failed')),
  signature text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Evolution Metrics History Table
CREATE TABLE IF NOT EXISTS public.evolution_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  performance_gain numeric NOT NULL DEFAULT 0,
  security_stability numeric NOT NULL DEFAULT 0,
  cost_optimization numeric NOT NULL DEFAULT 0,
  mutation_success numeric NOT NULL DEFAULT 0,
  cpu_usage numeric DEFAULT 0,
  memory_usage numeric DEFAULT 0,
  response_time numeric DEFAULT 0,
  error_rate numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Deployment Logs Table
CREATE TABLE IF NOT EXISTS public.deployment_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  version text NOT NULL,
  status text NOT NULL CHECK (status IN ('success', 'failed', 'in_progress')),
  mutation_ids text[] DEFAULT ARRAY[]::text[],
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.evolution_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evolution_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deployment_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies (public read for now, can be restricted later)
CREATE POLICY "Enable read access for all users" ON public.evolution_ledger
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.evolution_ledger
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON public.evolution_metrics
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.evolution_metrics
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON public.deployment_logs
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.deployment_logs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Enable Realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.evolution_ledger;
ALTER PUBLICATION supabase_realtime ADD TABLE public.evolution_metrics;
ALTER PUBLICATION supabase_realtime ADD TABLE public.deployment_logs;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS evolution_ledger_created_at_idx ON public.evolution_ledger(created_at DESC);
CREATE INDEX IF NOT EXISTS evolution_ledger_status_idx ON public.evolution_ledger(status);
CREATE INDEX IF NOT EXISTS evolution_metrics_created_at_idx ON public.evolution_metrics(created_at DESC);
CREATE INDEX IF NOT EXISTS deployment_logs_created_at_idx ON public.deployment_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS deployment_logs_platform_idx ON public.deployment_logs(platform);

-- Insert sample data for demonstration
INSERT INTO public.evolution_ledger (mutation_id, type, description, gain, status, signature, created_at)
VALUES 
  ('m#2025-115', 'performance', 'Optimized database queries', '+23%', 'success', 'AI_NODE_8x', now() - interval '2 hours'),
  ('m#2025-114', 'security', 'Updated dependency vulnerabilities', '+5% security', 'success', 'AI_NODE_7x', now() - interval '5 hours'),
  ('m#2025-113', 'cost', 'Optimized API caching strategy', '-15% cost', 'success', 'AI_NODE_6x', now() - interval '8 hours'),
  ('m#2025-112', 'performance', 'Improved async operation handling', '+12%', 'rolled_back', 'AI_NODE_5x', now() - interval '1 day')
ON CONFLICT (mutation_id) DO NOTHING;

INSERT INTO public.evolution_metrics (performance_gain, security_stability, cost_optimization, mutation_success, cpu_usage, memory_usage, response_time, error_rate, created_at)
VALUES 
  (23, 98, 15, 87, 45, 62, 28, 2, now() - interval '5 minutes'),
  (22.5, 97.8, 14.5, 86.5, 47, 60, 30, 2.1, now() - interval '10 minutes'),
  (22, 97.5, 14, 86, 46, 61, 29, 2.2, now() - interval '15 minutes');

INSERT INTO public.deployment_logs (platform, version, status, mutation_ids, created_at)
VALUES 
  ('Netlify', 'v2.3.1', 'success', ARRAY['m#2025-115', 'm#2025-114'], now() - interval '2 hours'),
  ('Vercel', 'v2.3.0', 'success', ARRAY['m#2025-113'], now() - interval '5 hours'),
  ('Netlify', 'v2.2.9', 'success', ARRAY['m#2025-112'], now() - interval '1 day');
