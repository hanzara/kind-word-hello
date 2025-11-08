-- Create marketplace tables
CREATE TABLE IF NOT EXISTS public.user_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  balance INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id)
);

ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own credits"
  ON public.user_credits FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own credits"
  ON public.user_credits FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.marketplace_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mutation_id UUID REFERENCES public.mutations(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  mutation_type TEXT NOT NULL,
  price_credits INTEGER NOT NULL CHECK (price_credits >= 10),
  performance_gain NUMERIC(5,2) DEFAULT 0,
  cost_reduction NUMERIC(5,2) DEFAULT 0,
  benchmark_data JSONB,
  downloads INTEGER DEFAULT 0,
  rating NUMERIC(3,2) DEFAULT 5.0,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.marketplace_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published items"
  ON public.marketplace_items FOR SELECT
  TO authenticated
  USING (status = 'published');

CREATE POLICY "Sellers can manage their items"
  ON public.marketplace_items FOR ALL
  TO authenticated
  USING (auth.uid() = seller_id);

CREATE TABLE IF NOT EXISTS public.marketplace_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID NOT NULL REFERENCES public.marketplace_items(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL,
  price_credits INTEGER NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('purchase', 'refund')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.marketplace_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their transactions"
  ON public.marketplace_transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_marketplace_items_status ON public.marketplace_items(status);
CREATE INDEX IF NOT EXISTS idx_marketplace_items_mutation_type ON public.marketplace_items(mutation_type);
CREATE INDEX IF NOT EXISTS idx_marketplace_items_downloads ON public.marketplace_items(downloads DESC);
CREATE INDEX IF NOT EXISTS idx_marketplace_transactions_buyer ON public.marketplace_transactions(buyer_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_transactions_seller ON public.marketplace_transactions(seller_id);
CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON public.user_credits(user_id);

-- Create lessons tables
CREATE TABLE IF NOT EXISTS public.lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  mutation_id uuid REFERENCES public.mutations(id) ON DELETE SET NULL,
  title text NOT NULL,
  summary text NOT NULL,
  code_snippet text NOT NULL,
  code_before text,
  code_after text,
  language text NOT NULL,
  concepts text[] NOT NULL DEFAULT '{}',
  youtube_videos jsonb DEFAULT '[]',
  quiz_data jsonb NOT NULL DEFAULT '[]',
  difficulty_level text NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  duration_minutes integer NOT NULL DEFAULT 10,
  xp_points integer NOT NULL DEFAULT 10,
  learning_objectives text[] DEFAULT '{}',
  key_takeaways text[] DEFAULT '{}',
  next_topics text[] DEFAULT '{}',
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view public lessons" ON public.lessons
  FOR SELECT USING (is_public = true OR user_id = auth.uid());

CREATE POLICY "Users can create their own lessons" ON public.lessons
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own lessons" ON public.lessons
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own lessons" ON public.lessons
  FOR DELETE USING (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_lessons_user_id ON public.lessons(user_id);
CREATE INDEX IF NOT EXISTS idx_lessons_mutation_id ON public.lessons(mutation_id);
CREATE INDEX IF NOT EXISTS idx_lessons_is_public ON public.lessons(is_public);

-- Create genome_suggestions table
CREATE TABLE IF NOT EXISTS public.genome_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  repository_id uuid REFERENCES public.repositories(id) ON DELETE CASCADE,
  suggestion_type text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'applied', 'dismissed')),
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.genome_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all on genome_suggestions" ON public.genome_suggestions
  FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_genome_suggestions_repository_id ON public.genome_suggestions(repository_id);