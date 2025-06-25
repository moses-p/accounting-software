"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Edit, Send, Trash2 } from "lucide-react"
import Link from "next/link"
import { useInvoices, useCustomers } from "@/hooks/use-data"
import { DataTable } from "@/components/ui/data-table"
import type { Invoice } from "@/lib/types"
import { formatCurrency, formatDate } from "@/lib/calculations"

export default function InvoicesPage() {
  const { invoices, loading, updateInvoice, deleteInvoice } = useInvoices()
  const { customers } = useCustomers()

  const handleStatusChange = async (invoiceId: string, newStatus: Invoice["status"]) => {
    await updateInvoice(invoiceId, { status: newStatus })
  }

  const handleDeleteInvoice = async (id: string) => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      await deleteInvoice(id)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Calculate stats
  const totalOutstanding = invoices
    .filter((inv) => inv.status === "sent" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.total, 0)

  const paidThisMonth = invoices
    .filter((inv) => {
      const invDate = new Date(inv.date)
      const now = new Date()
      return (
        inv.status === "paid" && invDate.getMonth() === now.getMonth() && invDate.getFullYear() === now.getFullYear()
      )
    })
    .reduce((sum, inv) => sum + inv.total, 0)

  const overdueInvoices = invoices.filter((inv) => {
    if (inv.status !== "sent") return false
    const dueDate = new Date(inv.dueDate)
    return dueDate < new Date()
  })

  const draftInvoices = invoices.filter((inv) => inv.status === "draft")

  const columns = [
    {
      key: "invoiceNumber",
      header: "Invoice #",
      render: (invoice: Invoice) => <div className="font-medium">{invoice.invoiceNumber}</div>,
    },
    {
      key: "customerName",
      header: "Customer",
      render: (invoice: Invoice) => invoice.customerName,
    },
    {
      key: "total",
      header: "Amount",
      render: (invoice: Invoice) => <div className="font-semibold">{formatCurrency(invoice.total)}</div>,
    },
    {
      key: "status",
      header: "Status",
      render: (invoice: Invoice) => (
        <Badge className={getStatusColor(invoice.status)}>
          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (invoice: Invoice) => formatDate(invoice.date),
    },
    {
      key: "dueDate",
      header: "Due Date",
      render: (invoice: Invoice) => formatDate(invoice.dueDate),
    },
  ]

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
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
                <Link href="/invoices" className="text-blue-600 font-medium">
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
            <Link href="/invoices/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Invoice
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoices</h1>
          <p className="text-gray-600">Manage your customer invoices and payments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Outstanding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{formatCurrency(totalOutstanding)}</div>
              <p className="text-xs text-gray-600">
                {invoices.filter((i) => i.status === "sent" || i.status === "overdue").length} invoices
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Paid This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(paidThisMonth)}</div>
              <p className="text-xs text-gray-600">{invoices.filter((i) => i.status === "paid").length} invoices</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(overdueInvoices.reduce((sum, inv) => sum + inv.total, 0))}
              </div>
              <p className="text-xs text-gray-600">{overdueInvoices.length} invoices</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Draft</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">
                {formatCurrency(draftInvoices.reduce((sum, inv) => sum + inv.total, 0))}
              </div>
              <p className="text-xs text-gray-600">{draftInvoices.length} invoices</p>
            </CardContent>
          </Card>
        </div>

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Invoices</CardTitle>
            <CardDescription>A list of all your invoices and their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={invoices}
              columns={columns}
              searchPlaceholder="Search invoices..."
              actions={(invoice) => (
                <div className="flex gap-2">
                  <Link href={`/invoices/${invoice.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/invoices/${invoice.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  {invoice.status === "draft" && (
                    <Button variant="ghost" size="sm" onClick={() => handleStatusChange(invoice.id, "sent")}>
                      <Send className="w-4 h-4" />
                    </Button>
                  )}
                  {invoice.status === "sent" && (
                    <Button variant="ghost" size="sm" onClick={() => handleStatusChange(invoice.id, "paid")}>
                      Mark Paid
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteInvoice(invoice.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
