-- Fix search path for update_updated_at_column function with CASCADE
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate triggers for existing tables
CREATE TRIGGER update_user_credits_updated_at
  BEFORE UPDATE ON public.user_credits
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_marketplace_items_updated_at
  BEFORE UPDATE ON public.marketplace_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_repositories_updated_at
  BEFORE UPDATE ON public.repositories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at
  BEFORE UPDATE ON public.lessons
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();