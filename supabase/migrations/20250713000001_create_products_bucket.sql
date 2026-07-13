-- Create the storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to the bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Allow authenticated users to upload, update, and delete objects
-- Since our custom auth is in `users` table and not Supabase Auth,
-- we'll rely on the API routes to restrict access, but we still need
-- to allow the anon/authenticated Supabase role to perform these actions
-- so the browser client (or API route client) can upload.
CREATE POLICY "Allow anon/authenticated uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow anon/authenticated updates"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'product-images');

CREATE POLICY "Allow anon/authenticated deletes"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'product-images');
