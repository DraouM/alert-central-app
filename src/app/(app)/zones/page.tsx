import { ZoneEditor } from "@/components/zones/ZoneEditor";
import { mockWilayaZones } from "@/lib/mockData";

export default function ZoneConfigurationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Zone Configuration</h1>
        <p className="text-muted-foreground">Manage authority zones and service boundaries within each Wilaya.</p>
      </div>
      <ZoneEditor zones={mockWilayaZones} />
    </div>
  );
}
