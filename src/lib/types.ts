export interface Profile {
  id: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  state_pin: string;
  aadhar_number: string;
  role: 'member' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Plot {
  id: string;
  plot_number: string;
  survey_number: string;
  area_sq_yards: number;
  owner_id: string;
  status: 'active' | 'transferred' | 'archived';
  created_at: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  photo_url: string;
  display_order: number;
  active: boolean;
  created_at: string;
}

export interface BoardMember {
  id: string;
  name: string;
  designation: string;
  tenure: string;
  phone: string;
  email: string;
  photo_url: string;
  created_at: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  posted_by: string | null;
  expires_at: string | null;
  pinned: boolean;
  created_at: string;
}

export interface Complaint {
  id: string;
  member_id: string;
  title: string;
  description: string;
  category: 'general' | 'infrastructure' | 'security' | 'maintenance' | 'billing' | 'other';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  admin_notes: string;
  created_at: string;
  updated_at: string;
}

export interface Bill {
  id: string;
  member_id: string;
  amount: number;
  description: string;
  due_date: string;
  paid_date: string | null;
  status: 'pending' | 'paid' | 'overdue';
  created_at: string;
}

export interface MeetingDocument {
  id: string;
  title: string;
  document_url: string;
  document_type: 'minutes' | 'circular' | 'financial' | 'general';
  uploaded_by: string | null;
  created_at: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  category: 'lifestyle' | 'infrastructure' | 'services';
  icon: string;
  image_url: string;
  display_order: number;
  active: boolean;
  created_at: string;
}

export interface MembershipApplication {
  id: string;
  applicant1_first_name: string;
  applicant1_last_name: string;
  applicant1_father_spouse: string;
  applicant1_address: string;
  applicant1_city: string;
  applicant1_state_pin: string;
  applicant1_contact: string;
  applicant1_email: string;
  applicant1_aadhar: string;
  applicant2_first_name: string;
  applicant2_last_name: string;
  applicant2_father_spouse: string;
  applicant2_contact: string;
  applicant2_email: string;
  applicant2_aadhar: string;
  plots: PlotEntry[];
  total_sq_yards: number;
  status: 'pending' | 'approved' | 'rejected';
  notes: string;
  submitted_at: string;
}

export interface PlotEntry {
  plot_number: string;
  survey_number: string;
  sq_yards: string;
}
