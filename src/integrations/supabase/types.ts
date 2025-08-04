export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          content: string
          created_at: string
          created_by: string | null
          expiry_date: string | null
          id: string
          is_active: boolean
          poster_image_url: string | null
          title: string
          updated_at: string
          youtube_video_url: string | null
        }
        Insert: {
          content: string
          created_at?: string
          created_by?: string | null
          expiry_date?: string | null
          id?: string
          is_active?: boolean
          poster_image_url?: string | null
          title: string
          updated_at?: string
          youtube_video_url?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string | null
          expiry_date?: string | null
          id?: string
          is_active?: boolean
          poster_image_url?: string | null
          title?: string
          updated_at?: string
          youtube_video_url?: string | null
        }
        Relationships: []
      }
      cash_transactions: {
        Row: {
          amount: number
          created_at: string
          created_by: string | null
          description: string | null
          from_date: string | null
          id: string
          remarks: string | null
          to_date: string | null
          transaction_date: string
          transaction_type: string
        }
        Insert: {
          amount: number
          created_at?: string
          created_by?: string | null
          description?: string | null
          from_date?: string | null
          id?: string
          remarks?: string | null
          to_date?: string | null
          transaction_date?: string
          transaction_type: string
        }
        Update: {
          amount?: number
          created_at?: string
          created_by?: string | null
          description?: string | null
          from_date?: string | null
          id?: string
          remarks?: string | null
          to_date?: string | null
          transaction_date?: string
          transaction_type?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          actual_fee: number
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          is_highlighted: boolean | null
          name: string
          offer_fee: number
          popup_image_url: string | null
          preference: string | null
          qr_image_url: string | null
          updated_at: string
          warning_message: string | null
        }
        Insert: {
          actual_fee?: number
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_highlighted?: boolean | null
          name: string
          offer_fee?: number
          popup_image_url?: string | null
          preference?: string | null
          qr_image_url?: string | null
          updated_at?: string
          warning_message?: string | null
        }
        Update: {
          actual_fee?: number
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_highlighted?: boolean | null
          name?: string
          offer_fee?: number
          popup_image_url?: string | null
          preference?: string | null
          qr_image_url?: string | null
          updated_at?: string
          warning_message?: string | null
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          created_at: string
          created_by: string | null
          description: string
          expense_date: string
          id: string
          payment_method: string
        }
        Insert: {
          amount: number
          created_at?: string
          created_by?: string | null
          description: string
          expense_date?: string
          id?: string
          payment_method: string
        }
        Update: {
          amount?: number
          created_at?: string
          created_by?: string | null
          description?: string
          expense_date?: string
          id?: string
          payment_method?: string
        }
        Relationships: []
      }
      management_permissions: {
        Row: {
          can_delete: boolean
          can_manage_managers: boolean
          can_read: boolean
          can_write: boolean
          created_at: string
          id: string
          manager_id: string | null
          module: string
          permission_type: string
          updated_at: string
        }
        Insert: {
          can_delete?: boolean
          can_manage_managers?: boolean
          can_read?: boolean
          can_write?: boolean
          created_at?: string
          id?: string
          manager_id?: string | null
          module: string
          permission_type: string
          updated_at?: string
        }
        Update: {
          can_delete?: boolean
          can_manage_managers?: boolean
          can_read?: boolean
          can_write?: boolean
          created_at?: string
          id?: string
          manager_id?: string | null
          module?: string
          permission_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "management_permissions_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "management_users"
            referencedColumns: ["id"]
          },
        ]
      }
      management_users: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          last_login: string | null
          password_hash: string
          role: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          password_hash: string
          role: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          password_hash?: string
          role?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      panchayaths: {
        Row: {
          created_at: string
          district: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          district: string
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          district?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      registration_verifications: {
        Row: {
          created_at: string
          id: string
          registration_id: string | null
          verification_notes: string | null
          verified_at: string
          verified_by: string
        }
        Insert: {
          created_at?: string
          id?: string
          registration_id?: string | null
          verification_notes?: string | null
          verified_at?: string
          verified_by: string
        }
        Update: {
          created_at?: string
          id?: string
          registration_id?: string | null
          verification_notes?: string | null
          verified_at?: string
          verified_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "registration_verifications_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      registrations: {
        Row: {
          address: string
          agent_pro: string | null
          approval_notes: string | null
          approved_by: string | null
          approved_date: string | null
          category_id: string | null
          created_at: string
          customer_id: string
          fee_paid: number | null
          id: string
          mobile_number: string
          name: string
          panchayath_id: string | null
          preference: string | null
          status: string
          updated_at: string
          ward: string
        }
        Insert: {
          address: string
          agent_pro?: string | null
          approval_notes?: string | null
          approved_by?: string | null
          approved_date?: string | null
          category_id?: string | null
          created_at?: string
          customer_id: string
          fee_paid?: number | null
          id?: string
          mobile_number: string
          name: string
          panchayath_id?: string | null
          preference?: string | null
          status?: string
          updated_at?: string
          ward: string
        }
        Update: {
          address?: string
          agent_pro?: string | null
          approval_notes?: string | null
          approved_by?: string | null
          approved_date?: string | null
          category_id?: string | null
          created_at?: string
          customer_id?: string
          fee_paid?: number | null
          id?: string
          mobile_number?: string
          name?: string
          panchayath_id?: string | null
          preference?: string | null
          status?: string
          updated_at?: string
          ward?: string
        }
        Relationships: [
          {
            foreignKeyName: "registrations_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_panchayath_id_fkey"
            columns: ["panchayath_id"]
            isOneToOne: false
            referencedRelation: "panchayaths"
            referencedColumns: ["id"]
          },
        ]
      }
      utilities: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      approve_registration: {
        Args: {
          registration_id: string
          approver_username: string
          notes?: string
        }
        Returns: undefined
      }
      reject_registration: {
        Args: {
          registration_id: string
          rejector_username: string
          notes?: string
        }
        Returns: undefined
      }
      reset_registration_approval: {
        Args: { registration_id: string }
        Returns: undefined
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
