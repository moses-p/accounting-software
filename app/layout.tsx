import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { AuthProvider } from "@/components/auth/auth-provider"
import { RootGuard } from "@/components/auth/root-guard"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AccounTech Pro - Modern Accounting Software",
  description: "Professional accounting software for modern businesses",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <RootGuard>
              <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <Header />
                  <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
                    {children}
                  </main>
                </div>
              </div>
            </RootGuard>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
