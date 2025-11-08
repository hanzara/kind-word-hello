-- Drop existing tables if they exist (to avoid conflicts)
DROP TABLE IF EXISTS public.marketplace_transactions CASCADE;
DROP TABLE IF EXISTS public.marketplace_items CASCADE;
DROP TABLE IF EXISTS public.user_credits CASCADE;

-- Create user_credits table
CREATE TABLE public.user_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  balance INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id)
);

ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_credits
CREATE POLICY "Users can view their own credits"
  ON public.user_credits FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own credits"
  ON public.user_credits FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create marketplace_items table
CREATE TABLE public.marketplace_items (
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

-- RLS policies for marketplace_items
CREATE POLICY "Anyone can view published items"
  ON public.marketplace_items FOR SELECT
  TO authenticated
  USING (status = 'published');

CREATE POLICY "Sellers can manage their items"
  ON public.marketplace_items FOR ALL
  TO authenticated
  USING (auth.uid() = seller_id);

-- Create marketplace_transactions table
CREATE TABLE public.marketplace_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID NOT NULL REFERENCES public.marketplace_items(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL,
  price_credits INTEGER NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('purchase', 'refund')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.marketplace_transactions ENABLE ROW LEVEL SECURITY;

-- RLS policies for marketplace_transactions
CREATE POLICY "Users can view their transactions"
  ON public.marketplace_transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_marketplace_items_status ON public.marketplace_items(status);
CREATE INDEX IF NOT EXISTS idx_marketplace_items_mutation_type ON public.marketplace_items(mutation_type);
CREATE INDEX IF NOT EXISTS idx_marketplace_items_downloads ON public.marketplace_items(downloads DESC);
CREATE INDEX IF NOT EXISTS idx_marketplace_transactions_buyer ON public.marketplace_transactions(buyer_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_transactions_seller ON public.marketplace_transactions(seller_id);
CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON public.user_credits(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_marketplace_items_updated_at BEFORE UPDATE ON public.marketplace_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_credits_updated_at BEFORE UPDATE ON public.user_credits
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some initial credits for testing (optional)
-- You can remove this if you want users to start with 0 credits
-- INSERT INTO public.user_credits (user_id, balance)
-- SELECT id, 1000 FROM auth.users
-- ON CONFLICT (user_id) DO NOTHING;
