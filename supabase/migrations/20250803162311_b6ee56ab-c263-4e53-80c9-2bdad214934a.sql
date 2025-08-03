-- Create a test admin user with password "password"
-- Using a known good bcrypt hash for "password"
INSERT INTO admin_users (username, password_hash, role, is_active) VALUES
('testadmin', '$2a$10$N9qo8uLOickgx2ZMRZoMye.FQ3j.ixlnpYFVgGR5bklLcGKpLZ2t2', 'super_admin', true)
ON CONFLICT (username) DO UPDATE SET 
  password_hash = '$2a$10$N9qo8uLOickgx2ZMRZoMye.FQ3j.ixlnpYFVgGR5bklLcGKpLZ2t2',
  is_active = true;

-- Also update eva with a fresh hash for password "123"
UPDATE admin_users 
SET password_hash = '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW'
WHERE username = 'eva';