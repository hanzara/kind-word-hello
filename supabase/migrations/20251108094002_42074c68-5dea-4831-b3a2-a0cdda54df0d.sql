-- Add missing columns to genome_suggestions
ALTER TABLE public.genome_suggestions
ADD COLUMN IF NOT EXISTS suggestion_type TEXT DEFAULT 'improvement',
ADD COLUMN IF NOT EXISTS confidence NUMERIC DEFAULT 0.8,
ADD COLUMN IF NOT EXISTS template_patch TEXT,
ADD COLUMN IF NOT EXISTS repository_id UUID REFERENCES public.repositories(id);

-- Add missing columns to mutations table
ALTER TABLE public.mutations
ADD COLUMN IF NOT EXISTS composite_score NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS campaign_id UUID REFERENCES public.campaigns(id);

-- Add missing columns to genomes table  
ALTER TABLE public.genomes
ADD COLUMN IF NOT EXISTS efficiency_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS fingerprint TEXT;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_genome_suggestions_repo_id ON public.genome_suggestions(repository_id);
CREATE INDEX IF NOT EXISTS idx_mutations_repo_id ON public.mutations(repository_id);
CREATE INDEX IF NOT EXISTS idx_mutations_campaign_id ON public.mutations(campaign_id);
CREATE INDEX IF NOT EXISTS idx_genomes_repo_id ON public.genomes(repository_id);