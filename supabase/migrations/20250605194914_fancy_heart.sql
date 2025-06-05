/*
  # Initial Schema Setup for Job Portal

  1. New Tables
    - users: Stores user information and authentication
    - jobs: Stores job postings
    - applications: Stores job applications
  
  2. Security
    - Enable RLS on all tables
    - Add policies for data access
*/

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('jobseeker', 'recruiter', 'admin')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create jobs table
CREATE TABLE jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Full-time', 'Part-time', 'Contract', 'Internship')),
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  created_by uuid REFERENCES users(id)
);

-- Create applications table
CREATE TABLE applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id),
  user_id uuid REFERENCES users(id),
  resume TEXT NOT NULL,
  cover_letter TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- Jobs policies
CREATE POLICY "Anyone can view jobs" ON jobs
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Recruiters can create jobs" ON jobs
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'recruiter'
    )
  );

CREATE POLICY "Recruiters can update own jobs" ON jobs
  FOR UPDATE TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'recruiter'
    )
  );

-- Applications policies
CREATE POLICY "Job seekers can view own applications" ON applications
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Job seekers can create applications" ON applications
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'jobseeker'
    )
  );

CREATE POLICY "Recruiters can view applications for their jobs" ON applications
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM jobs
      WHERE jobs.id = applications.job_id
      AND jobs.created_by = auth.uid()
    )
  );