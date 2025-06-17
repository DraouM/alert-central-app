"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { AnalyticsData } from "@/lib/types"

interface IncidentsChartProps {
  data: AnalyticsData['incidentsByWilaya'] | AnalyticsData['incidentsByService'] | AnalyticsData['incidentsByMonth'];
  title: string;
  description: string;
  dataKey: string;
  fillColorVar: string; // e.g., "var(--color-wilaya)"
}

export function IncidentsChart({ data, title, description, dataKey, fillColorVar }: IncidentsChartProps) {
  const chartConfig = {
    [dataKey]: {
      label: dataKey.charAt(0).toUpperCase() + dataKey.slice(1),
      color: fillColorVar,
    },
  } satisfies ChartConfig

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
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
              />
              <Tooltip cursor={{ fill: "hsl(var(--muted))" }} content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="total" fill={fillColorVar} radius={[4, 4, 0, 0]} name={chartConfig[dataKey].label}/>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
