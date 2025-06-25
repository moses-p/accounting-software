import type { InvoiceItem, Employee, PayrollEmployee } from "./types"

// Tax rates (these would typically come from a tax service)
export const TAX_RATES = {
  FEDERAL: 0.22,
  STATE: 0.05,
  SOCIAL_SECURITY: 0.062,
  MEDICARE: 0.0145,
  UNEMPLOYMENT: 0.006,
}

// Invoice calculations
export function calculateInvoiceItem(quantity: number, rate: number): number {
  return Math.round(quantity * rate * 100) / 100
}

export function calculateInvoiceTotals(items: InvoiceItem[], taxRate = 0) {
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
  const taxAmount = Math.round(subtotal * taxRate * 100) / 100
  const total = subtotal + taxAmount

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    taxAmount,
    total: Math.round(total * 100) / 100,
  }
}

// Payroll calculations
export function calculatePayrollTaxes(grossPay: number, employee: Employee): PayrollEmployee {
  const federalTax = Math.round(grossPay * TAX_RATES.FEDERAL * 100) / 100
  const stateTax = Math.round(grossPay * TAX_RATES.STATE * 100) / 100
  const socialSecurity = Math.round(grossPay * TAX_RATES.SOCIAL_SECURITY * 100) / 100
  const medicare = Math.round(grossPay * TAX_RATES.MEDICARE * 100) / 100

  const totalTaxes = federalTax + stateTax + socialSecurity + medicare
  const netPay = Math.round((grossPay - totalTaxes) * 100) / 100

  return {
    employeeId: employee.id,
    name: employee.name,
    grossPay: Math.round(grossPay * 100) / 100,
    federalTax,
    stateTax,
    socialSecurity,
    medicare,
    otherDeductions: 0,
    netPay,
  }
}

export function calculateGrossPay(employee: Employee, hoursWorked?: number): number {
  if (employee.payType === "salary") {
    // Assuming monthly salary
    return Math.round(employee.salary * 100) / 100
  } else if (employee.payType === "hourly" && hoursWorked) {
    return Math.round(employee.salary * hoursWorked * 100) / 100
  }
  return 0
}

// Financial metrics
export function calculateProfitMargin(revenue: number, expenses: number): number {
  if (revenue === 0) return 0
  return Math.round(((revenue - expenses) / revenue) * 100 * 100) / 100
}

export function calculateGrowthRate(current: number, previous: number): number {
  if (previous === 0) return 0
  return Math.round(((current - previous) / previous) * 100 * 100) / 100
}

// Date utilities
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function addDays(date: string, days: number): string {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result.toISOString().split("T")[0]
}

export function getPaymentTermsDays(terms: string): number {
  const match = terms.match(/\d+/)
  return match ? Number.parseInt(match[0]) : 30
}
