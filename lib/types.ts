export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  taxId?: string
  paymentTerms: string
  creditLimit: number
  balance: number
  createdAt: string
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
  taxable: boolean
}

export interface Invoice {
  id: string
  customerId: string
  customerName: string
  invoiceNumber: string
  date: string
  dueDate: string
  items: InvoiceItem[]
  subtotal: number
  taxRate: number
  taxAmount: number
  total: number
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  notes: string
  paymentTerms: string
  currency: string
  createdAt: string
  updatedAt: string
}

export interface Expense {
  id: string
  description: string
  category: string
  amount: number
  date: string
  vendor: string
  status: "pending" | "approved" | "rejected"
  receipt: boolean
  receiptUrl?: string
  paymentMethod: string
  taxDeductible: boolean
  notes: string
  createdAt: string
  updatedAt: string
}

export interface Employee {
  id: string
  name: string
  email: string
  phone: string
  position: string
  department: string
  hireDate: string
  salary: number
  payType: "salary" | "hourly" | "commission"
  payFrequency: "weekly" | "biweekly" | "monthly"
  status: "active" | "inactive"
  taxInfo: {
    federalAllowances: number
    stateAllowances: number
    additionalWithholding: number
  }
  bankInfo: {
    routingNumber: string
    accountNumber: string
  }
  createdAt: string
  updatedAt: string
}

export interface PayrollRun {
  id: string
  payPeriodStart: string
  payPeriodEnd: string
  payDate: string
  employees: PayrollEmployee[]
  totalGrossPay: number
  totalNetPay: number
  totalTaxes: number
  status: "draft" | "processed" | "paid"
  createdAt: string
}

export interface PayrollEmployee {
  employeeId: string
  name: string
  grossPay: number
  federalTax: number
  stateTax: number
  socialSecurity: number
  medicare: number
  otherDeductions: number
  netPay: number
  hoursWorked?: number
}

export interface BankAccount {
  id: string
  name: string
  type: "checking" | "savings" | "credit"
  accountNumber: string
  routingNumber: string
  balance: number
  lastReconciled: string
}

export interface Transaction {
  id: string
  accountId: string
  date: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
  reconciled: boolean
  invoiceId?: string
  expenseId?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "accountant" | "viewer"
  permissions: string[]
  createdAt: string
}

export interface Company {
  id: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  phone: string
  email: string
  website: string
  taxId: string
  fiscalYearEnd: string
  currency: string
  logo?: string
}
