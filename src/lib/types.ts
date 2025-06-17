import type { LucideIcon } from 'lucide-react';

export type RequestStatus = "new" | "in-progress" | "closed";
export type IncidentType = "fire" | "medical" | "crime" | "traffic" | "other";
export type Priority = "low" | "medium" | "high" | "critical";

export interface EmergencyRequest {
  id: string;
  timestamp: Date;
  location: string; 
  zone: string;
  type: IncidentType;
  priority: Priority;
  status: RequestStatus;
  user: {
    name: string;
    nationalId: string;
  };
  shortDescription: string;
  details?: string;
  voiceMessageUrl?: string;
  imageUrls?: string[];
  assignedResponderIds?: string[];
  geo?: {
    origin: { lat: number; lon: number };
    destination?: { lat: number; lon: number };
  }
}

export type ResponderStatus = "online" | "busy" | "inactive";
export type ResponderRole = "dispatcher" | "supervisor" | "field_agent";

export interface Responder {
  id: string;
  name: string;
  role: ResponderRole;
  status: ResponderStatus;
  currentAssignmentId?: string; 
  wilaya: string;
  serviceSection: string; // e.g. Police, Hospital
}

export interface WilayaZone {
  id: string;
  name: string; 
  sections: { id: string; name: string; service: string }[]; 
  serviceBoundaries: string; 
}

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
  variant?: "default" | "ghost";
}

export interface AnalyticsData {
  incidentsByWilaya: { name: string; total: number }[];
  incidentsByService: { name: string; total: number }[];
  incidentsByMonth: { name: string; total: number }[];
  avgResponseTime: { month: string; time: number }[]; // time in minutes
}
