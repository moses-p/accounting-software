"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { supabase } from "@/lib/supabase-client"
import { useAuth } from "@/components/auth/auth-provider"

export default function DashboardPage() {
  const { user, isConfigured } = useAuth()
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    outstandingInvoices: 0,
    totalExpenses: 0,
    activeCustomers: 0,
    recentInvoices: [],
  })

  useEffect(() => {
    if (user && isConfigured) {
      loadDashboardData()
    } else if (!isConfigured) {
      // Set demo data when Supabase is not configured
      setDashboardData({
        totalRevenue: 45231.89,
        outstandingInvoices: 12234.0,
        totalExpenses: 8234.0,
        activeCustomers: 573,
        recentInvoices: [
          { id: "1", invoice_number: "INV-001", amount: 1999.0, customers: { name: "Acme Corp" } },
          { id: "2", invoice_number: "INV-002", amount: 39.0, customers: { name: "TechCorp Ltd" } },
          { id: "3", invoice_number: "INV-003", amount: 299.0, customers: { name: "Global Solutions" } },
        ],
      })
    }
  }, [user, isConfigured])

  const loadDashboardData = async () => {
    try {
      // Get invoices data
      const { data: invoices } = await supabase.from("invoices").select("*, customers(name)").eq("user_id", user!.id)

      // Get expenses data
      const { data: expenses } = await supabase.from("expenses").select("*").eq("user_id", user!.id)

      // Get customers data
      const { data: customers } = await supabase.from("customers").select("*").eq("user_id", user!.id)

      // Calculate metrics
      const totalRevenue =
        invoices?.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + inv.amount, 0) || 0
      const outstandingInvoices =
        invoices?.filter((inv) => inv.status !== "paid").reduce((sum, inv) => sum + inv.amount, 0) || 0
      const totalExpenses =
        expenses?.filter((exp) => exp.status === "approved").reduce((sum, exp) => sum + exp.amount, 0) || 0
      const activeCustomers = customers?.length || 0

      setDashboardData({
        totalRevenue,
        outstandingInvoices,
        totalExpenses,
        activeCustomers,
        recentInvoices: invoices?.slice(0, 5) || [],
      })
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        {!isConfigured && (
          <div className="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded">
            Demo Mode - Configure Supabase for full functionality
          </div>
        )}
      </div>
      <div className="space-y-4">
        <MetricCards data={dashboardData} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest invoice activity.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTransactions invoices={dashboardData.recentInvoices} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
