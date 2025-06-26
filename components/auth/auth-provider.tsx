"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string, companyName: string) => Promise<{ data: any; error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (password: string) => Promise<void>
  isConfigured: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isConfigured, setIsConfigured] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if Supabase is properly configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseAnonKey) {
      setIsConfigured(true)

      // Get initial session
      supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
        setUser(session?.user ?? null)
        setLoading(false)
      })

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null)
        setLoading(false)

        // Handle auth state changes
        switch (event) {
          case "SIGNED_IN":
            router.push("/") // Redirect to dashboard on sign in
            break
          case "SIGNED_OUT":
            router.push("/login") // Redirect to login on sign out
            break
          case "PASSWORD_RECOVERY":
            router.push("/reset-password") // Redirect to password reset page
            break
        }
      })

      return () => subscription.unsubscribe()
    } else {
      setIsConfigured(false)
      setLoading(false)
    }
  }, [router])

  const signIn = async (email: string, password: string) => {
    if (!isConfigured) {
      throw new Error("Supabase is not configured. Please add your environment variables.")
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }

  const signUp = async (email: string, password: string, fullName: string, companyName: string) => {
    if (!isConfigured) {
      throw new Error("Supabase is not configured. Please add your environment variables.")
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          company_name: companyName,
        },
      },
    })

    if (error) throw error

    if (data.user) {
      // Create profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        full_name: fullName,
        company_name: companyName,
      })

      if (profileError) throw profileError
    }

    return { data, error }
  }

  const signOut = async () => {
    if (!isConfigured) {
      throw new Error("Supabase is not configured. Please add your environment variables.")
    }

    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const resetPassword = async (email: string) => {
    if (!isConfigured) {
      throw new Error("Supabase is not configured. Please add your environment variables.")
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) throw error
  }

  const updatePassword = async (password: string) => {
    if (!isConfigured) {
      throw new Error("Supabase is not configured. Please add your environment variables.")
    }

    const { error } = await supabase.auth.updateUser({
      password,
    })
    if (error) throw error
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOut, resetPassword, updatePassword, isConfigured }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
