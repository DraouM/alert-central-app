"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { EmergencyRequest, Priority, RequestStatus } from "@/lib/types";
import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontal, Eye, CheckCircle, Loader2, AlertTriangle, ShieldAlert, ShieldCheck, ShieldClose, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface RequestsTableProps {
  requests: EmergencyRequest[];
}

const priorityIcons: Record<Priority, React.ElementType> = {
  low: AlertTriangle,
  medium: AlertTriangle,
  high: ShieldAlert,
  critical: ShieldAlert,
};

const priorityColors: Record<Priority, string> = {
  low: "bg-yellow-500 hover:bg-yellow-600",
  medium: "bg-orange-500 hover:bg-orange-600",
  high: "bg-red-500 hover:bg-red-600",
  critical: "bg-purple-600 hover:bg-purple-700",
};

const statusIcons: Record<RequestStatus, React.ElementType> = {
  new: AlertTriangle,
  "in-progress": Loader2,
  closed: CheckCircle,
};

const statusColors: Record<RequestStatus, string> = {
  new: "text-blue-500",
  "in-progress": "text-yellow-500 animate-spin",
  closed: "text-green-500",
};


export function RequestsTable({ requests }: RequestsTableProps) {
  if (!requests || requests.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No incoming requests at the moment.</p>;
  }

  return (
    <div className="rounded-lg border shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => {
            const PriorityIcon = priorityIcons[request.priority];
            const StatusIcon = statusIcons[request.status];
            return (
              <TableRow key={request.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {formatDistanceToNow(new Date(request.timestamp), { addSuffix: true })}
                  </div>
                </TableCell>
                <TableCell>{request.location}</TableCell>
                <TableCell className="capitalize">{request.type}</TableCell>
                <TableCell>
                  <Badge variant="default" className={cn("capitalize text-primary-foreground", priorityColors[request.priority])}>
                    <PriorityIcon className="h-3.5 w-3.5 mr-1.5" />
                    {request.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                   <Badge variant="outline" className={cn("capitalize", statusColors[request.status])}>
                    <StatusIcon className={cn("h-3.5 w-3.5 mr-1.5", request.status === "in-progress" && "animate-spin")} />
                    {request.status.replace('-', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label={`Actions for request ${request.id}`}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/requests/${request.id}`} className="flex items-center gap-2 cursor-pointer">
                          <Eye className="h-4 w-4" /> View Details
                        </Link>
                      </DropdownMenuItem>
                       <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        {request.status === "closed" ? <ShieldClose className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                        {request.status === "closed" ? "Reopen Request" : "Mark as Closed"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
