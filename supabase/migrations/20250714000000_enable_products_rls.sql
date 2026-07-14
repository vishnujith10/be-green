-- Enable RLS on the products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Allow public read access on products"
ON public.products FOR SELECT
TO public
USING (true);

-- The admin backend uses the Service Role Key, which automatically bypasses RLS,
-- so we do not need to create explicit INSERT/UPDATE/DELETE policies for admins.
