"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "./auth-provider"

interface RootGuardProps {
  children: React.ReactNode
}

const PUBLIC_PATHS = ["/login", "/reset-password"]

export function RootGuard({ children }: RootGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      const isPublicPath = PUBLIC_PATHS.includes(pathname)
      if (!user && !isPublicPath) {
        router.push("/login")
      }
    }
  }, [user, loading, pathname, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  const isPublicPath = PUBLIC_PATHS.includes(pathname)
  if (!user && !isPublicPath) {
    // Optionally, you could return null here while redirecting
    return null
  }

  return <>{children}</>
} 