import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapFilters } from '@/components/map-view/MapFilters';

export default function MapViewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Incidents Map View</h1>
        <p className="text-muted-foreground">Visualize emergency alerts on the map.</p>
      </div>
      
      <MapFilters />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Live Incident Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-[16/9] w-full bg-muted rounded-md overflow-hidden flex items-center justify-center">
            <Image
              src="https://placehold.co/1200x675.png"
              alt="Incidents Map Placeholder"
              width={1200}
              height={675}
              className="object-cover w-full h-full"
              data-ai-hint="map city"
            />
            {/* 
              When Google Maps API is available, this would be replaced with:
              <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
                <Map center={{ lat: 36.7753, lng: 3.0603 }} zoom={10} className="w-full h-full rounded-md">
                  {mockRequests.map(request => request.geo && (
                    <Marker key={request.id} position={request.geo.origin} />
                  ))}
                </Map>
              </APIProvider>
            */}
          </div>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Map visualization of all incidents. Cluster markers appear in high-volume zones.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
