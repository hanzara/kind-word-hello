-- Create missing tables that the application code references

-- Create genomes table
CREATE TABLE IF NOT EXISTS public.genomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  repository_id UUID REFERENCES public.repositories(id),
  name TEXT NOT NULL,
  description TEXT,
  health_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.genomes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own genomes"
  ON public.genomes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own genomes"
  ON public.genomes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own genomes"
  ON public.genomes FOR UPDATE
  USING (auth.uid() = user_id);

-- Create genome_suggestions table
CREATE TABLE IF NOT EXISTS public.genome_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  genome_id UUID REFERENCES public.genomes(id),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.genome_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own genome suggestions"
  ON public.genome_suggestions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own genome suggestions"
  ON public.genome_suggestions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create campaigns table
CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  repository_id UUID REFERENCES public.repositories(id),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft',
  progress INTEGER DEFAULT 0,
  goal_weights JSONB DEFAULT '{}',
  max_variants INTEGER DEFAULT 5,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own campaigns"
  ON public.campaigns FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own campaigns"
  ON public.campaigns FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own campaigns"
  ON public.campaigns FOR UPDATE
  USING (auth.uid() = user_id);

-- Create mutation_history table
CREATE TABLE IF NOT EXISTS public.mutation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  mutation_id UUID REFERENCES public.mutations(id),
  action TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.mutation_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own mutation history"
  ON public.mutation_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own mutation history"
  ON public.mutation_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Add triggers for updated_at
CREATE TRIGGER update_genomes_updated_at
  BEFORE UPDATE ON public.genomes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.genomes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.genome_suggestions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.campaigns;
ALTER PUBLICATION supabase_realtime ADD TABLE public.mutation_history;