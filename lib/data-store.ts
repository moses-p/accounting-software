import type { Customer, Invoice, Expense, Employee } from "./types"

// Local storage keys
const STORAGE_KEYS = {
  CUSTOMERS: "accounting_customers",
  INVOICES: "accounting_invoices",
  EXPENSES: "accounting_expenses",
  EMPLOYEES: "accounting_employees",
  PAYROLL_RUNS: "accounting_payroll_runs",
  BANK_ACCOUNTS: "accounting_bank_accounts",
  TRANSACTIONS: "accounting_transactions",
  USER: "accounting_user",
  COMPANY: "accounting_company",
}

// Generic storage functions
function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error("Failed to save to storage:", error)
  }
}

// Initialize with sample data
function initializeSampleData() {
  if (typeof window === "undefined") return

  // Initialize customers if empty
  const customers = getFromStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, [])
  if (customers.length === 0) {
    const sampleCustomers: Customer[] = [
      {
        id: "cust-1",
        name: "ABC Corporation",
        email: "billing@abccorp.com",
        phone: "(555) 123-4567",
        address: "123 Business St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        paymentTerms: "Net 30",
        creditLimit: 50000,
        balance: 2500,
        createdAt: "2024-01-01T00:00:00Z",
      },
      {
        id: "cust-2",
        name: "XYZ Ltd",
        email: "accounts@xyzltd.com",
        phone: "(555) 234-5678",
        address: "456 Commerce Ave",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90210",
        paymentTerms: "Net 15",
        creditLimit: 25000,
        balance: 1750,
        createdAt: "2024-01-02T00:00:00Z",
      },
    ]
    saveToStorage(STORAGE_KEYS.CUSTOMERS, sampleCustomers)
  }

  // Initialize other sample data similarly...
  const expenses = getFromStorage<Expense[]>(STORAGE_KEYS.EXPENSES, [])
  if (expenses.length === 0) {
    const sampleExpenses: Expense[] = [
      {
        id: "exp-1",
        description: "Office Supplies",
        category: "Office Expenses",
        amount: 156.78,
        date: "2024-01-14",
        vendor: "Staples",
        status: "approved",
        receipt: true,
        paymentMethod: "Credit Card",
        taxDeductible: true,
        notes: "Monthly office supplies order",
        createdAt: "2024-01-14T00:00:00Z",
        updatedAt: "2024-01-14T00:00:00Z",
      },
    ]
    saveToStorage(STORAGE_KEYS.EXPENSES, sampleExpenses)
  }
}

// Customer operations
export const customerStore = {
  getAll: (): Customer[] => getFromStorage(STORAGE_KEYS.CUSTOMERS, []),
  getById: (id: string): Customer | undefined => {
    const customers = getFromStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, [])
    return customers.find((c) => c.id === id)
  },
  create: (customer: Omit<Customer, "id" | "createdAt">): Customer => {
    const customers = getFromStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, [])
    const newCustomer: Customer = {
      ...customer,
      id: `cust-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    customers.push(newCustomer)
    saveToStorage(STORAGE_KEYS.CUSTOMERS, customers)
    return newCustomer
  },
  update: (id: string, updates: Partial<Customer>): Customer | null => {
    const customers = getFromStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, [])
    const index = customers.findIndex((c) => c.id === id)
    if (index === -1) return null

    customers[index] = { ...customers[index], ...updates }
    saveToStorage(STORAGE_KEYS.CUSTOMERS, customers)
    return customers[index]
  },
  delete: (id: string): boolean => {
    const customers = getFromStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, [])
    const filtered = customers.filter((c) => c.id !== id)
    if (filtered.length === customers.length) return false

    saveToStorage(STORAGE_KEYS.CUSTOMERS, filtered)
    return true
  },
}

// Invoice operations
export const invoiceStore = {
  getAll: (): Invoice[] => getFromStorage(STORAGE_KEYS.INVOICES, []),
  getById: (id: string): Invoice | undefined => {
    const invoices = getFromStorage<Invoice[]>(STORAGE_KEYS.INVOICES, [])
    return invoices.find((i) => i.id === id)
  },
  create: (invoice: Omit<Invoice, "id" | "createdAt" | "updatedAt">): Invoice => {
    const invoices = getFromStorage<Invoice[]>(STORAGE_KEYS.INVOICES, [])
    const newInvoice: Invoice = {
      ...invoice,
      id: `inv-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    invoices.push(newInvoice)
    saveToStorage(STORAGE_KEYS.INVOICES, invoices)
    return newInvoice
  },
  update: (id: string, updates: Partial<Invoice>): Invoice | null => {
    const invoices = getFromStorage<Invoice[]>(STORAGE_KEYS.INVOICES, [])
    const index = invoices.findIndex((i) => i.id === id)
    if (index === -1) return null

    invoices[index] = { ...invoices[index], ...updates, updatedAt: new Date().toISOString() }
    saveToStorage(STORAGE_KEYS.INVOICES, invoices)
    return invoices[index]
  },
  delete: (id: string): boolean => {
    const invoices = getFromStorage<Invoice[]>(STORAGE_KEYS.INVOICES, [])
    const filtered = invoices.filter((i) => i.id !== id)
    if (filtered.length === invoices.length) return false

    saveToStorage(STORAGE_KEYS.INVOICES, filtered)
    return true
  },
  getNextInvoiceNumber: (): string => {
    const invoices = getFromStorage<Invoice[]>(STORAGE_KEYS.INVOICES, [])
    const numbers = invoices.map((i) => Number.parseInt(i.invoiceNumber.replace(/\D/g, ""))).filter((n) => !isNaN(n))
    const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0
    return `INV-${String(maxNumber + 1).padStart(3, "0")}`
  },
}

