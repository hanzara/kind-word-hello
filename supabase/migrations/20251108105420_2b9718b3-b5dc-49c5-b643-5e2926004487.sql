-- Campaigns table for organizing mutation batches
CREATE TABLE IF NOT EXISTS public.campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  repository_id uuid REFERENCES public.repositories(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  status text NOT NULL CHECK (status IN ('draft', 'running', 'completed', 'failed')),
  progress numeric DEFAULT 0,
  goal_weights jsonb DEFAULT '{}'::jsonb,
  max_variants integer DEFAULT 5,
  created_at timestamptz DEFAULT now(),
  started_at timestamptz,
  completed_at timestamptz,
  user_id uuid NOT NULL
);

-- Genome suggestions table for AI recommendations
CREATE TABLE IF NOT EXISTS public.genome_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  genome_analysis_id uuid REFERENCES public.genome_analyses(id) ON DELETE CASCADE NOT NULL,
  suggestion_type text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  confidence numeric NOT NULL DEFAULT 0,
  priority text NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'accepted', 'rejected', 'implemented')),
  template_patch text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.genome_suggestions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for campaigns
CREATE POLICY "Users can view their own campaigns" ON public.campaigns
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.repositories 
      WHERE repositories.id = campaigns.repository_id 
      AND repositories.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert campaigns for their repos" ON public.campaigns
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.repositories 
      WHERE repositories.id = campaigns.repository_id 
      AND repositories.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own campaigns" ON public.campaigns
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.repositories 
      WHERE repositories.id = campaigns.repository_id 
      AND repositories.user_id = auth.uid()
    )
  );

-- RLS Policies for genome_suggestions
CREATE POLICY "Users can view suggestions for their analyses" ON public.genome_suggestions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.genome_analyses ga
      JOIN public.repositories r ON r.id = ga.repository_id
      WHERE ga.id = genome_suggestions.genome_analysis_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update suggestions for their analyses" ON public.genome_suggestions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.genome_analyses ga
      JOIN public.repositories r ON r.id = ga.repository_id
      WHERE ga.id = genome_suggestions.genome_analysis_id 
      AND r.user_id = auth.uid()
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS campaigns_repository_id_idx ON public.campaigns(repository_id);
CREATE INDEX IF NOT EXISTS campaigns_status_idx ON public.campaigns(status);
CREATE INDEX IF NOT EXISTS genome_suggestions_genome_analysis_id_idx ON public.genome_suggestions(genome_analysis_id);
CREATE INDEX IF NOT EXISTS genome_suggestions_status_idx ON public.genome_suggestions(status);

-- Triggers for updated_at
CREATE TRIGGER update_genome_suggestions_updated_at
  BEFORE UPDATE ON public.genome_suggestions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.campaigns;
ALTER PUBLICATION supabase_realtime ADD TABLE public.genome_suggestions;