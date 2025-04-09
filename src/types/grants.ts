
export interface Grant {
  id: string;
  title: string;
  category: string | null;
  funding_amount: number;
  duration: number | null;
  summary: string | null;
  description: string | null;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
  submitter_id: string;
  created_at: string;
  updated_at: string;
  
  // New fields
  funder: string | null;
  start_date: string | null;
  end_date: string | null;
  department: string | null;
  collaborators: string[] | null;
  student_involvement: number | null;
  
  // Report fields
  has_mid_term_report: boolean;
  has_closeout_report: boolean;
  agreement_uploaded: boolean;
  
  // Added for display purposes
  submitter_name?: string;
}

export interface Document {
  id: string;
  grant_id: string;
  name: string;
  file_path: string;
  file_type: string | null;
  file_size: number | null;
  uploaded_by: string;
  created_at: string;
}

export interface Review {
  id: string;
  grant_id: string;
  reviewer_id: string;
  rating: number | null;
  comments: string | null;
  recommendation: 'approve' | 'reject' | 'revise' | null;
  created_at: string;
  updated_at: string;
  
  // Display properties
  reviewer_name?: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  role: 'researcher' | 'admin' | 'reviewer' | 'institutional_admin';
  institution: string | null;
  department: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
}

export interface IntellectualProperty {
  id: string;
  grant_id: string | null;
  title: string;
  type: 'patent' | 'copyright' | 'trademark' | 'trade_secret';
  status: 'pending' | 'approved' | 'registered';
  filing_date: string | null;
  approval_date: string | null;
  reference_number: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
  
  // This is not part of the database schema but will be populated in the UI
  grant_title?: string;
  // For joins
  grants?: { title: string };
}

export interface FundingOpportunity {
  id: string;
  title: string;
  funder: string;
  description: string | null;
  category: string[] | null;
  deadline: string | null;
  eligibility: string | null;
  link: string | null;
  created_at: string;
  created_by: string | null;
}
