-- Add missing is_highlighted column to categories table
ALTER TABLE public.categories 
ADD COLUMN IF NOT EXISTS is_highlighted boolean DEFAULT false;