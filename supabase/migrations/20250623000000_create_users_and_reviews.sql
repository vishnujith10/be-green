-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query)

-- Custom username/password auth (no Supabase Auth, no email)
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Reviews linked to the users table
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text NOT NULL,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow user signup" ON public.users;
CREATE POLICY "Allow user signup"
  ON public.users FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow user login lookup" ON public.users;
CREATE POLICY "Allow user login lookup"
  ON public.users FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow read reviews" ON public.reviews;
CREATE POLICY "Allow read reviews"
  ON public.reviews FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow insert reviews" ON public.reviews;
CREATE POLICY "Allow insert reviews"
  ON public.reviews FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS reviews_product_id_idx ON public.reviews (product_id);
CREATE INDEX IF NOT EXISTS reviews_user_id_idx ON public.reviews (user_id);
