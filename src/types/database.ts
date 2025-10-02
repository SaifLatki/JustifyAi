export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          subscription_plan: 'free' | 'pro' | 'business';
          monthly_uploads: number;
          stripe_customer_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          subscription_plan?: 'free' | 'pro' | 'business';
          monthly_uploads?: number;
          stripe_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          subscription_plan?: 'free' | 'pro' | 'business';
          monthly_uploads?: number;
          stripe_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      documents: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          file_path: string;
          file_type: string;
          file_size: number;
          version: number;
          parent_document_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          file_path: string;
          file_type: string;
          file_size: number;
          version?: number;
          parent_document_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          file_path?: string;
          file_type?: string;
          file_size?: number;
          version?: number;
          parent_document_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      document_analyses: {
        Row: {
          id: string;
          document_id: string;
          client_summary: string | null;
          lawyer_summary: string | null;
          risk_score: number | null;
          risk_flags: any;
          suggested_clause: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          document_id: string;
          client_summary?: string | null;
          lawyer_summary?: string | null;
          risk_score?: number | null;
          risk_flags?: any;
          suggested_clause?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          document_id?: string;
          client_summary?: string | null;
          lawyer_summary?: string | null;
          risk_score?: number | null;
          risk_flags?: any;
          suggested_clause?: string | null;
          created_at?: string;
        };
      };
      lawyers: {
        Row: {
          id: string;
          name: string;
          specialties: string[];
          location: string | null;
          rating: number;
          contact_email: string;
          bio: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          specialties?: string[];
          location?: string | null;
          rating?: number;
          contact_email: string;
          bio?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          specialties?: string[];
          location?: string | null;
          rating?: number;
          contact_email?: string;
          bio?: string | null;
          created_at?: string;
        };
      };
      referrals: {
        Row: {
          id: string;
          user_id: string;
          lawyer_id: string;
          issue_description: string;
          status: 'pending' | 'contacted' | 'completed';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lawyer_id: string;
          issue_description: string;
          status?: 'pending' | 'contacted' | 'completed';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          lawyer_id?: string;
          issue_description?: string;
          status?: 'pending' | 'contacted' | 'completed';
          created_at?: string;
        };
      };
      usage_logs: {
        Row: {
          id: string;
          user_id: string;
          action: string;
          document_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          action: string;
          document_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          action?: string;
          document_id?: string | null;
          created_at?: string;
        };
      };
    };
  };
}

export interface RiskFlag {
  clause: string;
  reason: string;
  severity: 'low' | 'medium' | 'high';
}

export interface DocumentAnalysis {
  id: string;
  document_id: string;
  client_summary: string | null;
  lawyer_summary: string | null;
  risk_score: number | null;
  risk_flags: RiskFlag[];
  suggested_clause: string | null;
  created_at: string;
}