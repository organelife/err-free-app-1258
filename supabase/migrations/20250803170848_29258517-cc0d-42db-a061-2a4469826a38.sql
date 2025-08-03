-- Create RPC functions for registration approval
CREATE OR REPLACE FUNCTION public.approve_registration(
    registration_id uuid,
    approver_username text,
    notes text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.registrations 
    SET 
        status = 'approved',
        approved_date = now(),
        approved_by = approver_username,
        approval_notes = notes,
        updated_at = now()
    WHERE id = registration_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Registration not found';
    END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.reject_registration(
    registration_id uuid,
    rejector_username text,
    notes text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.registrations 
    SET 
        status = 'rejected',
        approved_date = now(),
        approved_by = rejector_username,
        approval_notes = notes,
        updated_at = now()
    WHERE id = registration_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Registration not found';
    END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.reset_registration_approval(
    registration_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.registrations 
    SET 
        status = 'pending',
        approved_date = NULL,
        approved_by = NULL,
        approval_notes = NULL,
        updated_at = now()
    WHERE id = registration_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Registration not found';
    END IF;
END;
$$;