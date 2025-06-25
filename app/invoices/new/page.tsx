"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, Save, Send } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useInvoices, useCustomers } from "@/hooks/use-data"
import type { InvoiceItem } from "@/lib/types"
import { calculateInvoiceItem, calculateInvoiceTotals, addDays, getPaymentTermsDays } from "@/lib/calculations"

export default function NewInvoicePage() {
  const router = useRouter()
  const { createInvoice, getNextInvoiceNumber } = useInvoices()
  const { customers } = useCustomers()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    invoiceNumber: getNextInvoiceNumber(),
    date: new Date().toISOString().split("T")[0],
    dueDate: addDays(new Date().toISOString().split("T")[0], 30),
    paymentTerms: "Net 30",
    currency: "USD",
    taxRate: 8.5,
    notes: "",
  })

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
      taxable: true,
    },
  ])

  const handleFormChange = (field: string, value: string | number) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value }

      // Auto-update due date when payment terms change
      if (field === "paymentTerms") {
        const days = getPaymentTermsDays(value as string)
        updated.dueDate = addDays(updated.date, days)
      }

      // Auto-update customer name when customer changes
      if (field === "customerId") {
        const customer = customers.find((c) => c.id === value)
        if (customer) {
          updated.customerName = customer.name
          updated.paymentTerms = customer.paymentTerms
          const days = getPaymentTermsDays(customer.paymentTerms)
          updated.dueDate = addDays(updated.date, days)
        }
      }

      return updated
    })
  }

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number | boolean) => {
    setItems((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }

      // Recalculate amount when quantity or rate changes
      if (field === "quantity" || field === "rate") {
        updated[index].amount = calculateInvoiceItem(updated[index].quantity, updated[index].rate)
      }

      return updated
    })
  }

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
        taxable: true,
      },
    ])
  }

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const { subtotal, taxAmount, total } = calculateInvoiceTotals(items, formData.taxRate / 100)

  const handleSubmit = async (status: "draft" | "sent") => {
    if (!formData.customerId || !formData.customerName) {
      alert("Please select a customer")
      return
    }

    if (items.some((item) => !item.description.trim())) {
      alert("Please fill in all item descriptions")
      return
    }

    setLoading(true)
    try {
      const invoice = await createInvoice({
        customerId: formData.customerId,
        customerName: formData.customerName,
        invoiceNumber: formData.invoiceNumber,
        date: formData.date,
        dueDate: formData.dueDate,
        items: items.filter((item) => item.description.trim()),
        subtotal,
        taxRate: formData.taxRate / 100,
        taxAmount,
        total,
        status,
        notes: formData.notes,
        paymentTerms: formData.paymentTerms,
        currency: formData.currency,
      })

      router.push(`/invoices/${invoice.id}`)
    } catch (error) {
      console.error("Failed to create invoice:", error)
      alert("Failed to create invoice. Please try again.")
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
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleSubmit("draft")} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={() => handleSubmit("sent")} disabled={loading}>
                <Send className="w-4 h-4 mr-2" />
                {loading ? "Creating..." : "Send Invoice"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Invoice</h1>
          <p className="text-gray-600">Fill in the details below to create a new invoice</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Invoice Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
                <CardDescription>Select customer and invoice details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customer">Customer *</Label>
                    <Select
                      value={formData.customerId}
                      onValueChange={(value) => handleFormChange("customerId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="invoice-number">Invoice Number</Label>
                    <Input
                      id="invoice-number"
                      value={formData.invoiceNumber}
                      onChange={(e) => handleFormChange("invoiceNumber", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="invoice-date">Invoice Date</Label>
                    <Input
                      id="invoice-date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleFormChange("date", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="due-date">Due Date</Label>
                    <Input
                      id="due-date"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleFormChange("dueDate", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Invoice Items */}
            <Card>
              <CardHeader>
                <CardTitle>Invoice Items</CardTitle>
                <CardDescription>Add products or services to this invoice</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-20">Qty</TableHead>
                      <TableHead className="w-24">Rate</TableHead>
                      <TableHead className="w-24">Amount</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Input
                            placeholder="Item description"
                            value={item.description}
                            onChange={(e) => handleItemChange(index, "description", e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.quantity}
                            onChange={(e) =>
                              handleItemChange(index, "quantity", Number.parseFloat(e.target.value) || 0)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.rate}
                            onChange={(e) => handleItemChange(index, "rate", Number.parseFloat(e.target.value) || 0)}
                          />
                        </TableCell>
                        <TableCell className="font-semibold">${item.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(index)}
                            disabled={items.length === 1}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button variant="outline" className="mt-4" onClick={addItem}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional notes or terms..."
                    className="min-h-[100px]"
                    value={formData.notes}
                    onChange={(e) => handleFormChange("notes", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="payment-terms">Payment Terms</Label>
                    <Select
                      value={formData.paymentTerms}
                      onValueChange={(value) => handleFormChange("paymentTerms", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                        <SelectItem value="Net 15">Net 15</SelectItem>
                        <SelectItem value="Net 30">Net 30</SelectItem>
                        <SelectItem value="Net 60">Net 60</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={formData.currency} onValueChange={(value) => handleFormChange("currency", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="CAD">CAD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Invoice Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax ({formData.taxRate}%):</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                  <Input
                    id="tax-rate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={formData.taxRate}
                    onChange={(e) => handleFormChange("taxRate", Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={() => handleSubmit("sent")} disabled={loading}>
                  <Send className="w-4 h-4 mr-2" />
                  {loading ? "Creating..." : "Send Invoice"}
                </Button>
                <Button variant="outline" className="w-full" onClick={() => handleSubmit("draft")} disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  Save as Draft
                </Button>
                <Link href="/invoices">
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
