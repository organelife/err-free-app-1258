-- Create registration_verifications table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.registration_verifications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  registration_id uuid REFERENCES public.registrations(id) ON DELETE CASCADE,
  verified_by text NOT NULL,
  verified_at timestamp with time zone NOT NULL DEFAULT now(),
  verification_notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add missing columns to admin_permissions table
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'admin_permissions' AND column_name = 'module') THEN
    ALTER TABLE public.admin_permissions ADD COLUMN module text;
  END IF;
END $$;

-- Add missing columns to announcements table
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'announcements' AND column_name = 'expiry_date') THEN
    ALTER TABLE public.announcements ADD COLUMN expiry_date timestamp with time zone;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'announcements' AND column_name = 'youtube_video_url') THEN
    ALTER TABLE public.announcements ADD COLUMN youtube_video_url text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'announcements' AND column_name = 'poster_image_url') THEN
    ALTER TABLE public.announcements ADD COLUMN poster_image_url text;
  END IF;
END $$;

-- Add missing columns to cash_transactions table
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cash_transactions' AND column_name = 'from_date') THEN
    ALTER TABLE public.cash_transactions ADD COLUMN from_date timestamp with time zone;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cash_transactions' AND column_name = 'to_date') THEN
    ALTER TABLE public.cash_transactions ADD COLUMN to_date timestamp with time zone;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cash_transactions' AND column_name = 'remarks') THEN
    ALTER TABLE public.cash_transactions ADD COLUMN remarks text;
  END IF;
END $$;