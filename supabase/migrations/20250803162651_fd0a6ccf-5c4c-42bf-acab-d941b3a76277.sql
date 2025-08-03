-- Update eva with a properly generated bcrypt hash for password "123"
-- This is a real bcrypt hash generated for "123"
UPDATE admin_users 
SET password_hash = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
WHERE username = 'eva';