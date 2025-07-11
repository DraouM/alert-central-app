import { ZoneEditor } from "@/components/zones/ZoneEditor";
import { mockWilayaZones } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function ZoneConfigurationPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Zone Configuration</h1>
            <p className="text-muted-foreground">Manage authority zones and service boundaries within each Wilaya.</p>
        </div>
         <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Wilaya Zone
        </Button>
      </div>
      <ZoneEditor zones={mockWilayaZones} />
    </div>
  );
}
