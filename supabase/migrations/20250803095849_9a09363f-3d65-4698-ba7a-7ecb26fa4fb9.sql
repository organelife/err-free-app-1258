-- Enable RLS on audit_log table
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for audit_log - allow admins to manage audit logs
CREATE POLICY "Admins can manage audit logs" 
ON public.audit_log 
FOR ALL 
USING (true) 
WITH CHECK (true);