-- Fix the approval functions to properly handle cash summary updates
CREATE OR REPLACE FUNCTION public.approve_registration(
  registration_id UUID,
  approver_username TEXT DEFAULT NULL,
  notes TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  registration_fee NUMERIC;
BEGIN
  -- Get the fee amount first
  SELECT fee_paid INTO registration_fee 
  FROM public.registrations 
  WHERE id = registration_id;
  
  -- Update the registration
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
  
  -- Update cash summary (ensure there's at least one row)
  INSERT INTO public.cash_summary (cash_in_hand, cash_at_bank, updated_at)
  SELECT 0, 0, now()
  WHERE NOT EXISTS (SELECT 1 FROM public.cash_summary);
  
  -- Update the first (and likely only) cash summary row
  UPDATE public.cash_summary 
  SET 
    cash_in_hand = cash_in_hand + COALESCE(registration_fee, 0),
    updated_at = now()
  WHERE id = (SELECT id FROM public.cash_summary LIMIT 1);
END;
$$;

-- Also fix the reject function for consistency
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