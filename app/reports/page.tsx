import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Download, Calendar, TrendingUp, TrendingDown, DollarSign, FileText } from "lucide-react"
import Link from "next/link"

export default function ReportsPage() {
  const monthlyRevenue = [
    { month: "Jan", revenue: 45231, expenses: 23456 },
    { month: "Feb", revenue: 52341, expenses: 25678 },
    { month: "Mar", revenue: 48567, expenses: 24123 },
    { month: "Apr", revenue: 61234, expenses: 28901 },
    { month: "May", revenue: 55678, expenses: 26789 },
    { month: "Jun", revenue: 58901, expenses: 27456 },
  ]

  const expensesByCategory = [
    { name: "Office Expenses", value: 2500, color: "#8884d8" },
    { name: "Software", value: 1800, color: "#82ca9d" },
    { name: "Marketing", value: 1200, color: "#ffc658" },
    { name: "Travel", value: 800, color: "#ff7300" },
    { name: "Utilities", value: 600, color: "#00ff00" },
  ]

  const cashFlow = [
    { month: "Jan", inflow: 45231, outflow: 23456 },
    { month: "Feb", inflow: 52341, outflow: 25678 },
    { month: "Mar", inflow: 48567, outflow: 24123 },
    { month: "Apr", inflow: 61234, outflow: 28901 },
    { month: "May", inflow: 55678, outflow: 26789 },
    { month: "Jun", inflow: 58901, outflow: 27456 },
  ]

  const reports = [
    {
      title: "Profit & Loss Statement",
      description: "Comprehensive income statement for the selected period",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Balance Sheet",
      description: "Assets, liabilities, and equity overview",
      icon: DollarSign,
      color: "text-blue-600",
    },
    {
      title: "Cash Flow Statement",
      description: "Track cash inflows and outflows",
      icon: TrendingDown,
      color: "text-purple-600",
    },
    {
      title: "Tax Summary",
      description: "Tax-ready reports for filing",
      icon: FileText,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                AccounTech Pro
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/invoices" className="text-gray-600 hover:text-gray-900">
                  Invoices
                </Link>
                <Link href="/expenses" className="text-gray-600 hover:text-gray-900">
                  Expenses
                </Link>
                <Link href="/reports" className="text-blue-600 font-medium">
                  Reports
                </Link>
                <Link href="/payroll" className="text-gray-600 hover:text-gray-900">
                  Payroll
                </Link>
              </nav>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Reports</h1>
          <p className="text-gray-600">Analyze your business performance with detailed reports</p>
        </div>

        {/* Report Period Selector */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Report Period:</label>
                <Select defaultValue="ytd">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mtd">Month to Date</SelectItem>
                    <SelectItem value="qtd">Quarter to Date</SelectItem>
                    <SelectItem value="ytd">Year to Date</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Compare to:</label>
                <Select defaultValue="previous">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="previous">Previous Period</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                    <SelectItem value="none">No Comparison</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">$321,952</div>
              <p className="text-xs text-green-600">+12.5% vs last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">$156,403</div>
              <p className="text-xs text-red-600">+8.2% vs last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Net Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">$165,549</div>
              <p className="text-xs text-green-600">+18.3% vs last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Profit Margin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">51.4%</div>
              <p className="text-xs text-green-600">+2.1% vs last period</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue vs Expenses Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Expenses</CardTitle>
              <CardDescription>Monthly comparison of income and expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                  <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Expenses by Category */}
          <Card>
            <CardHeader>
              <CardTitle>Expenses by Category</CardTitle>
              <CardDescription>Breakdown of expenses by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expensesByCategory}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Cash Flow Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cash Flow Trend</CardTitle>
            <CardDescription>Track your cash inflows and outflows over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cashFlow}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Line type="monotone" dataKey="inflow" stroke="#10b981" strokeWidth={2} name="Cash Inflow" />
                <Line type="monotone" dataKey="outflow" stroke="#ef4444" strokeWidth={2} name="Cash Outflow" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Standard Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Standard Reports</CardTitle>
            <CardDescription>Generate detailed financial reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <report.icon className={`w-6 h-6 ${report.color}`} />
                    <div>
                      <h3 className="font-medium text-gray-900">{report.title}</h3>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
