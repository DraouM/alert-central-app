"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FilterX } from "lucide-react";

export function MapFilters() {
  return (
    <div className="p-4 bg-card rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
        <div>
          <Label htmlFor="service-filter" className="text-sm font-medium">Service</Label>
          <Select>
            <SelectTrigger id="service-filter" aria-label="Filter by service">
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="police">Police</SelectItem>
              <SelectItem value="hospital">Hospital</SelectItem>
              <SelectItem value="civil_protection">Civil Protection</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="priority-filter" className="text-sm font-medium">Priority</Label>
          <Select>
            <SelectTrigger id="priority-filter" aria-label="Filter by priority">
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="wilaya-filter" className="text-sm font-medium">Wilaya</Label>
          <Select>
            <SelectTrigger id="wilaya-filter" aria-label="Filter by wilaya">
              <SelectValue placeholder="All Wilayas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Wilayas</SelectItem>
              <SelectItem value="algiers">Algiers</SelectItem>
              <SelectItem value="oran">Oran</SelectItem>
              <SelectItem value="constantine">Constantine</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
            <Button variant="outline">Apply Filters</Button>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="ghost" size="sm">
          <FilterX className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
