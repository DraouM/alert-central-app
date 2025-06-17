"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { AnalyticsData } from "@/lib/types"

interface ResponseTimeChartProps {
  data: AnalyticsData['avgResponseTime'];
}

const chartConfig = {
  responseTime: {
    label: "Avg. Response Time (min)",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function ResponseTimeChart({ data }: ResponseTimeChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Response Time</CardTitle>
        <CardDescription>Monthly average response time for incidents.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
                tickFormatter={(value) => `${value} min`}
              />
              <Tooltip cursor={{ fill: "hsl(var(--muted))" }} content={<ChartTooltipContent indicator="line" />} />
              <Legend />
              <Line 
                dataKey="time" 
                type="monotone" 
                stroke="var(--color-responseTime)" 
                strokeWidth={2} 
                dot={{ r: 4, fill: "var(--color-responseTime)"}}
                activeDot={{ r: 6 }}
                name={chartConfig.responseTime.label}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
