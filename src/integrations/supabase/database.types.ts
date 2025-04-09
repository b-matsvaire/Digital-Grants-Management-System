
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          role: string
          institution: string | null
          department: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          role?: string
          institution?: string | null
          department?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string | null
          role?: string
          institution?: string | null
          department?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      grants: {
        Row: {
          id: string
          submitter_id: string
          title: string
          funder: string | null
          category: string | null
          funding_amount: number
          duration: number | null
          start_date: string | null
          end_date: string | null
          department: string | null
          student_involvement: number | null
          collaborators: string[] | null
          summary: string | null
          description: string | null
          status: "submitted" | "under_review" | "approved" | "rejected"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          submitter_id: string
          title: string
          funder?: string | null
          category?: string | null
          funding_amount: number
          duration?: number | null
          start_date?: string | null
          end_date?: string | null
          department?: string | null
          student_involvement?: number | null
          collaborators?: string[] | null
          summary?: string | null
          description?: string | null
          status?: "submitted" | "under_review" | "approved" | "rejected"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          submitter_id?: string
          title?: string
          funder?: string | null
          category?: string | null
          funding_amount?: number
          duration?: number | null
          start_date?: string | null
          end_date?: string | null
          department?: string | null
          student_involvement?: number | null
          collaborators?: string[] | null
          summary?: string | null
          description?: string | null
          status?: "submitted" | "under_review" | "approved" | "rejected"
          created_at?: string
          updated_at?: string
        }
      }
      grant_documents: {
        Row: {
          id: string
          grant_id: string
          name: string
          file_path: string
          file_type: string | null
          file_size: number | null
          uploaded_by: string
          created_at: string
        }
        Insert: {
          id?: string
          grant_id: string
          name: string
          file_path: string
          file_type?: string | null
          file_size?: number | null
          uploaded_by: string
          created_at?: string
        }
        Update: {
          id?: string
          grant_id?: string
          name?: string
          file_path?: string
          file_type?: string | null
          file_size?: number | null
          uploaded_by?: string
          created_at?: string
        }
      }
      grant_reviews: {
        Row: {
          id: string
          grant_id: string
          reviewer_id: string
          rating: number | null
          comments: string | null
          recommendation: "approve" | "reject" | "revise" | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          grant_id: string
          reviewer_id: string
          rating?: number | null
          comments?: string | null
          recommendation?: "approve" | "reject" | "revise" | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          grant_id?: string
          reviewer_id?: string
          rating?: number | null
          comments?: string | null
          recommendation?: "approve" | "reject" | "revise" | null
          created_at?: string
          updated_at?: string
        }
      }
      funding_opportunities: {
        Row: {
          id: string
          title: string
          funder: string
          description: string | null
          category: string[] | null
          deadline: string | null
          eligibility: string | null
          link: string | null
          created_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          title: string
          funder: string
          description?: string | null
          category?: string[] | null
          deadline?: string | null
          eligibility?: string | null
          link?: string | null
          created_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          title?: string
          funder?: string
          description?: string | null
          category?: string[] | null
          deadline?: string | null
          eligibility?: string | null
          link?: string | null
          created_at?: string
          created_by?: string | null
        }
      }
      intellectual_property: {
        Row: {
          id: string
          title: string
          type: "patent" | "copyright" | "trademark" | "trade_secret"
          status: "pending" | "approved" | "registered"
          grant_id: string | null
          description: string | null
          filing_date: string | null
          approval_date: string | null
          reference_number: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          type: "patent" | "copyright" | "trademark" | "trade_secret"
          status: "pending" | "approved" | "registered"
          grant_id?: string | null
          description?: string | null
          filing_date?: string | null
          approval_date?: string | null
          reference_number?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          type?: "patent" | "copyright" | "trademark" | "trade_secret"
          status?: "pending" | "approved" | "registered"
          grant_id?: string | null
          description?: string | null
          filing_date?: string | null
          approval_date?: string | null
          reference_number?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
