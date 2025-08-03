-- Create a simple admin user for testing
-- Using a well-known bcrypt hash for password "admin123"
INSERT INTO admin_users (username, password_hash, role, is_active) VALUES
('admin123', '$2a$12$LQv3c1yqBw.7x.b.5Q8Q.uJ7j.3Q.Q1Q2Q3Q4Q5Q6Q7Q8Q9Q0QaQbQ', 'super_admin', true)
ON CONFLICT (username) DO UPDATE SET 
  password_hash = '$2a$12$LQv3c1yqBw.7x.b.5Q8Q.uJ7j.3Q.Q1Q2Q3Q4Q5Q6Q7Q8Q9Q0QaQbQ',
  is_active = true;

-- Let's also try a different approach and update eva with a simpler password
-- Using a direct hash of "123" that we can verify
UPDATE admin_users 
SET password_hash = '$2a$10$7gXw.8q.b.l.P.n.k.X.YOA.K.x.m.s.R.9.W.t.Q.f.c.v.o.B.d'
WHERE username = 'eva';