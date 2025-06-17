"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/icons/Logo";
import { NAV_ITEMS, APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { LogOut, Settings, ChevronsLeft, ChevronsRight } from "lucide-react";

export default function AppSidebarContent() {
  const pathname = usePathname();
  const { state, toggleSidebar, isMobile } = useSidebar();

  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 group/logo">
            <Logo className="h-8 w-8 text-primary" />
            {state === "expanded" && (
              <h1 className="text-xl font-semibold text-sidebar-foreground">
                {APP_NAME}
              </h1>
            )}
          </Link>
          {state === "expanded" && !isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent">
              <ChevronsLeft className="h-5 w-5" />
            </Button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarMenu>
          {NAV_ITEMS.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  variant={item.variant}
                  isActive={pathname.startsWith(item.href)}
                  className={cn(
                    "w-full justify-start",
                     state === 'collapsed' && "justify-center"
                  )}
                  tooltip={state === 'collapsed' ? item.title : undefined}
                >
                  <item.icon className="h-5 w-5" />
                  {state === "expanded" && <span className="truncate">{item.title}</span>}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="p-4 mt-auto">
        {state === "expanded" ? (
          <>
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="man avatar" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">Admin User</p>
                <p className="text-xs text-sidebar-foreground/70">admin@authority.dz</p>
              </div>
            </div>
            <Button variant="ghost" className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <Settings className="h-5 w-5" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </>
        ) : (
          <>
            <SidebarMenuButton variant="ghost" className="justify-center" tooltip="Settings">
              <Settings className="h-5 w-5" />
            </SidebarMenuButton>
            <SidebarMenuButton variant="ghost" className="justify-center" tooltip="Logout">
              <LogOut className="h-5 w-5" />
            </SidebarMenuButton>
             {!isMobile && (
                <SidebarMenuButton variant="ghost" onClick={toggleSidebar} className="justify-center" tooltip="Expand Sidebar">
                    <ChevronsRight className="h-5 w-5" />
                </SidebarMenuButton>
             )}
          </>
        )}
      </SidebarFooter>
    </>
  );
}
