export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      funding_opportunities: {
        Row: {
          category: string[] | null
          created_at: string | null
          created_by: string | null
          deadline: string | null
          description: string | null
          eligibility: string | null
          funder: string
          id: string
          link: string | null
          title: string
        }
        Insert: {
          category?: string[] | null
          created_at?: string | null
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          eligibility?: string | null
          funder: string
          id?: string
          link?: string | null
          title: string
        }
        Update: {
          category?: string[] | null
          created_at?: string | null
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          eligibility?: string | null
          funder?: string
          id?: string
          link?: string | null
          title?: string
        }
        Relationships: []
      }
      grant_documents: {
        Row: {
          created_at: string | null
          file_path: string
          file_size: number | null
          file_type: string | null
          grant_id: string
          id: string
          name: string
          uploaded_by: string
        }
        Insert: {
          created_at?: string | null
          file_path: string
          file_size?: number | null
          file_type?: string | null
          grant_id: string
          id?: string
          name: string
          uploaded_by: string
        }
        Update: {
          created_at?: string | null
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          grant_id?: string
          id?: string
          name?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "grant_documents_grant_id_fkey"
            columns: ["grant_id"]
            isOneToOne: false
            referencedRelation: "grants"
            referencedColumns: ["id"]
          },
        ]
      }
      grant_reviews: {
        Row: {
          comments: string | null
          created_at: string | null
          grant_id: string
          id: string
          rating: number | null
          recommendation: string | null
          reviewer_id: string
          updated_at: string | null
        }
        Insert: {
          comments?: string | null
          created_at?: string | null
          grant_id: string
          id?: string
          rating?: number | null
          recommendation?: string | null
          reviewer_id: string
          updated_at?: string | null
        }
        Update: {
          comments?: string | null
          created_at?: string | null
          grant_id?: string
          id?: string
          rating?: number | null
          recommendation?: string | null
          reviewer_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grant_reviews_grant_id_fkey"
            columns: ["grant_id"]
            isOneToOne: false
            referencedRelation: "grants"
            referencedColumns: ["id"]
          },
        ]
      }
      grants: {
        Row: {
          agreement_uploaded: boolean | null
          category: string | null
          collaborators: string[] | null
          created_at: string | null
          department: string | null
          description: string | null
          duration: number | null
          end_date: string | null
          funder: string | null
          funding_amount: number
          has_closeout_report: boolean | null
          has_mid_term_report: boolean | null
          id: string
          start_date: string | null
          status: string
          student_involvement: number | null
          submitter_id: string
          summary: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          agreement_uploaded?: boolean | null
          category?: string | null
          collaborators?: string[] | null
          created_at?: string | null
          department?: string | null
          description?: string | null
          duration?: number | null
          end_date?: string | null
          funder?: string | null
          funding_amount?: number
          has_closeout_report?: boolean | null
          has_mid_term_report?: boolean | null
          id?: string
          start_date?: string | null
          status?: string
          student_involvement?: number | null
          submitter_id: string
          summary?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          agreement_uploaded?: boolean | null
          category?: string | null
          collaborators?: string[] | null
          created_at?: string | null
          department?: string | null
          description?: string | null
          duration?: number | null
          end_date?: string | null
          funder?: string | null
          funding_amount?: number
          has_closeout_report?: boolean | null
          has_mid_term_report?: boolean | null
          id?: string
          start_date?: string | null
          status?: string
          student_involvement?: number | null
          submitter_id?: string
          summary?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      intellectual_property: {
        Row: {
          approval_date: string | null
          created_at: string | null
          description: string | null
          filing_date: string | null
          grant_id: string | null
          id: string
          reference_number: string | null
          status: string | null
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          approval_date?: string | null
          created_at?: string | null
          description?: string | null
          filing_date?: string | null
          grant_id?: string | null
          id?: string
          reference_number?: string | null
          status?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          approval_date?: string | null
          created_at?: string | null
          description?: string | null
          filing_date?: string | null
          grant_id?: string | null
          id?: string
          reference_number?: string | null
          status?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "intellectual_property_grant_id_fkey"
            columns: ["grant_id"]
            isOneToOne: false
            referencedRelation: "grants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          department: string | null
          email: string | null
          full_name: string | null
          id: string
          institution: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          institution?: string | null
          role: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          institution?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
