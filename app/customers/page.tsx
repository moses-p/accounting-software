"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { useCustomers } from "@/hooks/use-data"
import { DataTable } from "@/components/ui/data-table"
import { CustomerForm } from "@/components/forms/customer-form"
import type { Customer } from "@/lib/types"
import { formatCurrency } from "@/lib/calculations"

export default function CustomersPage() {
  const { customers, loading, createCustomer, updateCustomer, deleteCustomer } = useCustomers()
  const [showForm, setShowForm] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [formLoading, setFormLoading] = useState(false)

  const handleCreateCustomer = async (customerData: Omit<Customer, "id" | "createdAt">) => {
    setFormLoading(true)
    try {
      await createCustomer(customerData)
      setShowForm(false)
    } catch (error) {
      console.error("Failed to create customer:", error)
    } finally {
      setFormLoading(false)
    }
  }

  const handleUpdateCustomer = async (customerData: Omit<Customer, "id" | "createdAt">) => {
    if (!editingCustomer) return

    setFormLoading(true)
    try {
      await updateCustomer(editingCustomer.id, customerData)
      setEditingCustomer(null)
      setShowForm(false)
    } catch (error) {
      console.error("Failed to update customer:", error)
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteCustomer = async (id: string) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      await deleteCustomer(id)
    }
  }

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingCustomer(null)
  }

  const columns = [
    {
      key: "name",
      header: "Company Name",
      render: (customer: Customer) => (
        <div>
          <div className="font-medium">{customer.name}</div>
          <div className="text-sm text-gray-500">{customer.email}</div>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Contact",
      render: (customer: Customer) => (
        <div className="space-y-1">
          {customer.phone && (
            <div className="flex items-center text-sm">
              <Phone className="w-3 h-3 mr-1" />
              {customer.phone}
            </div>
          )}
          {customer.email && (
            <div className="flex items-center text-sm">
              <Mail className="w-3 h-3 mr-1" />
              {customer.email}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "address",
      header: "Location",
      render: (customer: Customer) => (
        <div className="flex items-start text-sm">
          <MapPin className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
          <div>
            {customer.address && <div>{customer.address}</div>}
            {(customer.city || customer.state) && (
              <div>
                {customer.city}
                {customer.city && customer.state && ", "}
                {customer.state} {customer.zipCode}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "paymentTerms",
      header: "Payment Terms",
      render: (customer: Customer) => <Badge variant="outline">{customer.paymentTerms}</Badge>,
    },
    {
      key: "balance",
      header: "Balance",
      render: (customer: Customer) => (
        <div
          className={`font-semibold ${customer.balance > 0 ? "text-green-600" : customer.balance < 0 ? "text-red-600" : "text-gray-600"}`}
        >
          {formatCurrency(customer.balance)}
        </div>
      ),
    },
    {
      key: "creditLimit",
      header: "Credit Limit",
      render: (customer: Customer) => formatCurrency(customer.creditLimit),
    },
  ]

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50">
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
                  <Link href="/payroll" className="text-gray-600 hover:text-gray-900">
                    Payroll
                  </Link>
                  <Link href="/customers" className="text-blue-600 font-medium">
                    Customers
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center">
            <CustomerForm
              customer={editingCustomer || undefined}
              onSubmit={editingCustomer ? handleUpdateCustomer : handleCreateCustomer}
              onCancel={handleCancelForm}
              loading={formLoading}
            />
          </div>
        </main>
      </div>
    )
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
                <Link href="/payroll" className="text-gray-600 hover:text-gray-900">
                  Payroll
                </Link>
                <Link href="/customers" className="text-blue-600 font-medium">
                  Customers
                </Link>
              </nav>
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Customer
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customers</h1>
          <p className="text-gray-600">Manage your customer database and relationships</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{customers.length}</div>
              <p className="text-xs text-gray-600">Active accounts</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Receivables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(customers.reduce((sum, c) => sum + Math.max(0, c.balance), 0))}
              </div>
              <p className="text-xs text-gray-600">Outstanding balances</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Credit Extended</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(customers.reduce((sum, c) => sum + c.creditLimit, 0))}
              </div>
              <p className="text-xs text-gray-600">Total credit limits</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Average Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {formatCurrency(
                  customers.length > 0 ? customers.reduce((sum, c) => sum + c.balance, 0) / customers.length : 0,
                )}
              </div>
              <p className="text-xs text-gray-600">Per customer</p>
            </CardContent>
          </Card>
        </div>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Customers</CardTitle>
            <CardDescription>Manage your customer database</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={customers}
              columns={columns}
              searchPlaceholder="Search customers..."
              actions={(customer) => (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEditCustomer(customer)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteCustomer(customer.id)}>
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
