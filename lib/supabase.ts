import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          company_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          company_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          company_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string | null
          phone: string | null
          address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email?: string | null
          phone?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string | null
          phone?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          user_id: string
          customer_id: string
          invoice_number: string
          amount: number
          status: "draft" | "pending" | "paid" | "overdue"
          description: string | null
          due_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          customer_id: string
          invoice_number: string
          amount: number
          status?: "draft" | "pending" | "paid" | "overdue"
          description?: string | null
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          customer_id?: string
          invoice_number?: string
          amount?: number
          status?: "draft" | "pending" | "paid" | "overdue"
          description?: string | null
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      expenses: {
        Row: {
          id: string
          user_id: string
          description: string
          amount: number
          category: string
          status: "pending" | "approved" | "rejected"
          expense_date: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          description: string
          amount: number
          category: string
          status?: "pending" | "approved" | "rejected"
          expense_date: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          description?: string
          amount?: number
          category?: string
          status?: "pending" | "approved" | "rejected"
          expense_date?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      employees: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          position: string
          salary: number
          pay_period: "weekly" | "biweekly" | "monthly"
          status: "active" | "inactive"
          hire_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          position: string
          salary: number
          pay_period?: "weekly" | "biweekly" | "monthly"
          status?: "active" | "inactive"
          hire_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          position?: string
          salary?: number
          pay_period?: "weekly" | "biweekly" | "monthly"
          status?: "active" | "inactive"
          hire_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
