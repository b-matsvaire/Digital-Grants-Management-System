
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
      documents: {
        Row: {
          id: string
          grant_id: string | null
          name: string
          file_path: string
          file_type: string
          file_size: number
          uploaded_by: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          grant_id?: string | null
          name: string
          file_path: string
          file_type: string
          file_size: number
          uploaded_by: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          grant_id?: string | null
          name?: string
          file_path?: string
          file_type?: string
          file_size?: number
          uploaded_by?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      grants: {
        Row: {
          id: string
          title: string
          category: string
          funding_amount: number
          duration: number
          summary: string
          description: string
          submitter_id: string
          status: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          category: string
          funding_amount: number
          duration: number
          summary: string
          description: string
          submitter_id: string
          status?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          category?: string
          funding_amount?: number
          duration?: number
          summary?: string
          description?: string
          submitter_id?: string
          status?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string | null
          updated_at: string | null
          full_name: string | null
          role: string
          department: string | null
          institution: string | null
        }
        Insert: {
          id: string
          created_at?: string | null
          updated_at?: string | null
          full_name?: string | null
          role?: string
          department?: string | null
          institution?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          updated_at?: string | null
          full_name?: string | null
          role?: string
          department?: string | null
          institution?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          grant_id: string
          reviewer_id: string
          rating: number
          comments: string
          recommendation: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          grant_id: string
          reviewer_id: string
          rating: number
          comments: string
          recommendation: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          grant_id?: string
          reviewer_id?: string
          rating?: number
          comments?: string
          recommendation?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}
