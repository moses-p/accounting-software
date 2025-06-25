"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DollarSign,
  FileText,
  Users,
  CreditCard,
  PieChart,
  Calendar,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import Link from "next/link"
import { useInvoices, useExpenses, useEmployees } from "@/hooks/use-data"
import { formatCurrency, formatDate } from "@/lib/calculations"

export default function Dashboard() {
  const { invoices } = useInvoices()
  const { expenses } = useExpenses()
  const { employees } = useEmployees()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>Loading...</div>
  }

  // Calculate metrics
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const currentMonthInvoices = invoices.filter((inv) => {
    const invDate = new Date(inv.date)
    return invDate.getMonth() === currentMonth && invDate.getFullYear() === currentYear
  })

  const currentMonthExpenses = expenses.filter((exp) => {
    const expDate = new Date(exp.date)
    return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear
  })

  const totalRevenue = currentMonthInvoices.reduce((sum, inv) => sum + inv.total, 0)
  const totalExpenses = currentMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0)
  const outstandingInvoices = invoices.filter((inv) => inv.status === "sent" || inv.status === "overdue")
  const outstandingAmount = outstandingInvoices.reduce((sum, inv) => sum + inv.total, 0)
  const activeEmployees = employees.filter((emp) => emp.status === "active").length

  const stats = [
    {
      title: "Monthly Revenue",
      value: formatCurrency(totalRevenue),
      change: "+12.5% from last month",
      icon: DollarSign,
      color: "text-green-600",
      trend: "up",
    },
    {
      title: "Outstanding Invoices",
      value: formatCurrency(outstandingAmount),
      change: `${outstandingInvoices.length} invoices pending`,
      icon: FileText,
      color: "text-blue-600",
      trend: "neutral",
    },
    {
      title: "Monthly Expenses",
      value: formatCurrency(totalExpenses),
      change: "+4.3% from last month",
      icon: CreditCard,
      color: "text-red-600",
      trend: "up",
    },
    {
      title: "Active Employees",
      value: activeEmployees.toString(),
      change: "+2 new this month",
      icon: Users,
      color: "text-purple-600",
      trend: "up",
    },
  ]

  const recentTransactions = [
    ...currentMonthInvoices.slice(0, 3).map((inv) => ({
      id: inv.id,
      description: `Invoice ${inv.invoiceNumber}`,
      amount: `+${formatCurrency(inv.total)}`,
      date: formatDate(inv.date),
      type: "income" as const,
    })),
    ...currentMonthExpenses.slice(0, 2).map((exp) => ({
      id: exp.id,
      description: exp.description,
      amount: `-${formatCurrency(exp.amount)}`,
      date: formatDate(exp.date),
      type: "expense" as const,
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  const upcomingTasks = [
    { id: 1, task: "Send Invoice to ABC Corp", due: "Today", priority: "high" as const },
    { id: 2, task: "Reconcile Bank Account", due: "Tomorrow", priority: "medium" as const },
    { id: 3, task: "Quarterly Tax Filing", due: "Jan 31", priority: "high" as const },
    { id: 4, task: "Update Employee Records", due: "Feb 5", priority: "low" as const },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">AccounTech Pro</h1>
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-blue-600 font-medium">
                  Dashboard
                </Link>
                <Link href="/invoices" className="text-gray-600 hover:text-gray-900">
                  Invoices
                </Link>
                <Link href="/expenses" className="text-gray-600 hover:text-gray-900">
                  Expenses
                </Link>
                <Link href="/reports" className="text-gray-600 hover:text-gray-900">
                  Reports
                </Link>
                <Link href="/payroll" className="text-gray-600 hover:text-gray-900">
                  Payroll
                </Link>
                <Link href="/customers" className="text-gray-600 hover:text-gray-900">
                  Customers
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </Button>
              <Link href="/invoices/new">
                <Button size="sm">New Invoice</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className="flex items-center space-x-2">
                  {stat.trend === "up" && <TrendingUp className="h-3 w-3 text-green-500" />}
                  {stat.trend === "down" && <TrendingDown className="h-3 w-3 text-red-500" />}
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest financial activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.length > 0 ? (
                  recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            transaction.type === "income" ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-sm text-gray-600">{transaction.date}</p>
                        </div>
                      </div>
                      <span
                        className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                      >
                        {transaction.amount}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No recent transactions</p>
                    <Link href="/invoices/new">
                      <Button className="mt-4" size="sm">
                        Create Your First Invoice
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
              <Link href="/transactions">
                <Button variant="outline" className="w-full mt-4">
                  View All Transactions
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Items that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <AlertCircle
                      className={`w-4 h-4 mt-0.5 ${
                        task.priority === "high"
                          ? "text-red-500"
                          : task.priority === "medium"
                            ? "text-yellow-500"
                            : "text-gray-400"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{task.task}</p>
                      <p className="text-xs text-gray-600">Due: {task.due}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Tasks
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/invoices/new">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <FileText className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium">Create Invoice</span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/expenses/new">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <CreditCard className="w-8 h-8 text-red-600 mb-2" />
                  <span className="text-sm font-medium">Add Expense</span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/reports">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <PieChart className="w-8 h-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium">View Reports</span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/customers">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Users className="w-8 h-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium">Manage Customers</span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
