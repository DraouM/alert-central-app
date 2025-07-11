import { mockRequests, mockResponders } from "@/lib/mockData";
import type { EmergencyRequest, Responder } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {notFound} from "next/navigation";
import Image from "next/image";
import { User, MapPin, AlertTriangle, CalendarDays, Phone, MessageSquare, Image as ImageIcon, PlayCircle, Users, Map as MapIcon, Route } from "lucide-react";
import { format } from 'date-fns';

interface RequestDetailsPageProps {
  params: { id: string };
}

// Helper to get priority color - this should ideally be in a shared util or part of the Badge component variant
const priorityBadgeClass = (priority: EmergencyRequest['priority']) => {
  switch (priority) {
    case 'critical': return 'bg-purple-600 hover:bg-purple-700 text-primary-foreground';
    case 'high': return 'bg-red-600 hover:bg-red-700 text-primary-foreground';
    case 'medium': return 'bg-orange-500 hover:bg-orange-600 text-primary-foreground';
    case 'low': return 'bg-yellow-500 hover:bg-yellow-600 text-primary-foreground';
    default: return 'bg-gray-500 hover:bg-gray-600 text-primary-foreground';
  }
};

export default function RequestDetailsPage({ params }: RequestDetailsPageProps) {
  const request = mockRequests.find(r => r.id === params.id);

  if (!request) {
    notFound();
  }

  const assignedResponders: Responder[] = request.assignedResponderIds
    ? mockResponders.filter(responder => request.assignedResponderIds!.includes(responder.id))
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Request Details: {request.id}</h1>
          <p className="text-muted-foreground">Detailed information about the emergency alert.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">Assign Responder</Button>
            <Button>Mark as Resolved</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column / Main Info */}
        <div className="md:col-span-2 space-y-6">
          <Card>
             <CardHeader>
              <CardTitle className="flex items-center gap-2">
                 <MapIcon className="h-6 w-6 text-primary" /> Incident Location & Route
              </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="aspect-[16/9] w-full bg-muted rounded-md overflow-hidden flex items-center justify-center mb-2">
                    <Image src="https://placehold.co/800x450.png" alt="Incident location map" width={800} height={450} className="object-cover w-full h-full" data-ai-hint="map route" />
                </div>
                <p className="text-sm text-muted-foreground text-center">Map showing incident location and responder route.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6 text-primary" />
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center">
                <p className="w-32 font-medium text-muted-foreground">Name:</p>
                <p>{request.user.name}</p>
              </div>
              <div className="flex items-center">
                <p className="w-32 font-medium text-muted-foreground">National ID:</p>
                <p>{request.user.nationalId}</p>
              </div>
              <div className="flex items-center">
                <p className="w-32 font-medium text-muted-foreground">Contact:</p>
                <Button variant="link" className="p-0 h-auto">
                  <Phone className="mr-2 h-4 w-4" /> Call User (Placeholder)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary"/>
                    Responding Team
                </CardTitle>
            </CardHeader>
            <CardContent>
                {assignedResponders.length > 0 ? (
                    <ul className="space-y-3">
                        {assignedResponders.map(responder => (
                            <li key={responder.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={`https://placehold.co/40x40.png?text=${responder.name.substring(0,1)}`} data-ai-hint="person avatar"/>
                                        <AvatarFallback>{responder.name.substring(0,2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{responder.name}</p>
                                        <p className="text-xs text-muted-foreground capitalize">{responder.role.replace('_', ' ')} - {responder.serviceSection}</p>
                                    </div>
                                </div>
                                <Badge variant={responder.status === 'online' ? 'default' : responder.status === 'busy' ? 'destructive' : 'secondary'} className={responder.status === 'online' ? 'bg-green-500 text-white' : ''}>
                                    {responder.status}
                                </Badge>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted-foreground">No responders assigned yet.</p>
                )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column / Incident Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                 <AlertTriangle className="h-6 w-6 text-primary" /> Incident Summary
              </CardTitle>
              <CardDescription>
                Status: <Badge variant={request.status === 'closed' ? 'default' : request.status === 'in-progress' ? 'outline' : 'secondary'} className={request.status === 'closed' ? 'bg-green-600 text-primary-foreground' : request.status === 'in-progress' ? 'border-yellow-500 text-yellow-600' : 'bg-blue-500 text-primary-foreground'}>{request.status.replace('-', ' ')}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start">
                <CalendarDays className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Reported:</p>
                  <p>{format(new Date(request.timestamp), "PPPp")}</p>
                </div>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Type:</p>
                  <p className="capitalize">{request.type}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Location:</p>
                  <p>{request.location} ({request.zone})</p>
                  {request.geo && <p className="text-xs text-muted-foreground">Lat: {request.geo.origin.lat.toFixed(4)}, Lon: {request.geo.origin.lon.toFixed(4)}</p>}
                </div>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                    <p className="font-medium">Priority:</p>
                    <Badge className={priorityBadgeClass(request.priority)}>{request.priority}</Badge>
                </div>
              </div>
              <Separator />
              <div className="flex items-start">
                <MessageSquare className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                    <p className="font-medium">Description:</p>
                    <p className="text-muted-foreground">{request.details || request.shortDescription || "No detailed description provided."}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-6 w-6 text-primary" />
                Uploaded Media
              </CardTitle>
            </CardHeader>
            <CardContent>
              {request.voiceMessageUrl && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2 text-lg">Voice Message</h3>
                  <Button variant="outline">
                    <PlayCircle className="mr-2 h-5 w-5" /> Play Voice Message
                  </Button>
                </div>
              )}
              {request.imageUrls && request.imageUrls.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 text-lg">Images</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {request.imageUrls.map((url, index) => (
                      <div key={index} className="aspect-square relative rounded-md overflow-hidden border">
                        <Image src={url} alt={`Incident image ${index + 1}`} fill objectFit="cover" data-ai-hint="accident photo"/>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {!request.voiceMessageUrl && (!request.imageUrls || request.imageUrls.length === 0) && (
                <p className="text-muted-foreground">No media uploaded for this request.</p>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
