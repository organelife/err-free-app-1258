-- Update the admin user with a properly hashed password
-- The password will be "123" but properly hashed with bcrypt
UPDATE admin_users 
SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
WHERE username = 'eva';

-- Insert a few more test admin users with proper bcrypt hashes
INSERT INTO admin_users (username, password_hash, role, is_active) VALUES
('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'super_admin', true),
('test', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'local_admin', true)
ON CONFLICT (username) DO NOTHING;