
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger, SidebarRail } from "@/components/ui/sidebar";
import AppSidebarContent from "@/components/layout/AppSidebarContent";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";

export default function AuthenticatedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border shadow-md">
        <AppSidebarContent />
      </Sidebar>
      <SidebarRail />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:h-16 sm:px-6 md:hidden">
            <SidebarTrigger asChild>
                <Button size="icon" variant="outline" className="md:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SidebarTrigger>
            <h1 className="text-lg font-semibold">Alert Central</h1>
        </header>
        <main className="flex-1 p-4 sm:p-6 md:p-8 bg-background">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
