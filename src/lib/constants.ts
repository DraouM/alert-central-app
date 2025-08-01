import type { NavItem } from "./types";
import { LayoutDashboard, Map, Users, BarChart2, Network, FileText, Settings } from "lucide-react";

export const APP_NAME = "Alert Central";

export const ALL_NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    variant: "default",
    roles: ["admin", "supervisor", "dispatcher"],
  },
  {
    title: "Map View",
    href: "/map-view",
    icon: Map,
    variant: "ghost",
    roles: ["admin", "supervisor", "dispatcher"],
  },
  {
    title: "Responders",
    href: "/responders",
    icon: Users,
    variant: "ghost",
    roles: ["admin", "supervisor"],
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart2,
    variant: "ghost",
    roles: ["admin", "supervisor"],
  },
  {
    title: "Zone Config",
    href: "/zones",
    icon: Network,
    variant: "ghost",
    roles: ["admin"],
  },
];

// Placeholder for a dynamic request, not for direct navigation
export const REQUEST_DETAILS_NAV_ITEM: NavItem = {
    title: "Request Details",
    href: "/requests", // Base path, actual ID will be appended
    icon: FileText,
    variant: "ghost",
    roles: ["admin", "supervisor", "dispatcher"],
};
