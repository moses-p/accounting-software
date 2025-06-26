"use client"

import { createClient } from "@supabase/supabase-js"
import type { Database } from "./supabase"

// Get environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Validate environment variables
if (!supabaseUrl) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
}

if (!supabaseAnonKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
}

// Create a mock client for development if env vars are missing
const createMockClient = () => ({
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
    signUp: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
    signOut: () => Promise.resolve({ error: new Error("Supabase not configured") }),
  },
  from: () => ({
    select: () => ({ eq: () => ({ order: () => Promise.resolve({ data: [], error: null }) }) }),
    insert: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
    update: () => ({ eq: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }) }),
    delete: () => ({ eq: () => Promise.resolve({ error: new Error("Supabase not configured") }) }),
  }),
})

// Singleton pattern for client-side Supabase client
let supabaseClient: any = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    if (supabaseUrl && supabaseAnonKey) {
      supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey)
    } else {
      console.warn("Supabase environment variables not found. Using mock client for development.")
      supabaseClient = createMockClient()
    }
  }
  return supabaseClient
}

export const supabase = getSupabaseClient()
