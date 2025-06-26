"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  {
    name: "Office",
    value: 2400,
    color: "hsl(var(--chart-1))",
  },
  {
    name: "Software",
    value: 1398,
    color: "hsl(var(--chart-2))",
  },
  {
    name: "Travel",
    value: 800,
    color: "hsl(var(--chart-3))",
  },
  {
    name: "Meals",
    value: 300,
    color: "hsl(var(--chart-4))",
  },
  {
    name: "Marketing",
    value: 200,
    color: "hsl(var(--chart-5))",
  },
]

export function ExpenseBreakdown() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
      </PieChart>
    </ResponsiveContainer>
  )
}
