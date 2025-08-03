-- Fix the approve_registration function to handle multiple cash_summary rows properly
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
  summary_count INTEGER;
BEGIN
  -- Get the fee amount first
  SELECT COALESCE(fee_paid, 0) INTO registration_fee 
  FROM public.registrations 
  WHERE id = registration_id;
  
  -- Check if registration exists
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Registration not found';
  END IF;
  
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
  
  -- Check cash summary table state
  SELECT COUNT(*) INTO summary_count FROM public.cash_summary;
  
  -- If no cash summary exists, create one
  IF summary_count = 0 THEN
    INSERT INTO public.cash_summary (cash_in_hand, cash_at_bank, updated_at)
    VALUES (registration_fee, 0, now());
  ELSE
    -- Update the first cash summary row and clean up duplicates
    UPDATE public.cash_summary 
    SET 
      cash_in_hand = cash_in_hand + registration_fee,
      updated_at = now()
    WHERE id = (SELECT id FROM public.cash_summary ORDER BY updated_at DESC LIMIT 1);
    
    -- Clean up duplicate rows if they exist
    DELETE FROM public.cash_summary 
    WHERE id NOT IN (
      SELECT id FROM public.cash_summary 
      ORDER BY updated_at DESC 
      LIMIT 1
    );
  END IF;
END;
$$;