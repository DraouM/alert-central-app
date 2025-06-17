"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

interface ZoneEditorProps {
  zones: WilayaZone[];
}

export function ZoneEditor({ zones }: ZoneEditorProps) {
  if (!zones || zones.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No zones configured.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Wilaya Zone
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Wilaya Zone</DialogTitle>
              <DialogDescription>
                Configure a new Wilaya and its service sections.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="wilaya-name" className="text-right">
                  Wilaya Name
                </Label>
                <Input id="wilaya-name" defaultValue="New Wilaya" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sections" className="text-right">
                  Sections
                </Label>
                <Input id="sections" placeholder="e.g., Police Section A, Hospital Zone 1" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Configuration</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Wilaya Name</TableHead>
              <TableHead>Sections</TableHead>
              <TableHead>Service Boundaries</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {zones.map((zone) => (
              <TableRow key={zone.id}>
                <TableCell className="font-medium">{zone.name}</TableCell>
                <TableCell>{zone.sections.map(s => s.name).join(', ')}</TableCell>
                <TableCell className="truncate max-w-xs">{zone.serviceBoundaries}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label={`Edit zone ${zone.name}`}>
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                        <DialogTitle>Edit Zone: {zone.name}</DialogTitle>
                        <DialogDescription>
                            Update service sections and boundaries for {zone.name}.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        {/* Simplified form for brevity */}
                        <div>
                            <Label htmlFor={`edit-sections-${zone.id}`}>Sections</Label>
                            <Input id={`edit-sections-${zone.id}`} defaultValue={zone.sections.map(s => s.name).join(', ')} />
                        </div>
                        <div>
                            <Label htmlFor={`edit-boundaries-${zone.id}`}>Service Boundaries (Description)</Label>
                            <Input id={`edit-boundaries-${zone.id}`} defaultValue={zone.serviceBoundaries} />
                        </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" aria-label={`Delete zone ${zone.name}`}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-8 p-4 bg-card rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2"><Map className="h-5 w-5 text-primary"/> Authority-to-Section Map</h3>
        <div className="aspect-[16/9] w-full bg-muted rounded-md overflow-hidden flex items-center justify-center">
          <Image
            src="https://placehold.co/1200x675.png"
            alt="Authority-to-Section Map Placeholder"
            width={1200}
            height={675}
            className="object-cover w-full h-full"
            data-ai-hint="map zone boundaries"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Visual representation of service boundaries and section assignments per wilaya.
        </p>
      </div>
    </div>
  );
}
