-- Update eva's password to be properly hashed
UPDATE management_users 
SET password_hash = '$2a$10$N9qo8uLOickgx2ZMRZoMyu.t/Az9El.RLa4R05WYwfZ8.aBBzVILW' 
WHERE username = 'eva';

-- This is the bcrypt hash for password "123"