-- =============================================
-- BILLING & MONETIZATION TABLES
-- =============================================

-- User credits and balance tracking
CREATE TABLE public.user_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  balance INTEGER NOT NULL DEFAULT 100,
  total_earned INTEGER NOT NULL DEFAULT 0,
  total_spent INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Subscription plans
CREATE TYPE public.subscription_tier AS ENUM ('free', 'starter', 'pro', 'enterprise');

CREATE TABLE public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier subscription_tier NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  auto_renew BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Usage tracking
CREATE TABLE public.usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  credits_consumed INTEGER NOT NULL DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Billing transactions
CREATE TABLE public.billing_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL,
  amount_credits INTEGER NOT NULL,
  amount_usd NUMERIC(10, 2),
  description TEXT,
  status TEXT NOT NULL DEFAULT 'completed',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- SECURITY & TRUST CENTER TABLES
-- =============================================

-- Trust scores
CREATE TABLE public.user_trust_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL DEFAULT 50 CHECK (score >= 0 AND score <= 100),
  tier TEXT NOT NULL DEFAULT 'bronze',
  patch_success_rate NUMERIC(5, 2) DEFAULT 0,
  review_confidence NUMERIC(5, 2) DEFAULT 0,
  security_compliance NUMERIC(5, 2) DEFAULT 0,
  mutation_reversibility NUMERIC(5, 2) DEFAULT 0,
  total_mutations INTEGER DEFAULT 0,
  successful_mutations INTEGER DEFAULT 0,
  verified_safe_mutations INTEGER DEFAULT 0,
  global_rank INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Security audit logs
CREATE TABLE public.security_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  repository_id UUID REFERENCES public.repositories(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  trust_level INTEGER CHECK (trust_level >= 0 AND trust_level <= 100),
  details TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Compliance records
CREATE TABLE public.compliance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  standard TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  certified_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  report_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Security policies
CREATE TABLE public.security_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  policy_name TEXT NOT NULL,
  policy_type TEXT NOT NULL,
  enabled BOOLEAN DEFAULT true,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Vulnerability scans
CREATE TABLE public.vulnerability_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repository_id UUID NOT NULL REFERENCES public.repositories(id) ON DELETE CASCADE,
  scan_type TEXT NOT NULL DEFAULT 'full',
  status TEXT NOT NULL DEFAULT 'pending',
  vulnerabilities_found INTEGER DEFAULT 0,
  critical_count INTEGER DEFAULT 0,
  high_count INTEGER DEFAULT 0,
  medium_count INTEGER DEFAULT 0,
  low_count INTEGER DEFAULT 0,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- User credits policies
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own credits"
  ON public.user_credits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own credits"
  ON public.user_credits FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own credits"
  ON public.user_credits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- User subscriptions policies
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscription"
  ON public.user_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription"
  ON public.user_subscriptions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscription"
  ON public.user_subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Usage tracking policies
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own usage"
  ON public.usage_tracking FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert usage"
  ON public.usage_tracking FOR INSERT
  WITH CHECK (true);

-- Billing transactions policies
ALTER TABLE public.billing_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transactions"
  ON public.billing_transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert transactions"
  ON public.billing_transactions FOR INSERT
  WITH CHECK (true);

-- Trust scores policies
ALTER TABLE public.user_trust_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own trust score"
  ON public.user_trust_scores FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can manage trust scores"
  ON public.user_trust_scores FOR ALL
  USING (true);

-- Audit logs policies
ALTER TABLE public.security_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own audit logs"
  ON public.security_audit_logs FOR SELECT
  USING (auth.uid() = user_id OR repository_id IN (
    SELECT id FROM public.repositories WHERE user_id = auth.uid()
  ));

CREATE POLICY "System can insert audit logs"
  ON public.security_audit_logs FOR INSERT
  WITH CHECK (true);

-- Compliance records policies
ALTER TABLE public.compliance_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own compliance records"
  ON public.compliance_records FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their compliance records"
  ON public.compliance_records FOR ALL
  USING (auth.uid() = user_id);

-- Security policies table policies
ALTER TABLE public.security_policies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own security policies"
  ON public.security_policies FOR ALL
  USING (auth.uid() = user_id);

-- Vulnerability scans policies
ALTER TABLE public.vulnerability_scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view scans for their repositories"
  ON public.vulnerability_scans FOR SELECT
  USING (repository_id IN (
    SELECT id FROM public.repositories WHERE user_id = auth.uid()
  ));

CREATE POLICY "System can manage vulnerability scans"
  ON public.vulnerability_scans FOR ALL
  USING (true);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX idx_user_credits_user_id ON public.user_credits(user_id);
CREATE INDEX idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);
CREATE INDEX idx_usage_tracking_user_id ON public.usage_tracking(user_id);
CREATE INDEX idx_usage_tracking_created_at ON public.usage_tracking(created_at DESC);
CREATE INDEX idx_billing_transactions_user_id ON public.billing_transactions(user_id);
CREATE INDEX idx_billing_transactions_created_at ON public.billing_transactions(created_at DESC);
CREATE INDEX idx_trust_scores_user_id ON public.user_trust_scores(user_id);
CREATE INDEX idx_trust_scores_score ON public.user_trust_scores(score DESC);
CREATE INDEX idx_audit_logs_user_id ON public.security_audit_logs(user_id);
CREATE INDEX idx_audit_logs_repository_id ON public.security_audit_logs(repository_id);
CREATE INDEX idx_audit_logs_created_at ON public.security_audit_logs(created_at DESC);
CREATE INDEX idx_compliance_user_id ON public.compliance_records(user_id);
CREATE INDEX idx_security_policies_user_id ON public.security_policies(user_id);
CREATE INDEX idx_vulnerability_scans_repo_id ON public.vulnerability_scans(repository_id);

-- =============================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- =============================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_credits_updated_at
  BEFORE UPDATE ON public.user_credits
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_subscriptions_updated_at
  BEFORE UPDATE ON public.user_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_trust_scores_updated_at
  BEFORE UPDATE ON public.user_trust_scores
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_compliance_records_updated_at
  BEFORE UPDATE ON public.compliance_records
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_security_policies_updated_at
  BEFORE UPDATE ON public.security_policies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();