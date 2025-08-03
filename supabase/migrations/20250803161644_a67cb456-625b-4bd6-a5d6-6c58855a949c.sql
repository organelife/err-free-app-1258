-- Create registration_verifications table
CREATE TABLE IF NOT EXISTS public.registration_verifications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  registration_id uuid REFERENCES public.registrations(id) ON DELETE CASCADE,
  verified_by text NOT NULL,
  verified_at timestamp with time zone NOT NULL DEFAULT now(),
  verification_notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add missing columns to admin_permissions table
ALTER TABLE public.admin_permissions 
ADD COLUMN IF NOT EXISTS module text;

-- Add missing columns to announcements table
ALTER TABLE public.announcements 
ADD COLUMN IF NOT EXISTS expiry_date timestamp with time zone,
ADD COLUMN IF NOT EXISTS youtube_video_url text,
ADD COLUMN IF NOT EXISTS poster_image_url text;

-- Add missing columns to cash_transactions table
ALTER TABLE public.cash_transactions 
ADD COLUMN IF NOT EXISTS from_date timestamp with time zone,
ADD COLUMN IF NOT EXISTS to_date timestamp with time zone,
ADD COLUMN IF NOT EXISTS remarks text;

-- Enable RLS on registration_verifications
ALTER TABLE public.registration_verifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for registration_verifications
CREATE POLICY "Allow all operations for now" 
ON public.registration_verifications 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_registration_verifications_registration_id 
  ON public.registration_verifications(registration_id);

CREATE INDEX IF NOT EXISTS idx_admin_permissions_admin_id 
  ON public.admin_permissions(admin_id);

CREATE INDEX IF NOT EXISTS idx_admin_permissions_module 
  ON public.admin_permissions(module);

-- Create triggers for updated_at columns
CREATE TRIGGER update_registration_verifications_updated_at
  BEFORE UPDATE ON public.registration_verifications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();