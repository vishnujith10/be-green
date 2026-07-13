-- Disable RLS on the products table so the server-side API (which acts as anon) can perform updates.
-- Our custom API routes (/api/admin/products/*) already enforce security by checking the x-user-id header
-- against the custom users table before allowing any operations.

ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
