export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      campaigns: {
        Row: {
          completed_at: string | null
          compute_budget: number | null
          created_at: string | null
          goal_weights: Json | null
          id: string
          max_variants: number | null
          mode: string | null
          name: string
          progress: number | null
          repository_id: string
          scope: string | null
          started_at: string | null
          status: string | null
          target_module: string | null
          test_suite: string | null
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          compute_budget?: number | null
          created_at?: string | null
          goal_weights?: Json | null
          id?: string
          max_variants?: number | null
          mode?: string | null
          name: string
          progress?: number | null
          repository_id: string
          scope?: string | null
          started_at?: string | null
          status?: string | null
          target_module?: string | null
          test_suite?: string | null
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          compute_budget?: number | null
          created_at?: string | null
          goal_weights?: Json | null
          id?: string
          max_variants?: number | null
          mode?: string | null
          name?: string
          progress?: number | null
          repository_id?: string
          scope?: string | null
          started_at?: string | null
          status?: string | null
          target_module?: string | null
          test_suite?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_repository_id_fkey"
            columns: ["repository_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
        ]
      }
      genome_analyses: {
        Row: {
          complexity_score: number | null
          created_at: string | null
          efficiency_score: number | null
          genome_data: Json | null
          id: string
          performance_metrics: Json | null
          repository_id: string
          security_issues: Json | null
        }
        Insert: {
          complexity_score?: number | null
          created_at?: string | null
          efficiency_score?: number | null
          genome_data?: Json | null
          id?: string
          performance_metrics?: Json | null
          repository_id: string
          security_issues?: Json | null
        }
        Update: {
          complexity_score?: number | null
          created_at?: string | null
          efficiency_score?: number | null
          genome_data?: Json | null
          id?: string
          performance_metrics?: Json | null
          repository_id?: string
          security_issues?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "genome_analyses_repository_id_fkey"
            columns: ["repository_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
        ]
      }
      genome_suggestions: {
        Row: {
          created_at: string | null
          description: string
          id: string
          metadata: Json | null
          priority: string | null
          repository_id: string | null
          status: string | null
          suggestion_type: string
          title: string
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          metadata?: Json | null
          priority?: string | null
          repository_id?: string | null
          status?: string | null
          suggestion_type: string
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          metadata?: Json | null
          priority?: string | null
          repository_id?: string | null
          status?: string | null
          suggestion_type?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "genome_suggestions_repository_id_fkey"
            columns: ["repository_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          code_after: string | null
          code_before: string | null
          code_snippet: string
          concepts: string[]
          created_at: string | null
          difficulty_level: string
          duration_minutes: number
          id: string
          is_public: boolean | null
          key_takeaways: string[] | null
          language: string
          learning_objectives: string[] | null
          mutation_id: string | null
          next_topics: string[] | null
          quiz_data: Json
          summary: string
          title: string
          updated_at: string | null
          user_id: string | null
          xp_points: number
          youtube_videos: Json | null
        }
        Insert: {
          code_after?: string | null
          code_before?: string | null
          code_snippet: string
          concepts?: string[]
          created_at?: string | null
          difficulty_level: string
          duration_minutes?: number
          id?: string
          is_public?: boolean | null
          key_takeaways?: string[] | null
          language: string
          learning_objectives?: string[] | null
          mutation_id?: string | null
          next_topics?: string[] | null
          quiz_data?: Json
          summary: string
          title: string
          updated_at?: string | null
          user_id?: string | null
          xp_points?: number
          youtube_videos?: Json | null
        }
        Update: {
          code_after?: string | null
          code_before?: string | null
          code_snippet?: string
          concepts?: string[]
          created_at?: string | null
          difficulty_level?: string
          duration_minutes?: number
          id?: string
          is_public?: boolean | null
          key_takeaways?: string[] | null
          language?: string
          learning_objectives?: string[] | null
          mutation_id?: string | null
          next_topics?: string[] | null
          quiz_data?: Json
          summary?: string
          title?: string
          updated_at?: string | null
          user_id?: string | null
          xp_points?: number
          youtube_videos?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_mutation_id_fkey"
            columns: ["mutation_id"]
            isOneToOne: false
            referencedRelation: "mutations"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_items: {
        Row: {
          benchmark_data: Json | null
          cost_reduction: number | null
          created_at: string
          description: string
          downloads: number | null
          id: string
          mutation_id: string | null
          mutation_type: string
          performance_gain: number | null
          price_credits: number
          published_at: string | null
          rating: number | null
          seller_id: string
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          benchmark_data?: Json | null
          cost_reduction?: number | null
          created_at?: string
          description: string
          downloads?: number | null
          id?: string
          mutation_id?: string | null
          mutation_type: string
          performance_gain?: number | null
          price_credits: number
          published_at?: string | null
          rating?: number | null
          seller_id: string
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          benchmark_data?: Json | null
          cost_reduction?: number | null
          created_at?: string
          description?: string
          downloads?: number | null
          id?: string
          mutation_id?: string | null
          mutation_type?: string
          performance_gain?: number | null
          price_credits?: number
          published_at?: string | null
          rating?: number | null
          seller_id?: string
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_items_mutation_id_fkey"
            columns: ["mutation_id"]
            isOneToOne: false
            referencedRelation: "mutations"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_transactions: {
        Row: {
          buyer_id: string
          created_at: string
          id: string
          item_id: string
          price_credits: number
          seller_id: string
          transaction_type: string
        }
        Insert: {
          buyer_id: string
          created_at?: string
          id?: string
          item_id: string
          price_credits: number
          seller_id: string
          transaction_type: string
        }
        Update: {
          buyer_id?: string
          created_at?: string
          id?: string
          item_id?: string
          price_credits?: number
          seller_id?: string
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_transactions_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "marketplace_items"
            referencedColumns: ["id"]
          },
        ]
      }
      mutation_history: {
        Row: {
          action: string
          actor: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          mutation_id: string
        }
        Insert: {
          action: string
          actor?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          mutation_id: string
        }
        Update: {
          action?: string
          actor?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          mutation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mutation_history_mutation_id_fkey"
            columns: ["mutation_id"]
            isOneToOne: false
            referencedRelation: "mutations"
            referencedColumns: ["id"]
          },
        ]
      }
      mutation_lineage: {
        Row: {
          child_id: string
          created_at: string | null
          crossover_type: string | null
          id: string
          parent_id: string
        }
        Insert: {
          child_id: string
          created_at?: string | null
          crossover_type?: string | null
          id?: string
          parent_id: string
        }
        Update: {
          child_id?: string
          created_at?: string | null
          crossover_type?: string | null
          id?: string
          parent_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mutation_lineage_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "mutations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mutation_lineage_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "mutations"
            referencedColumns: ["id"]
          },
        ]
      }
      mutation_tests: {
        Row: {
          cost_per_request: number | null
          cpu_usage: number | null
          created_at: string | null
          id: string
          latency_ms: number | null
          memory_usage: number | null
          mutation_id: string
          pass_rate: number | null
          test_results: Json | null
        }
        Insert: {
          cost_per_request?: number | null
          cpu_usage?: number | null
          created_at?: string | null
          id?: string
          latency_ms?: number | null
          memory_usage?: number | null
          mutation_id: string
          pass_rate?: number | null
          test_results?: Json | null
        }
        Update: {
          cost_per_request?: number | null
          cpu_usage?: number | null
          created_at?: string | null
          id?: string
          latency_ms?: number | null
          memory_usage?: number | null
          mutation_id?: string
          pass_rate?: number | null
          test_results?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "mutation_tests_mutation_id_fkey"
            columns: ["mutation_id"]
            isOneToOne: false
            referencedRelation: "mutations"
            referencedColumns: ["id"]
          },
        ]
      }
      mutations: {
        Row: {
          applied_at: string | null
          applied_by: string | null
          campaign_id: string | null
          composite_score: number | null
          confidence_score: number | null
          created_at: string | null
          description: string | null
          diff: string | null
          explain: string | null
          id: string
          improvement_metrics: Json | null
          metrics_after: Json | null
          metrics_before: Json | null
          mutated_code: string | null
          mutation_type: string
          original_code: string | null
          parent_mutations: string[] | null
          repository_id: string
          safety_score: number | null
          status: string | null
        }
        Insert: {
          applied_at?: string | null
          applied_by?: string | null
          campaign_id?: string | null
          composite_score?: number | null
          confidence_score?: number | null
          created_at?: string | null
          description?: string | null
          diff?: string | null
          explain?: string | null
          id?: string
          improvement_metrics?: Json | null
          metrics_after?: Json | null
          metrics_before?: Json | null
          mutated_code?: string | null
          mutation_type: string
          original_code?: string | null
          parent_mutations?: string[] | null
          repository_id: string
          safety_score?: number | null
          status?: string | null
        }
        Update: {
          applied_at?: string | null
          applied_by?: string | null
          campaign_id?: string | null
          composite_score?: number | null
          confidence_score?: number | null
          created_at?: string | null
          description?: string | null
          diff?: string | null
          explain?: string | null
          id?: string
          improvement_metrics?: Json | null
          metrics_after?: Json | null
          metrics_before?: Json | null
          mutated_code?: string | null
          mutation_type?: string
          original_code?: string | null
          parent_mutations?: string[] | null
          repository_id?: string
          safety_score?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mutations_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mutations_repository_id_fkey"
            columns: ["repository_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
        ]
      }
      repositories: {
        Row: {
          created_at: string | null
          description: string | null
          framework: string | null
          github_url: string | null
          id: string
          language: string | null
          name: string
          size_kb: number | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          framework?: string | null
          github_url?: string | null
          id?: string
          language?: string | null
          name: string
          size_kb?: number | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          framework?: string | null
          github_url?: string | null
          id?: string
          language?: string | null
          name?: string
          size_kb?: number | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      user_credits: {
        Row: {
          balance: number
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
