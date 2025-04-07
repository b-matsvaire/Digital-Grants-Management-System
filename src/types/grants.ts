
export interface Grant {
  id: string;
  title: string;
  category: string;
  funding_amount: number;
  duration: number;
  summary: string;
  description: string;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
  submitter_id: string;
  created_at: string;
  updated_at: string;
  
  // New fields
  funder: string;
  start_date: string | null;
  end_date: string | null;
  department: string | null;
  collaborators: string[] | null;
  student_involvement: number | null;
  has_mid_term_report: boolean;
  has_closeout_report: boolean;
  agreement_uploaded: boolean;
}

export interface Document {
  id: string;
  grant_id: string;
  name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
  document_type: 'proposal' | 'agreement' | 'mid_term_report' | 'closeout_report' | 'supporting' | 'ip' | null;
}

export interface Review {
  id: string;
  grant_id: string;
  reviewer_id: string;
  rating: number;
  comments: string;
  recommendation: 'approve' | 'reject' | 'revise';
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  role: 'researcher' | 'admin' | 'reviewer' | 'institutional_admin';
  institution: string | null;
  department: string | null;
  created_at: string;
  updated_at: string;
}

export interface IntellectualProperty {
  id: string;
  grant_id: string;
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
  grants?: {
    title: string;
  };
}

export interface Collaboration {
  id: string;
  grant_id: string;
  partner_name: string;
  partner_type: 'academic' | 'industry' | 'government' | 'non_profit' | 'other';
  contribution_type: string | null;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Deliverable {
  id: string;
  grant_id: string;
  title: string;
  description: string;
  due_date: string;
  status: 'pending' | 'completed' | 'overdue';
  created_at: string;
  updated_at: string;
}

export interface FundingCall {
  id: string;
  title: string;
  funder: string;
  description: string;
  category: string[];
  deadline: string;
  eligibility: string;
  link: string;
  created_at: string;
  updated_at: string;
}
