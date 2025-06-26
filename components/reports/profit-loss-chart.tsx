"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  {
    name: "Jan",
    revenue: 4000,
    expenses: 2400,
    profit: 1600,
  },
  {
    name: "Feb",
    revenue: 3000,
    expenses: 1398,
    profit: 1602,
  },
  {
    name: "Mar",
    revenue: 2000,
    expenses: 9800,
    profit: -7800,
  },
  {
    name: "Apr",
    revenue: 2780,
    expenses: 3908,
    profit: -1128,
  },
  {
    name: "May",
    revenue: 1890,
    expenses: 4800,
    profit: -2910,
  },
  {
    name: "Jun",
    revenue: 2390,
    expenses: 3800,
    profit: -1410,
  },
  {
    name: "Jul",
    revenue: 3490,
    expenses: 4300,
    profit: -810,
  },
]

export function ProfitLossChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Revenue" />
        <Line type="monotone" dataKey="expenses" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Expenses" />
        <Line type="monotone" dataKey="profit" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Profit" />
      </LineChart>
    </ResponsiveContainer>
  )
}
