/*
  # Create Waitlist Signups Table

  1. New Tables
    - `waitlist_signups`
      - `id` (uuid, primary key)
      - `email` (text, unique, not null) - Email address of the signup
      - `created_at` (timestamptz) - Timestamp of when they signed up
      - `notified` (boolean) - Whether they've been notified of launch
  
  2. Security
    - Enable RLS on `waitlist_signups` table
    - Add policy for inserting signups (public can sign up)
    - Add policy for selecting signups (only authenticated admins)
*/

CREATE TABLE IF NOT EXISTS waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  notified boolean DEFAULT false
);

ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can sign up to waitlist"
  ON waitlist_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view waitlist"
  ON waitlist_signups
  FOR SELECT
  TO authenticated
  USING (true);