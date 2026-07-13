-- Add role column to users table for admin access control
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'user';

-- Ensure admin@begreen.com exists and has admin role
-- If the user doesn't exist yet, insert them with a default password
INSERT INTO public.users (username, password, role)
VALUES ('admin@begreen.com', 'BeGreen@2025', 'admin')
ON CONFLICT (username) DO UPDATE SET role = 'admin';
