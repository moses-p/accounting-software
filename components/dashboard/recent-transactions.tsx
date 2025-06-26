import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface RecentTransactionsProps {
  invoices: Array<{
    id: string
    invoice_number: string
    amount: number
    customers: { name: string } | null
  }>
}

export function RecentTransactions({ invoices }: RecentTransactionsProps) {
  if (!invoices.length) {
    return <div className="text-center text-muted-foreground py-8">No recent transactions</div>
  }

  return (
    <div className="space-y-8">
      {invoices.map((invoice) => (
        <div key={invoice.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
            <AvatarFallback>
              {invoice.customers?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "UN"}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{invoice.customers?.name || "Unknown Customer"}</p>
            <p className="text-sm text-muted-foreground">{invoice.invoice_number}</p>
          </div>
          <div className="ml-auto font-medium">+${invoice.amount.toFixed(2)}</div>
        </div>
      ))}
    </div>
  )
}
