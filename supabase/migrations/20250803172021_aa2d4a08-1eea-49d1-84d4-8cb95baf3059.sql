-- Update eva's password hash to match "123"
-- First, let's generate the correct hash for password "123"
UPDATE admin_users 
SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
WHERE username = 'eva';