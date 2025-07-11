"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { WilayaZone } from "@/lib/types";
import { Edit3, PlusCircle, Trash2, Map } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ZoneEditorProps {
  zones: WilayaZone[];
}

export function ZoneEditor({ zones }: ZoneEditorProps) {
  if (!zones || zones.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No zones configured.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {zones.map((zone) => (
        <Card key={zone.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <Map className="h-5 w-5 text-primary"/>
                {zone.name}
              </span>
              <div className="flex items-center gap-1">
                 <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label={`Edit zone ${zone.name}`}>
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Zone: {zone.name}</DialogTitle>
                           <DialogDescription>
                            Update service sections and boundaries for {zone.name}.
                          </DialogDescription>
                        </DialogHeader>
                        {/* More detailed form can be added here */}
                        <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" aria-label={`Delete zone ${zone.name}`}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
              </div>
            </CardTitle>
             <CardDescription>
              {zone.serviceBoundaries}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <div className="aspect-video w-full bg-muted rounded-md overflow-hidden flex items-center justify-center mb-4">
              <Image
                src={`https://placehold.co/600x400.png?text=${zone.name.replace(' ', '+')}`}
                alt={`${zone.name} Map Boundary`}
                width={600}
                height={400}
                className="object-cover w-full h-full"
                data-ai-hint="map zone"
              />
            </div>
            <Separator className="my-4" />
            <div className="flex-grow">
              <h4 className="font-semibold mb-2">Service Sections</h4>
              <div className="flex flex-wrap gap-2">
                {zone.sections.map((section) => (
                  <Badge key={section.id} variant="secondary">{section.name}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
