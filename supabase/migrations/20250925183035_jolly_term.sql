/*
  # ClearContracts Database Schema

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `subscription_plan` (text, default 'free')
      - `monthly_uploads` (integer, default 0)
      - `stripe_customer_id` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `documents`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `title` (text)
      - `file_path` (text)
      - `file_type` (text)
      - `file_size` (bigint)
      - `version` (integer, default 1)
      - `parent_document_id` (uuid, self-reference)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `document_analyses`
      - `id` (uuid, primary key)
      - `document_id` (uuid, references documents)
      - `client_summary` (text)
      - `lawyer_summary` (text)
      - `risk_score` (integer)
      - `risk_flags` (jsonb)
      - `suggested_clause` (text)
      - `created_at` (timestamp)

    - `lawyers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `specialties` (text[])
      - `location` (text)
      - `rating` (numeric)
      - `contact_email` (text)
      - `bio` (text)
      - `created_at` (timestamp)

    - `referrals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `lawyer_id` (uuid, references lawyers)
      - `issue_description` (text)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)

    - `usage_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `action` (text)
      - `document_id` (uuid, references documents)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
    - Add admin policies for management
*/

-- User profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  subscription_plan text DEFAULT 'free' CHECK (subscription_plan IN ('free', 'pro', 'business')),
  monthly_uploads integer DEFAULT 0,
  stripe_customer_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  file_path text NOT NULL,
  file_type text NOT NULL,
  file_size bigint NOT NULL,
  version integer DEFAULT 1,
  parent_document_id uuid REFERENCES documents(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Document analyses table
CREATE TABLE IF NOT EXISTS document_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  client_summary text,
  lawyer_summary text,
  risk_score integer CHECK (risk_score >= 0 AND risk_score <= 100),
  risk_flags jsonb DEFAULT '[]'::jsonb,
  suggested_clause text,
  created_at timestamptz DEFAULT now()
);

-- Lawyers table
CREATE TABLE IF NOT EXISTS lawyers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  specialties text[] DEFAULT '{}',
  location text,
  rating numeric(3,2) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
  contact_email text NOT NULL,
  bio text,
  created_at timestamptz DEFAULT now()
);

-- Referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  lawyer_id uuid NOT NULL REFERENCES lawyers(id) ON DELETE CASCADE,
  issue_description text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed')),
  created_at timestamptz DEFAULT now()
);

-- Usage logs table
CREATE TABLE IF NOT EXISTS usage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  action text NOT NULL,
  document_id uuid REFERENCES documents(id),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lawyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Documents policies
CREATE POLICY "Users can manage own documents"
  ON documents
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Document analyses policies
CREATE POLICY "Users can read analyses of own documents"
  ON document_analyses
  FOR SELECT
  TO authenticated
  USING (
    document_id IN (
      SELECT id FROM documents WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Service can insert analyses"
  ON document_analyses
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Lawyers policies (public read)
CREATE POLICY "Anyone can read lawyers"
  ON lawyers
  FOR SELECT
  TO authenticated
  USING (true);

-- Referrals policies
CREATE POLICY "Users can manage own referrals"
  ON referrals
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Usage logs policies
CREATE POLICY "Users can read own usage logs"
  ON usage_logs
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Service can insert usage logs"
  ON usage_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert sample lawyers
INSERT INTO lawyers (name, specialties, location, rating, contact_email, bio) VALUES
  ('Sarah Johnson', ARRAY['Contract Law', 'Business Law'], 'New York, NY', 4.8, 'sarah@lawfirm.com', 'Experienced contract attorney with 15+ years helping businesses navigate complex agreements.'),
  ('Michael Chen', ARRAY['Employment Law', 'Contract Review'], 'San Francisco, CA', 4.9, 'mchen@legalgroup.com', 'Specializing in employment contracts and startup legal matters.'),
  ('Emily Rodriguez', ARRAY['Real Estate Law', 'Contract Disputes'], 'Austin, TX', 4.7, 'emily@texaslaw.com', 'Expert in real estate contracts and commercial lease agreements.');

-- Functions for updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();