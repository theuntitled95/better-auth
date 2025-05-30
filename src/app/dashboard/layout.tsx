import {AppSidebar} from "@/components/app-sidebar";
import UnauthorizedRedirect from "@/components/auth/unauthorized-redirect";

import {Separator} from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {auth} from "@/lib/auth";
import type {Metadata} from "next";
import {headers} from "next/headers";
import NextTopLoader from "nextjs-toploader";
import {Breadcrumbs} from "./components/breadcrumbs";

export const metadata: Metadata = {
  title: "Dashboard | SAAS",
  description: "Dashboard page for SAAS application",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <UnauthorizedRedirect />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumbs />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <NextTopLoader easing="ease" zIndex={1000} showSpinner={false} />
          {children}
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
