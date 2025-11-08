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
      billing_transactions: {
        Row: {
          amount_credits: number
          amount_usd: number | null
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          status: string
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount_credits: number
          amount_usd?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          transaction_type: string
          user_id: string
        }
        Update: {
          amount_credits?: number
          amount_usd?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      compliance_records: {
        Row: {
          certified_at: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          metadata: Json | null
          report_url: string | null
          standard: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          certified_at?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          report_url?: string | null
          standard: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          certified_at?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          report_url?: string | null
          standard?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      genome_analyses: {
        Row: {
          analysis_data: Json
          created_at: string | null
          efficiency_score: number | null
          id: string
          performance_metrics: Json | null
          repository_id: string | null
          security_issues: Json | null
        }
        Insert: {
          analysis_data: Json
          created_at?: string | null
          efficiency_score?: number | null
          id?: string
          performance_metrics?: Json | null
          repository_id?: string | null
          security_issues?: Json | null
        }
        Update: {
          analysis_data?: Json
          created_at?: string | null
          efficiency_score?: number | null
          id?: string
          performance_metrics?: Json | null
          repository_id?: string | null
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
      genome_dependencies: {
        Row: {
          created_at: string | null
          dependency_type: string
          from_module_id: string
          genome_id: string
          id: string
          metadata: Json | null
          to_module_id: string
        }
        Insert: {
          created_at?: string | null
          dependency_type?: string
          from_module_id: string
          genome_id: string
          id?: string
          metadata?: Json | null
          to_module_id: string
        }
        Update: {
          created_at?: string | null
          dependency_type?: string
          from_module_id?: string
          genome_id?: string
          id?: string
          metadata?: Json | null
          to_module_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "genome_dependencies_from_module_id_fkey"
            columns: ["from_module_id"]
            isOneToOne: false
            referencedRelation: "genome_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "genome_dependencies_genome_id_fkey"
            columns: ["genome_id"]
            isOneToOne: false
            referencedRelation: "genomes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "genome_dependencies_to_module_id_fkey"
            columns: ["to_module_id"]
            isOneToOne: false
            referencedRelation: "genome_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      genome_functions: {
        Row: {
          created_at: string | null
          cyclomatic_complexity: number | null
          end_line: number
          fingerprint: string
          id: string
          metadata: Json | null
          module_id: string
          name: string
          parameters: Json | null
          security_warnings: Json | null
          start_line: number
        }
        Insert: {
          created_at?: string | null
          cyclomatic_complexity?: number | null
          end_line: number
          fingerprint: string
          id?: string
          metadata?: Json | null
          module_id: string
          name: string
          parameters?: Json | null
          security_warnings?: Json | null
          start_line: number
        }
        Update: {
          created_at?: string | null
          cyclomatic_complexity?: number | null
          end_line?: number
          fingerprint?: string
          id?: string
          metadata?: Json | null
          module_id?: string
          name?: string
          parameters?: Json | null
          security_warnings?: Json | null
          start_line?: number
        }
        Relationships: [
          {
            foreignKeyName: "genome_functions_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "genome_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      genome_health: {
        Row: {
          created_at: string | null
          genome_id: string
          id: string
          maintainability_score: number | null
          performance_score: number | null
          security_risk: string | null
          technical_debt_score: number | null
          test_coverage: number | null
          unused_files: number | null
        }
        Insert: {
          created_at?: string | null
          genome_id: string
          id?: string
          maintainability_score?: number | null
          performance_score?: number | null
          security_risk?: string | null
          technical_debt_score?: number | null
          test_coverage?: number | null
          unused_files?: number | null
        }
        Update: {
          created_at?: string | null
          genome_id?: string
          id?: string
          maintainability_score?: number | null
          performance_score?: number | null
          security_risk?: string | null
          technical_debt_score?: number | null
          test_coverage?: number | null
          unused_files?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "genome_health_genome_id_fkey"
            columns: ["genome_id"]
            isOneToOne: false
            referencedRelation: "genomes"
            referencedColumns: ["id"]
          },
        ]
      }
      genome_industry_baseline: {
        Row: {
          baseline_metrics: Json | null
          category: string
          created_at: string | null
          genome_id: string
          id: string
          similarity_score: number | null
        }
        Insert: {
          baseline_metrics?: Json | null
          category: string
          created_at?: string | null
          genome_id: string
          id?: string
          similarity_score?: number | null
        }
        Update: {
          baseline_metrics?: Json | null
          category?: string
          created_at?: string | null
          genome_id?: string
          id?: string
          similarity_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "genome_industry_baseline_genome_id_fkey"
            columns: ["genome_id"]
            isOneToOne: false
            referencedRelation: "genomes"
            referencedColumns: ["id"]
          },
        ]
      }
      genome_modules: {
        Row: {
          created_at: string | null
          fingerprint: string
          genome_id: string
          id: string
          language: string
          loc: number
          metadata: Json | null
          path: string
        }
        Insert: {
          created_at?: string | null
          fingerprint: string
          genome_id: string
          id?: string
          language: string
          loc?: number
          metadata?: Json | null
          path: string
        }
        Update: {
          created_at?: string | null
          fingerprint?: string
          genome_id?: string
          id?: string
          language?: string
          loc?: number
          metadata?: Json | null
          path?: string
        }
        Relationships: [
          {
            foreignKeyName: "genome_modules_genome_id_fkey"
            columns: ["genome_id"]
            isOneToOne: false
            referencedRelation: "genomes"
            referencedColumns: ["id"]
          },
        ]
      }
      genome_packages: {
        Row: {
          created_at: string | null
          genome_id: string
          id: string
          is_dev_dependency: boolean | null
          metadata: Json | null
          name: string
          version: string
          vulnerabilities: Json | null
          vulnerability_count: number | null
        }
        Insert: {
          created_at?: string | null
          genome_id: string
          id?: string
          is_dev_dependency?: boolean | null
          metadata?: Json | null
          name: string
          version: string
          vulnerabilities?: Json | null
          vulnerability_count?: number | null
        }
        Update: {
          created_at?: string | null
          genome_id?: string
          id?: string
          is_dev_dependency?: boolean | null
          metadata?: Json | null
          name?: string
          version?: string
          vulnerabilities?: Json | null
          vulnerability_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "genome_packages_genome_id_fkey"
            columns: ["genome_id"]
            isOneToOne: false
            referencedRelation: "genomes"
            referencedColumns: ["id"]
          },
        ]
      }
      genome_scan_history: {
        Row: {
          branch: string
          created_at: string | null
          genome_id: string | null
          id: string
          repository_id: string
          scan_type: string
          triggered_by: string | null
        }
        Insert: {
          branch: string
          created_at?: string | null
          genome_id?: string | null
          id?: string
          repository_id: string
          scan_type?: string
          triggered_by?: string | null
        }
        Update: {
          branch?: string
          created_at?: string | null
          genome_id?: string | null
          id?: string
          repository_id?: string
          scan_type?: string
          triggered_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "genome_scan_history_genome_id_fkey"
            columns: ["genome_id"]
            isOneToOne: false
            referencedRelation: "genomes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "genome_scan_history_repository_id_fkey"
            columns: ["repository_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
        ]
      }
      genome_suggestions: {
        Row: {
          analysis_id: string | null
          confidence: number
          created_at: string | null
          description: string
          id: string
          priority: string
          repository_id: string | null
          status: string
          suggestion_type: string
          template_patch: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          analysis_id?: string | null
          confidence: number
          created_at?: string | null
          description: string
          id?: string
          priority: string
          repository_id?: string | null
          status?: string
          suggestion_type: string
          template_patch?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          analysis_id?: string | null
          confidence?: number
          created_at?: string | null
          description?: string
          id?: string
          priority?: string
          repository_id?: string | null
          status?: string
          suggestion_type?: string
          template_patch?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "genome_suggestions_analysis_id_fkey"
            columns: ["analysis_id"]
            isOneToOne: false
            referencedRelation: "genome_analyses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "genome_suggestions_repository_id_fkey"
            columns: ["repository_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
        ]
      }
      genomes: {
        Row: {
          branch: string
          created_at: string | null
          efficiency_score: number | null
          fingerprint: string
          id: string
          metadata: Json | null
          repository_id: string
          scan_duration_ms: number | null
          scan_status: string
          updated_at: string | null
        }
        Insert: {
          branch?: string
          created_at?: string | null
          efficiency_score?: number | null
          fingerprint: string
          id?: string
          metadata?: Json | null
          repository_id: string
          scan_duration_ms?: number | null
          scan_status?: string
          updated_at?: string | null
        }
        Update: {
          branch?: string
          created_at?: string | null
          efficiency_score?: number | null
          fingerprint?: string
          id?: string
          metadata?: Json | null
          repository_id?: string
          scan_duration_ms?: number | null
          scan_status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "genomes_repository_id_fkey"
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
          default_branch: string | null
          genome_fingerprint: Json | null
          health_score: number | null
          id: string
          last_analyzed_at: string | null
          name: string
          provider: string
          updated_at: string | null
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          default_branch?: string | null
          genome_fingerprint?: Json | null
          health_score?: number | null
          id?: string
          last_analyzed_at?: string | null
          name: string
          provider: string
          updated_at?: string | null
          url: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          default_branch?: string | null
          genome_fingerprint?: Json | null
          health_score?: number | null
          id?: string
          last_analyzed_at?: string | null
          name?: string
          provider?: string
          updated_at?: string | null
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      security_audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: string | null
          id: string
          metadata: Json | null
          repository_id: string | null
          resource_id: string | null
          resource_type: string
          trust_level: number | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: string | null
          id?: string
          metadata?: Json | null
          repository_id?: string | null
          resource_id?: string | null
          resource_type: string
          trust_level?: number | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: string | null
          id?: string
          metadata?: Json | null
          repository_id?: string | null
          resource_id?: string | null
          resource_type?: string
          trust_level?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "security_audit_logs_repository_id_fkey"
            columns: ["repository_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
        ]
      }
      security_policies: {
        Row: {
          config: Json | null
          created_at: string | null
          enabled: boolean | null
          id: string
          policy_name: string
          policy_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          policy_name: string
          policy_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          policy_name?: string
          policy_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      usage_tracking: {
        Row: {
          created_at: string | null
          credits_consumed: number
          id: string
          metadata: Json | null
          resource_id: string | null
          resource_type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          credits_consumed?: number
          id?: string
          metadata?: Json | null
          resource_id?: string | null
          resource_type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          credits_consumed?: number
          id?: string
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string
          user_id?: string
        }
        Relationships: []
      }
      user_credits: {
        Row: {
          balance: number
          created_at: string | null
          id: string
          total_earned: number
          total_spent: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string | null
          id?: string
          total_earned?: number
          total_spent?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string | null
          id?: string
          total_earned?: number
          total_spent?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          auto_renew: boolean | null
          created_at: string | null
          expires_at: string | null
          id: string
          started_at: string | null
          status: string
          tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_renew?: boolean | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          started_at?: string | null
          status?: string
          tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_renew?: boolean | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          started_at?: string | null
          status?: string
          tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_trust_scores: {
        Row: {
          created_at: string | null
          global_rank: number | null
          id: string
          mutation_reversibility: number | null
          patch_success_rate: number | null
          review_confidence: number | null
          score: number
          security_compliance: number | null
          successful_mutations: number | null
          tier: string
          total_mutations: number | null
          updated_at: string | null
          user_id: string
          verified_safe_mutations: number | null
        }
        Insert: {
          created_at?: string | null
          global_rank?: number | null
          id?: string
          mutation_reversibility?: number | null
          patch_success_rate?: number | null
          review_confidence?: number | null
          score?: number
          security_compliance?: number | null
          successful_mutations?: number | null
          tier?: string
          total_mutations?: number | null
          updated_at?: string | null
          user_id: string
          verified_safe_mutations?: number | null
        }
        Update: {
          created_at?: string | null
          global_rank?: number | null
          id?: string
          mutation_reversibility?: number | null
          patch_success_rate?: number | null
          review_confidence?: number | null
          score?: number
          security_compliance?: number | null
          successful_mutations?: number | null
          tier?: string
          total_mutations?: number | null
          updated_at?: string | null
          user_id?: string
          verified_safe_mutations?: number | null
        }
        Relationships: []
      }
      vulnerability_scans: {
        Row: {
          completed_at: string | null
          created_at: string | null
          critical_count: number | null
          details: Json | null
          high_count: number | null
          id: string
          low_count: number | null
          medium_count: number | null
          repository_id: string
          scan_type: string
          status: string
          vulnerabilities_found: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          critical_count?: number | null
          details?: Json | null
          high_count?: number | null
          id?: string
          low_count?: number | null
          medium_count?: number | null
          repository_id: string
          scan_type?: string
          status?: string
          vulnerabilities_found?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          critical_count?: number | null
          details?: Json | null
          high_count?: number | null
          id?: string
          low_count?: number | null
          medium_count?: number | null
          repository_id?: string
          scan_type?: string
          status?: string
          vulnerabilities_found?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vulnerability_scans_repository_id_fkey"
            columns: ["repository_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subscription_tier: "free" | "starter" | "pro" | "enterprise"
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
    Enums: {
      subscription_tier: ["free", "starter", "pro", "enterprise"],
    },
  },
} as const
