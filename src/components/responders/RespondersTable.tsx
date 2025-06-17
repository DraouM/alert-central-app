"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Responder, ResponderStatus, ResponderRole } from "@/lib/types";
import { MoreHorizontal, UserPlus, UserMinus, Edit3, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface RespondersTableProps {
  responders: Responder[];
}

const statusColors: Record<ResponderStatus, string> = {
  online: "bg-green-500 text-green-50",
  busy: "bg-orange-500 text-orange-50",
  inactive: "bg-gray-400 text-gray-50",
};

const roleDisplay: Record<ResponderRole, string> = {
  dispatcher: "Dispatcher",
  supervisor: "Supervisor",
  field_agent: "Field Agent",
};

export function RespondersTable({ responders }: RespondersTableProps) {
  if (!responders || responders.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No responders found.</p>;
  }
  
  return (
    <div className="rounded-lg border shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">
              <Checkbox aria-label="Select all responders" />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Wilaya</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Assignment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {responders.map((responder) => (
            <TableRow key={responder.id} className="hover:bg-muted/50">
              <TableCell className="text-center">
                <Checkbox aria-label={`Select responder ${responder.name}`} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`https://placehold.co/80x80.png?text=${responder.name.charAt(0)}`} alt={responder.name} data-ai-hint="person avatar" />
                    <AvatarFallback>{responder.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{responder.name}</span>
                </div>
              </TableCell>
              <TableCell>{roleDisplay[responder.role]}</TableCell>
              <TableCell>
                <Badge variant="default" className={cn("capitalize", statusColors[responder.status])}>
                  {responder.status}
                </Badge>
              </TableCell>
              <TableCell>{responder.wilaya}</TableCell>
              <TableCell>{responder.serviceSection}</TableCell>
              <TableCell>
                {responder.currentAssignmentId ? (
                  <Badge variant="outline">{responder.currentAssignmentId}</Badge>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label={`Actions for responder ${responder.name}`}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <Edit3 className="h-4 w-4" /> Edit Responder
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <UserPlus className="h-4 w-4" /> Assign to Incident
                    </DropdownMenuItem>
                    {responder.currentAssignmentId && (
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        <UserMinus className="h-4 w-4" /> Unassign
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <MessageSquare className="h-4 w-4" /> Send Message
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
