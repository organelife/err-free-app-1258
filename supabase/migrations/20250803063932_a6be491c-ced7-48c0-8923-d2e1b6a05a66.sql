-- Create a new approval system for registrations
-- First, add a new approval_status column to track approval workflow
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS approval_status TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected'));

-- Add approval tracking columns
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS approval_notes TEXT;

-- Create function to handle registration approval
CREATE OR REPLACE FUNCTION public.approve_registration(
  registration_id UUID,
  approver_username TEXT DEFAULT NULL,
  notes TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.registrations 
  SET 
    approval_status = 'approved',
    status = 'approved',
    approved_at = now(),
    approved_date = now(),
    approved_by = COALESCE(approver_username, 'system'),
    approval_notes = notes,
    updated_at = now()
  WHERE id = registration_id;
  
  -- Update cash summary when approved
  UPDATE public.cash_summary 
  SET 
    cash_in_hand = cash_in_hand + (SELECT fee_paid FROM public.registrations WHERE id = registration_id),
    updated_at = now();
END;
$$;

-- Create function to reject registration
CREATE OR REPLACE FUNCTION public.reject_registration(
  registration_id UUID,
  rejector_username TEXT DEFAULT NULL,
  notes TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.registrations 
  SET 
    approval_status = 'rejected',
    status = 'rejected',
    approved_by = COALESCE(rejector_username, 'system'),
    approval_notes = notes,
    updated_at = now()
  WHERE id = registration_id;
END;
$$;

-- Create function to reset registration to pending
CREATE OR REPLACE FUNCTION public.reset_registration_approval(
  registration_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.registrations 
  SET 
    approval_status = 'pending',
    status = 'pending',
    approved_at = NULL,
    approved_date = NULL,
    approved_by = NULL,
    approval_notes = NULL,
    updated_at = now()
  WHERE id = registration_id;
END;
$$;