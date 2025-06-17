import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { IncidentsChart } from '@/components/analytics/IncidentsChart';
import { ResponseTimeChart } from '@/components/analytics/ResponseTimeChart';
import { mockAnalyticsData } from '@/lib/mockData';
import { Download } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Key metrics and trends of reported incidents.</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export Data (CSV/Excel)
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <IncidentsChart 
          data={mockAnalyticsData.incidentsByWilaya} 
          title="Incidents by Wilaya" 
          description="Total incidents reported per Wilaya."
          dataKey="wilaya"
          fillColorVar="hsl(var(--chart-1))"
        />
        <IncidentsChart 
          data={mockAnalyticsData.incidentsByService} 
          title="Incidents by Service" 
          description="Total incidents by service type."
          dataKey="service"
          fillColorVar="hsl(var(--chart-2))"
        />
        <ResponseTimeChart data={mockAnalyticsData.avgResponseTime} />
      </div>
      
      <div className="grid gap-6 lg:grid-cols-1">
        <IncidentsChart 
            data={mockAnalyticsData.incidentsByMonth} 
            title="Incidents Over Time" 
            description="Monthly incident reports."
            dataKey="month"
            fillColorVar="hsl(var(--chart-3))"
        />
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Emergency Density Heatmap</CardTitle>
          <CardDescription>Visual representation of high-density emergency zones.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-[16/9] w-full bg-muted rounded-md overflow-hidden flex items-center justify-center">
            <Image
              src="https://placehold.co/1200x675.png"
              alt="Emergency Heatmap Placeholder"
              width={1200}
              height={675}
              className="object-cover w-full h-full"
              data-ai-hint="heatmap chart"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
