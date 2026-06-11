
/*
# Jagannathapuram Plot Owners Welfare Association - Initial Schema

## Overview
Full schema for the association management platform with member management,
plots, complaints, notices, bills, committee, and meeting documents.

## New Tables
1. `profiles` - Extended user profiles linked to auth.users
   - id (uuid, pk, references auth.users)
   - full_name, phone, address, aadhar_number, role (member|admin)

2. `plots` - Plot ownership records
   - plot_number, survey_number, area_sq_yards, owner_id

3. `committee_members` - Executive committee
   - name, position, phone, email, photo_url, display_order, active

4. `board_members` - Board members
   - name, designation, tenure, phone, email, photo_url

5. `notices` - Association announcements
   - title, content, posted_by, expires_at

6. `complaints` - Member complaints
   - member_id, title, description, category, status

7. `bills` - Maintenance bills
   - member_id, amount, due_date, paid_date, status, description

8. `meeting_documents` - Meeting minutes and circulars
   - title, document_url, document_type, uploaded_by

9. `facilities` - Facility listings
   - name, description, category, icon, image_url, display_order

10. `membership_applications` - Membership form submissions
    - applicant1_* and applicant2_* fields, plot details, status

## Security
- RLS enabled on all tables
- Authenticated users can read most data
- Members can only manage their own complaints/bills
- Admins have full CRUD via role check
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  phone text DEFAULT '',
  address text DEFAULT '',
  city text DEFAULT '',
  state_pin text DEFAULT '',
  aadhar_number text DEFAULT '',
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT
TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT
TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE
TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT
TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles p2 WHERE p2.id = auth.uid() AND p2.role = 'admin')
  OR auth.uid() = id
);

-- Plots table
CREATE TABLE IF NOT EXISTS plots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plot_number text NOT NULL,
  survey_number text DEFAULT '',
  area_sq_yards numeric DEFAULT 0,
  owner_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'transferred', 'archived')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE plots ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Members can view own plots" ON plots;
CREATE POLICY "Members can view own plots" ON plots FOR SELECT
TO authenticated USING (auth.uid() = owner_id OR
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can insert plots" ON plots;
CREATE POLICY "Admins can insert plots" ON plots FOR INSERT
TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can update plots" ON plots;
CREATE POLICY "Admins can update plots" ON plots FOR UPDATE
TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
) WITH CHECK (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can delete plots" ON plots;
CREATE POLICY "Admins can delete plots" ON plots FOR DELETE
TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

-- Committee members table
CREATE TABLE IF NOT EXISTS committee_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  phone text DEFAULT '',
  email text DEFAULT '',
  photo_url text DEFAULT '',
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE committee_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view committee" ON committee_members;
CREATE POLICY "Anyone can view committee" ON committee_members FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Admins can insert committee" ON committee_members;
CREATE POLICY "Admins can insert committee" ON committee_members FOR INSERT
TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can update committee" ON committee_members;
CREATE POLICY "Admins can update committee" ON committee_members FOR UPDATE
TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
) WITH CHECK (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can delete committee" ON committee_members;
CREATE POLICY "Admins can delete committee" ON committee_members FOR DELETE
TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

-- Board members table
CREATE TABLE IF NOT EXISTS board_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  designation text NOT NULL,
  tenure text DEFAULT '',
  phone text DEFAULT '',
  email text DEFAULT '',
  photo_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE board_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view board" ON board_members;
CREATE POLICY "Anyone can view board" ON board_members FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Admins can insert board" ON board_members;
CREATE POLICY "Admins can insert board" ON board_members FOR INSERT
TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can update board" ON board_members;
CREATE POLICY "Admins can update board" ON board_members FOR UPDATE
TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
) WITH CHECK (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can delete board" ON board_members;
CREATE POLICY "Admins can delete board" ON board_members FOR DELETE
TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

-- Notices table
CREATE TABLE IF NOT EXISTS notices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  posted_by uuid REFERENCES profiles(id),
  expires_at timestamptz,
  pinned boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated can view notices" ON notices;
CREATE POLICY "Authenticated can view notices" ON notices FOR SELECT
TO authenticated USING (true);

DROP POLICY IF EXISTS "Admins can insert notices" ON notices;
CREATE POLICY "Admins can insert notices" ON notices FOR INSERT
TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can update notices" ON notices;
CREATE POLICY "Admins can update notices" ON notices FOR UPDATE
TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
) WITH CHECK (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can delete notices" ON notices;
CREATE POLICY "Admins can delete notices" ON notices FOR DELETE
TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

-- Complaints table
CREATE TABLE IF NOT EXISTS complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  category text DEFAULT 'general' CHECK (category IN ('general', 'infrastructure', 'security', 'maintenance', 'billing', 'other')),
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  admin_notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Members can view own complaints" ON complaints;
CREATE POLICY "Members can view own complaints" ON complaints FOR SELECT
TO authenticated USING (auth.uid() = member_id OR
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

DROP POLICY IF EXISTS "Members can insert own complaints" ON complaints;
CREATE POLICY "Members can insert own complaints" ON complaints FOR INSERT
TO authenticated WITH CHECK (auth.uid() = member_id);

DROP POLICY IF EXISTS "Members can update own complaints" ON complaints;
CREATE POLICY "Members can update own complaints" ON complaints FOR UPDATE
TO authenticated USING (auth.uid() = member_id OR
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
) WITH CHECK (auth.uid() = member_id OR
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

DROP POLICY IF EXISTS "Members can delete own complaints" ON complaints;
CREATE POLICY "Members can delete own complaints" ON complaints FOR DELETE
TO authenticated USING (auth.uid() = member_id OR
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

-- Bills table
CREATE TABLE IF NOT EXISTS bills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount numeric NOT NULL DEFAULT 0,
  description text DEFAULT 'Maintenance Fee',
  due_date date NOT NULL,
  paid_date date,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bills ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Members can view own bills" ON bills;
CREATE POLICY "Members can view own bills" ON bills FOR SELECT
TO authenticated USING (auth.uid() = member_id OR
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can insert bills" ON bills;
CREATE POLICY "Admins can insert bills" ON bills FOR INSERT
TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can update bills" ON bills;
CREATE POLICY "Admins can update bills" ON bills FOR UPDATE
TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
) WITH CHECK (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can delete bills" ON bills;
CREATE POLICY "Admins can delete bills" ON bills FOR DELETE
TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

-- Meeting documents table
CREATE TABLE IF NOT EXISTS meeting_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  document_url text NOT NULL,
  document_type text DEFAULT 'minutes' CHECK (document_type IN ('minutes', 'circular', 'financial', 'general')),
  uploaded_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE meeting_documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated can view docs" ON meeting_documents;
CREATE POLICY "Authenticated can view docs" ON meeting_documents FOR SELECT
TO authenticated USING (true);

DROP POLICY IF EXISTS "Admins can insert docs" ON meeting_documents;
CREATE POLICY "Admins can insert docs" ON meeting_documents FOR INSERT
TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can update docs" ON meeting_documents;
CREATE POLICY "Admins can update docs" ON meeting_documents FOR UPDATE
TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
) WITH CHECK (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can delete docs" ON meeting_documents;
CREATE POLICY "Admins can delete docs" ON meeting_documents FOR DELETE
TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

-- Facilities table
CREATE TABLE IF NOT EXISTS facilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  category text DEFAULT 'lifestyle' CHECK (category IN ('lifestyle', 'infrastructure', 'services')),
  icon text DEFAULT 'Star',
  image_url text DEFAULT '',
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view facilities" ON facilities;
CREATE POLICY "Anyone can view facilities" ON facilities FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Admins can insert facilities" ON facilities;
CREATE POLICY "Admins can insert facilities" ON facilities FOR INSERT
TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can update facilities" ON facilities;
CREATE POLICY "Admins can update facilities" ON facilities FOR UPDATE
TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
) WITH CHECK (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can delete facilities" ON facilities;
CREATE POLICY "Admins can delete facilities" ON facilities FOR DELETE
TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

-- Membership applications table
CREATE TABLE IF NOT EXISTS membership_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant1_first_name text NOT NULL,
  applicant1_last_name text NOT NULL,
  applicant1_father_spouse text DEFAULT '',
  applicant1_address text DEFAULT '',
  applicant1_city text DEFAULT '',
  applicant1_state_pin text DEFAULT '',
  applicant1_contact text DEFAULT '',
  applicant1_email text DEFAULT '',
  applicant1_aadhar text DEFAULT '',
  applicant2_first_name text DEFAULT '',
  applicant2_last_name text DEFAULT '',
  applicant2_father_spouse text DEFAULT '',
  applicant2_contact text DEFAULT '',
  applicant2_email text DEFAULT '',
  applicant2_aadhar text DEFAULT '',
  plots jsonb DEFAULT '[]',
  total_sq_yards numeric DEFAULT 0,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  notes text DEFAULT '',
  submitted_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  reviewed_by uuid REFERENCES profiles(id)
);

ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit application" ON membership_applications;
CREATE POLICY "Anyone can submit application" ON membership_applications FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view applications" ON membership_applications;
CREATE POLICY "Admins can view applications" ON membership_applications FOR SELECT
TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can update applications" ON membership_applications;
CREATE POLICY "Admins can update applications" ON membership_applications FOR UPDATE
TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
) WITH CHECK (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

-- Insert default committee members
INSERT INTO committee_members (name, position, phone, email, display_order, active) VALUES
  ('rAVINDER REDI', 'President', '+91 9000014369', '', 1, true),
  ('Emmidi Rames', 'Vice president', '+91 9848532523', '', 2, true),
  ('T. Sudhanidi', 'Secretary', '+91 9347313261', '', 3, true),
  ('Surendar Redd', 'Treasurar', '+91 9030803177', '', 4, true),
  ('M Santosh', 'Executive Committee Member', '+91 9959153334', '', 5, true),
  ('R Madhukar', 'Executive Committee Member', '+91 9989304443', '', 6, true),
  ('P Chandra Red', 'Executive Committee Member', '+91 7799571875', '', 7, true),
  ('M Shivraj Redd', 'Executive Committee Member', '+91 8125245678', '', 8, true),
  ('B Jalendar Red', 'Executive Committee Member', '+91 9484159712', '', 9, true),
  ('Rambabu', 'Executive Committee Member', '+91 9849999082', '', 10, true),
  ('Rajendar Redd', 'Executive Committee Member', '+91 9550913131', '', 11, true),
  ('Ch Venkat Red', 'Executive Committee Member', '+91 9346299098', '', 12, true),
  ('J Ram Chandra', 'Executive Committee Member', '+91 9490204232', '', 13, true),
  ('P Venu Gopal', 'PRO', '+91 9618401734', '', 14, true)
ON CONFLICT DO NOTHING;

-- Insert default facilities
INSERT INTO facilities (name, description, category, icon, image_url, display_order) VALUES
  ('Gated Community', 'Secure gated entry with 24x7 monitoring and controlled access for all residents.', 'lifestyle', 'Shield', 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg', 1),
  ('Club House', 'A premium clubhouse for social gatherings, events, and community activities.', 'lifestyle', 'Building2', 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg', 2),
  ('Community Center', 'Multi-purpose community center for meetings, celebrations, and cultural events.', 'lifestyle', 'Users', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg', 3),
  ('Fitness Center', 'Fully equipped gym and fitness center for health-conscious residents.', 'lifestyle', 'Dumbbell', 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg', 4),
  ('Playground', 'Safe and well-maintained playground with modern equipment for children.', 'lifestyle', 'PlayCircle', 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg', 5),
  ('Picnic Area', 'Beautiful landscaped picnic areas for family outings and social activities.', 'lifestyle', 'TreePine', 'https://images.pexels.com/photos/7005732/pexels-photo-7005732.jpeg', 6),
  ('Volleyball Court', 'Full-sized volleyball court for sports enthusiasts.', 'lifestyle', 'Circle', 'https://images.pexels.com/photos/1921434/pexels-photo-1921434.jpeg', 7),
  ('Tennis Court', 'Professional tennis court for sports and recreation.', 'lifestyle', 'Circle', 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg', 8),
  ('Underground Electricity', 'Modern underground electrical cabling for safety and aesthetics.', 'infrastructure', 'Zap', 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg', 9),
  ('Underground Drainage', 'Efficient underground drainage system preventing waterlogging.', 'infrastructure', 'Droplets', 'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg', 10),
  ('Black Top Roads', 'Well-maintained asphalted internal roads for smooth commuting.', 'infrastructure', 'RouteOff', 'https://images.pexels.com/photos/1197095/pexels-photo-1197095.jpeg', 11),
  ('Street Lights', 'Energy-efficient LED street lighting throughout the layout.', 'infrastructure', 'Lightbulb', 'https://images.pexels.com/photos/235990/pexels-photo-235990.jpeg', 12),
  ('Water Piping', 'Dedicated water supply pipeline network for all plots.', 'infrastructure', 'Droplet', 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg', 13),
  ('Plantation', 'Extensive green plantation and landscaping throughout the layout.', 'infrastructure', 'Trees', 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg', 14),
  ('Highway Access', 'Easy connectivity to major highways and transportation hubs.', 'services', 'MapPin', 'https://images.pexels.com/photos/730778/pexels-photo-730778.jpeg', 15),
  ('On-Site Maintenance', 'Dedicated maintenance team available round-the-clock for support.', 'services', 'Wrench', 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg', 16)
ON CONFLICT DO NOTHING;
