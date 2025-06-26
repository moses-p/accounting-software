"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "./auth-provider"
import { Building2, AlertCircle, Shield, Mail, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const { signIn, signUp, isConfigured } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [tab, setTab] = useState("signin")
  const router = useRouter()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <Building2 className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">AccounTech Pro</h1>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Supabase Configuration Required</AlertTitle>
            <AlertDescription className="mt-2 space-y-2">
              <p>To use AccounTech Pro, you need to configure Supabase:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>
                  Create a project at{" "}
                  <a
                    href="https://supabase.com"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    supabase.com
                  </a>
                </li>
                <li>Copy your project URL and anon key</li>
                <li>
                  Create a <code className="bg-gray-100 px-1 rounded">.env.local</code> file with:
                </li>
              </ol>
              <pre className="bg-gray-100 p-2 rounded text-xs mt-2">
                {`NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`}
              </pre>
              <p className="text-sm">Then restart the development server.</p>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      await signIn(email, password)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const fullName = formData.get("fullName") as string
    const companyName = formData.get("companyName") as string

    try {
      const result = await signUp(email, password, fullName, companyName)
      if (result && result.data && result.data.user && result.data.user.confirmed_at === null) {
        setSuccess("Account created! Please check your email to confirm your account.")
        setTab("signup")
      } else {
        setSuccess("Account created! You can now log in.")
        setTab("signup")
        timeoutRef.current = setTimeout(() => {
          setSuccess(null)
          router.push("/login")
        }, 3000)
      }
    } catch (err: any) {
      setError(err.message)
      setSuccess(null)
      setTab("signup")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center justify-center">
          <Building2 className="h-12 w-12 mr-3 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">AccounTech Pro</h1>
            <p className="text-sm text-muted-foreground">Professional Accounting Software</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <Tabs defaultValue={tab} value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <Card className="w-full max-w-lg">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
                  <CardDescription>Enter your email and password to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                  {error && tab === "signin" && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Tabs defaultValue="signin" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="signin">Sign In</TabsTrigger>
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signin">
                      <form onSubmit={handleSignIn} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="email"
                              name="email"
                              placeholder="name@example.com"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="pl-8"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Button
                              variant="link"
                              className="px-0 font-normal"
                              onClick={() => router.push("/reset-password")}
                              type="button"
                            >
                              Forgot password?
                            </Button>
                          </div>
                          <div className="relative">
                            <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="pl-8"
                              required
                            />
                          </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                          {loading ? "Signing in..." : "Sign In"}
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="signup">
                      {success && (
                        <Alert className="mb-4 border-green-500 text-green-500">
                          <AlertDescription>{success}</AlertDescription>
                        </Alert>
                      )}
                      {error && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      <Card>
                        <CardHeader>
                          <CardTitle>Create Account</CardTitle>
                          <CardDescription>Sign up for a new account</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <form onSubmit={handleSignUp} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="signup-email">Email</Label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="signup-email"
                                  name="email"
                                  type="email"
                                  placeholder="you@company.com"
                                  className="pl-9"
                                  required
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="signup-password">Password</Label>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="signup-password"
                                  name="password"
                                  type="password"
                                  className="pl-9"
                                  required
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="fullName">Full Name</Label>
                              <Input id="fullName" name="fullName" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="companyName">Company Name</Label>
                              <Input id="companyName" name="companyName" required />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                              {loading ? "Creating account..." : "Create Account"}
                            </Button>
                          </form>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex items-center justify-center text-sm text-muted-foreground">
          <Shield className="h-4 w-4 mr-2" />
          <span>Your data is protected with enterprise-grade security</span>
        </div>
      </div>
    </div>
  )
}
