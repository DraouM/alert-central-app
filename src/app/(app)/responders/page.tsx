import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RespondersTable } from "@/components/responders/RespondersTable";
import { mockResponders } from "@/lib/mockData";
import { UserPlus, Search } from "lucide-react";

export default function ResponderManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Responder Management</h1>
          <p className="text-muted-foreground">Manage field agents and their assignments.</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add New Responder
        </Button>
      </div>

      <div className="p-4 bg-card rounded-lg shadow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
          <div>
            <Label htmlFor="status-filter" className="text-sm font-medium">Status</Label>
            <Select>
              <SelectTrigger id="status-filter" aria-label="Filter by status">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="role-filter" className="text-sm font-medium">Role</Label>
            <Select>
              <SelectTrigger id="role-filter" aria-label="Filter by role">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="dispatcher">Dispatcher</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
                <SelectItem value="field_agent">Field Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2 grid grid-cols-3 gap-2">
             <Input 
                type="search" 
                placeholder="Search responders..." 
                className="col-span-2"
                aria-label="Search responders"
              />
            <Button variant="outline" aria-label="Search responders">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <RespondersTable responders={mockResponders} />
    </div>
  );
}
