import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Download, Play, Users, Calendar, FileText } from "lucide-react"
import Link from "next/link"

export default function PayrollPage() {
  const employees = [
    {
      id: "EMP-001",
      name: "John Smith",
      position: "Software Developer",
      salary: "$75,000",
      payType: "Salary",
      status: "active",
      lastPaid: "2024-01-15",
    },
    {
      id: "EMP-002",
      name: "Sarah Johnson",
      position: "Marketing Manager",
      salary: "$65,000",
      payType: "Salary",
      status: "active",
      lastPaid: "2024-01-15",
    },
    {
      id: "EMP-003",
      name: "Mike Davis",
      position: "Graphic Designer",
      salary: "$25.00/hr",
      payType: "Hourly",
      status: "active",
      lastPaid: "2024-01-15",
    },
    {
      id: "EMP-004",
      name: "Lisa Wilson",
      position: "Accountant",
      salary: "$55,000",
      payType: "Salary",
      status: "active",
      lastPaid: "2024-01-15",
    },
    {
      id: "EMP-005",
      name: "Tom Brown",
      position: "Sales Representative",
      salary: "$45,000",
      payType: "Salary + Commission",
      status: "inactive",
      lastPaid: "2023-12-15",
    },
  ]

  const payrollRuns = [
    {
      id: "PR-001",
      period: "January 1-15, 2024",
      employees: 4,
      grossPay: "$12,450.00",
      netPay: "$9,876.50",
      status: "completed",
      date: "2024-01-15",
    },
    {
      id: "PR-002",
      period: "December 16-31, 2023",
      employees: 5,
      grossPay: "$15,230.00",
      netPay: "$12,184.00",
      status: "completed",
      date: "2023-12-31",
    },
    {
      id: "PR-003",
      period: "December 1-15, 2023",
      employees: 5,
      grossPay: "$14,890.00",
      netPay: "$11,912.00",
      status: "completed",
      date: "2023-12-15",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
                <Link href="/reports" className="text-gray-600 hover:text-gray-900">
                  Reports
                </Link>
                <Link href="/payroll" className="text-blue-600 font-medium">
                  Payroll
                </Link>
              </nav>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Employee
              </Button>
              <Button>
                <Play className="w-4 h-4 mr-2" />
                Run Payroll
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payroll Management</h1>
          <p className="text-gray-600">Manage employee payroll and compensation</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">4</div>
              <p className="text-xs text-gray-600">1 inactive</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Payroll</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">$24,900</div>
              <p className="text-xs text-gray-600">Gross pay</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tax Withholdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">$5,976</div>
              <p className="text-xs text-gray-600">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Next Payroll</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">Jan 31</div>
              <p className="text-xs text-gray-600">5 days away</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Employees List */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Employees</CardTitle>
                    <CardDescription>Manage your team members and their compensation</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Employee
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="Search employees..." className="pl-10" />
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Pay Rate</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Paid</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell className="font-semibold">{employee.salary}</TableCell>
                        <TableCell>{employee.payType}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(employee.status)}>
                            {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{employee.lastPaid}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              Pay Stub
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Recent Payroll Runs */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Payroll Runs</CardTitle>
                <CardDescription>History of completed payroll processing</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pay Period</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead>Gross Pay</TableHead>
                      <TableHead>Net Pay</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payrollRuns.map((run) => (
                      <TableRow key={run.id}>
                        <TableCell className="font-medium">{run.period}</TableCell>
                        <TableCell>{run.employees}</TableCell>
                        <TableCell className="font-semibold">{run.grossPay}</TableCell>
                        <TableCell className="font-semibold">{run.netPay}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(run.status)}>
                            {run.status.charAt(0).toUpperCase() + run.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{run.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Payroll Actions Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Run Payroll
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Add Employee
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Tax Forms
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export Reports
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payroll Calendar</CardTitle>
                <CardDescription>Upcoming payroll dates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-900">Next Payroll</p>
                    <p className="text-sm text-blue-700">January 31, 2024</p>
                  </div>
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Tax Filing Due</p>
                    <p className="text-sm text-gray-700">February 15, 2024</p>
                  </div>
                  <FileText className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Quarterly Report</p>
                    <p className="text-sm text-gray-700">March 31, 2024</p>
                  </div>
                  <FileText className="w-5 h-5 text-gray-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Summary</CardTitle>
                <CardDescription>Current period tax information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Federal Tax:</span>
                  <span className="font-semibold">$3,486.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">State Tax:</span>
                  <span className="font-semibold">$1,245.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Social Security:</span>
                  <span className="font-semibold">$1,543.80</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Medicare:</span>
                  <span className="font-semibold">$361.05</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total Withheld:</span>
                    <span>$6,635.85</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
