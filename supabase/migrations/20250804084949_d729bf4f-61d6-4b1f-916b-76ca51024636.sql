-- Drop dependent RLS policies on registrations table first
DROP POLICY IF EXISTS "Admins can read registrations" ON registrations;
DROP POLICY IF EXISTS "Admins can insert registrations" ON registrations; 
DROP POLICY IF EXISTS "Admins can update registrations" ON registrations;

-- Drop existing admin tables
DROP TABLE IF EXISTS admin_permissions CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- Create new management_users table
CREATE TABLE public.management_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_manager', 'local_manager', 'user_manager')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create new management_permissions table
CREATE TABLE public.management_permissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  manager_id UUID REFERENCES management_users(id) ON DELETE CASCADE,
  module TEXT NOT NULL,
  permission_type TEXT NOT NULL CHECK (permission_type IN ('read', 'write', 'delete')),
  can_read BOOLEAN NOT NULL DEFAULT false,
  can_write BOOLEAN NOT NULL DEFAULT false,
  can_delete BOOLEAN NOT NULL DEFAULT false,
  can_manage_managers BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.management_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.management_permissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for management tables
CREATE POLICY "Allow all operations for management system" ON management_users
FOR ALL USING (true)
WITH CHECK (true);

CREATE POLICY "Allow all operations for management permissions" ON management_permissions
FOR ALL USING (true)
WITH CHECK (true);

-- Create new RLS policies for registrations table referencing management_users
CREATE POLICY "Managers can read registrations" ON registrations
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM management_users 
    WHERE id::text = auth.uid()::text AND is_active = true
  )
);

CREATE POLICY "Managers can insert registrations" ON registrations  
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM management_users 
    WHERE id::text = auth.uid()::text AND is_active = true
  )
);

CREATE POLICY "Managers can update registrations" ON registrations
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM management_users 
    WHERE id::text = auth.uid()::text AND is_active = true
  )
);

-- Insert default super manager account (password is "manager123")
INSERT INTO management_users (username, password_hash, role, is_active) 
VALUES ('manager', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'super_manager', true);