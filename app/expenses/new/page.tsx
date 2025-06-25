"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Save, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useExpenses } from "@/hooks/use-data"

const EXPENSE_CATEGORIES = [
  "Office Expenses",
  "Software",
  "Marketing",
  "Travel",
  "Utilities",
  "Meals & Entertainment",
  "Vehicle",
  "Professional Services",
  "Insurance",
  "Equipment",
  "Supplies",
  "Other",
]

const PAYMENT_METHODS = ["Cash", "Credit Card", "Debit Card", "Check", "Bank Transfer", "PayPal", "Other"]

export default function NewExpensePage() {
  const router = useRouter()
  const { createExpense } = useExpenses()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    description: "",
    category: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    vendor: "",
    paymentMethod: "",
    taxDeductible: true,
    receipt: false,
    notes: "",
  })

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.description.trim() || !formData.category || formData.amount <= 0) {
      alert("Please fill in all required fields")
      return
    }

    setLoading(true)
    try {
      await createExpense({
        ...formData,
        status: "pending",
        receiptUrl: undefined,
      })

      router.push("/expenses")
    } catch (error) {
      console.error("Failed to create expense:", error)
      alert("Failed to create expense. Please try again.")
    } finally {
      setLoading(false)
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
                <Link href="/expenses" className="text-blue-600 font-medium">
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
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Expense</h1>
          <p className="text-gray-600">Record a new business expense</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Expense Details</CardTitle>
            <CardDescription>Fill in the information about your business expense</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="What was this expense for?"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => handleChange("amount", Number.parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPENSE_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vendor">Vendor</Label>
                  <Input
                    id="vendor"
                    value={formData.vendor}
                    onChange={(e) => handleChange("vendor", e.target.value)}
                    placeholder="Who did you pay?"
                  />
                </div>
                <div>
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleChange("paymentMethod", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="How did you pay?" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAYMENT_METHODS.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Additional details about this expense..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tax-deductible"
                    checked={formData.taxDeductible}
                    onCheckedChange={(checked) => handleChange("taxDeductible", checked)}
                  />
                  <Label htmlFor="tax-deductible">This expense is tax deductible</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="has-receipt"
                    checked={formData.receipt}
                    onCheckedChange={(checked) => handleChange("receipt", checked)}
                  />
                  <Label htmlFor="has-receipt">I have a receipt for this expense</Label>
                </div>
              </div>

              {formData.receipt && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <Label htmlFor="receipt-upload" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">Upload receipt</span>
                          <span className="mt-1 block text-sm text-gray-500">PNG, JPG, PDF up to 10MB</span>
                        </Label>
                        <Input id="receipt-upload" type="file" className="hidden" accept="image/*,.pdf" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-end space-x-4">
                <Link href="/expenses">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Saving..." : "Save Expense"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
