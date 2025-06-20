"use client";

import {
  CreditCard,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  ShieldUser,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
// import { NavSecondary } from "@/components/nav-secondary";
// import { NavAdmin } from "@/components/nav-admin";
import { NavUser } from "@/components/nav-user";
import OrganizationSelector from "@/components/organization-selector";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// import { useSession } from "@/lib/auth-client";

const data = {
  navMain: [
    {
      title: "Billing",
      url: "#",
      icon: CreditCard,
      isActive: true,
      items: [
        {
          title: "Subscriptions",
          url: "/dashboard/billing/subscriptions",
        },
      ],
    },
  ],
  adminNav: [
    {
      title: "Admin",
      icon: ShieldUser,
      url: "#",
      isActive: true,
      items: [
        {
          title: "Users",
          url: "/dashboard/admin/users",
        },
        {
          title: "Organizations",
          url: "/dashboard/admin/organizations",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const session = useSession();
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <OrganizationSelector />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* {session.data?.user.role === "ADMIN" && (
          <NavAdmin items={data.adminNav} className="mt-4" />
        )} */}
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
