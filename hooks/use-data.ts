"use client"

import { useState, useEffect } from "react"
import { customerStore, invoiceStore, expenseStore, employeeStore } from "@/lib/data-store"
import type { Customer, Invoice, Expense, Employee } from "@/lib/types"

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCustomers(customerStore.getAll())
    setLoading(false)
  }, [])

  const createCustomer = (customer: Omit<Customer, "id" | "createdAt">) => {
    const newCustomer = customerStore.create(customer)
    setCustomers((prev) => [...prev, newCustomer])
    return newCustomer
  }

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    const updated = customerStore.update(id, updates)
    if (updated) {
      setCustomers((prev) => prev.map((c) => (c.id === id ? updated : c)))
    }
    return updated
  }

  const deleteCustomer = (id: string) => {
    const success = customerStore.delete(id)
    if (success) {
      setCustomers((prev) => prev.filter((c) => c.id !== id))
    }
    return success
  }

  return {
    customers,
    loading,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    refreshCustomers: () => setCustomers(customerStore.getAll()),
  }
}

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setInvoices(invoiceStore.getAll())
    setLoading(false)
  }, [])

  const createInvoice = (invoice: Omit<Invoice, "id" | "createdAt" | "updatedAt">) => {
    const newInvoice = invoiceStore.create(invoice)
    setInvoices((prev) => [...prev, newInvoice])
    return newInvoice
  }

  const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    const updated = invoiceStore.update(id, updates)
    if (updated) {
      setInvoices((prev) => prev.map((i) => (i.id === id ? updated : i)))
    }
    return updated
  }

  const deleteInvoice = (id: string) => {
    const success = invoiceStore.delete(id)
    if (success) {
      setInvoices((prev) => prev.filter((i) => i.id !== id))
    }
    return success
  }

  const getNextInvoiceNumber = () => invoiceStore.getNextInvoiceNumber()

  return {
    invoices,
    loading,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    getNextInvoiceNumber,
    refreshInvoices: () => setInvoices(invoiceStore.getAll()),
  }
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setExpenses(expenseStore.getAll())
    setLoading(false)
  }, [])

  const createExpense = (expense: Omit<Expense, "id" | "createdAt" | "updatedAt">) => {
    const newExpense = expenseStore.create(expense)
    setExpenses((prev) => [...prev, newExpense])
    return newExpense
  }

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    const updated = expenseStore.update(id, updates)
    if (updated) {
      setExpenses((prev) => prev.map((e) => (e.id === id ? updated : e)))
    }
    return updated
  }

  const deleteExpense = (id: string) => {
    const success = expenseStore.delete(id)
    if (success) {
      setExpenses((prev) => prev.filter((e) => e.id !== id))
    }
    return success
  }

  return {
    expenses,
    loading,
    createExpense,
    updateExpense,
    deleteExpense,
    refreshExpenses: () => setExpenses(expenseStore.getAll()),
  }
}

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setEmployees(employeeStore.getAll())
    setLoading(false)
  }, [])

  const createEmployee = (employee: Omit<Employee, "id" | "createdAt" | "updatedAt">) => {
    const newEmployee = employeeStore.create(employee)
    setEmployees((prev) => [...prev, newEmployee])
    return newEmployee
  }

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    const updated = employeeStore.update(id, updates)
    if (updated) {
      setEmployees((prev) => prev.map((e) => (e.id === id ? updated : e)))
    }
    return updated
  }

  const deleteEmployee = (id: string) => {
    const success = employeeStore.delete(id)
    if (success) {
      setEmployees((prev) => prev.filter((e) => e.id !== id))
    }
    return success
  }

  return {
    employees,
    loading,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    refreshEmployees: () => setEmployees(employeeStore.getAll()),
  }
}