// Expense operations
export const expenseStore = {
  getAll: (): Expense[] => getFromStorage(STORAGE_KEYS.EXPENSES, []),
  getById: (id: string): Expense | undefined => {
    const expenses = getFromStorage<Expense[]>(STORAGE_KEYS.EXPENSES, [])
    return expenses.find((e) => e.id === id)
  },
  create: (expense: Omit<Expense, "id" | "createdAt" | "updatedAt">): Expense => {
    const expenses = getFromStorage<Expense[]>(STORAGE_KEYS.EXPENSES, [])
    const newExpense: Expense = {
      ...expense,
      id: `exp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    expenses.push(newExpense)
    saveToStorage(STORAGE_KEYS.EXPENSES, expenses)
    return newExpense
  },
  update: (id: string, updates: Partial<Expense>): Expense | null => {
    const expenses = getFromStorage<Expense[]>(STORAGE_KEYS.EXPENSES, [])
    const index = expenses.findIndex((e) => e.id === id)
    if (index === -1) return null

    expenses[index] = { ...expenses[index], ...updates, updatedAt: new Date().toISOString() }
    saveToStorage(STORAGE_KEYS.EXPENSES, expenses)
    return expenses[index]
  },
  delete: (id: string): boolean => {
    const expenses = getFromStorage<Expense[]>(STORAGE_KEYS.EXPENSES, [])
    const filtered = expenses.filter((e) => e.id !== id)
    if (filtered.length === expenses.length) return false

    saveToStorage(STORAGE_KEYS.EXPENSES, filtered)
    return true
  },
}

// Employee operations
export const employeeStore = {
  getAll: (): Employee[] => getFromStorage(STORAGE_KEYS.EMPLOYEES, []),
  getById: (id: string): Employee | undefined => {
    const employees = getFromStorage<Employee[]>(STORAGE_KEYS.EMPLOYEES, [])
    return employees.find((e) => e.id === id)
  },
  create: (employee: Omit<Employee, "id" | "createdAt" | "updatedAt">): Employee => {
    const employees = getFromStorage<Employee[]>(STORAGE_KEYS.EMPLOYEES, [])
    const newEmployee: Employee = {
      ...employee,
      id: `emp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    employees.push(newEmployee)
    saveToStorage(STORAGE_KEYS.EMPLOYEES, employees)
    return newEmployee
  },
  update: (id: string, updates: Partial<Employee>): Employee | null => {
    const employees = getFromStorage<Employee[]>(STORAGE_KEYS.EMPLOYEES, [])
    const index = employees.findIndex((e) => e.id === id)
    if (index === -1) return null

    employees[index] = { ...employees[index], ...updates, updatedAt: new Date().toISOString() }
    saveToStorage(STORAGE_KEYS.EMPLOYEES, employees)
    return employees[index]
  },
  delete: (id: string): boolean => {
    const employees = getFromStorage<Employee[]>(STORAGE_KEYS.EMPLOYEES, [])
    const filtered = employees.filter((e) => e.id !== id)
    if (filtered.length === employees.length) return false

    saveToStorage(STORAGE_KEYS.EMPLOYEES, filtered)
    return true
  },
}

// Initialize sample data on module load
if (typeof window !== "undefined") {
  initializeSampleData()
}
