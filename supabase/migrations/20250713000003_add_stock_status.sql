-- Add in_stock boolean column to products table
ALTER TABLE public.products
ADD COLUMN in_stock BOOLEAN NOT NULL DEFAULT true;
