-- Disable Row Level Security (RLS) on project tables
-- Run these statements in Supabase SQL Editor or via psql with a privileged connection

ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE recycleurs DISABLE ROW LEVEL SECURITY;
ALTER TABLE collectes DISABLE ROW LEVEL SECURITY;
ALTER TABLE paiements DISABLE ROW LEVEL SECURITY;
ALTER TABLE avis DISABLE ROW LEVEL SECURITY;
ALTER TABLE membres_foyer DISABLE ROW LEVEL SECURITY;
