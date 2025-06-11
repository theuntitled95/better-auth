import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { ChevronRight, Command, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ScrollArea } from "./ui/scroll-area";

export default function OrganizationSelector() {
  const organizations = authClient.useListOrganizations();
  const activeOrg = authClient.useActiveOrganization();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleChangeOrg(orgId: string) {
    await authClient.organization.setActive({
      organizationId: orgId,
      fetchOptions: {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success(
            `Organization successfully updated to ${activeOrg.data?.name}`,
          );
          router.refresh();
        },
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <SidebarMenuButton size="lg" asChild>
          <Button
            asChild
            className="w-full bg-transparent text-primary select-none"
          >
            <div>
              {activeOrg.data?.logo ? (
                <Image
                  src={activeOrg.data?.logo || "/assets/user-profile.svg"}
                  alt={`${activeOrg.data?.name} Logo`}
                  width={24}
                  height={24}
                  className="rounded-full border bg-background object-cover"
                />
              ) : (
                <div className="flex aspect-square size-8 items-center justify-center rounded-[0.25rem] bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
              )}
              <div className="relative grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeOrg.data?.name}
                  <p className="truncate text-[10px] text-muted-foreground">
                    {activeOrg.data?.slug}
                  </p>
                </span>
                <Badge
                  className="absolute top-1/2 right-1 -translate-y-1/2 truncate rounded-full border-primary text-[10px]"
                  variant={"outline"}
                >
                  Current
                </Badge>
              </div>
            </div>
          </Button>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="bg-transparent backdrop-blur-2xl">
        <DialogHeader>
          <DialogTitle>Switch Organization</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Select an organization to switch to.
        </DialogDescription>
        <ScrollArea className="h-80 border">
          <div className="divide-y">
            {organizations.data?.map((org) => (
              <button
                type="button"
                key={org.id}
                className={`group flex w-full cursor-pointer items-center gap-2 p-1 text-left hover:bg-primary/10 focus:bg-primary/10 ${loading || (activeOrg.data?.id === org.id && "pointer-events-none cursor-wait opacity-50")}`}
                disabled={loading}
                onClick={() => handleChangeOrg(org.id)}
              >
                {org.logo ? (
                  <Image
                    src={org.logo}
                    alt={`${org.name} Logo`}
                    width={24}
                    height={24}
                    className="rounded-full border bg-background object-cover"
                  />
                ) : (
                  <div className="flex aspect-square size-8 items-center justify-center rounded-[0.25rem] bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                )}
                <div className="flex flex-col">
                  <div className="font-medium">{org.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {org.slug}
                  </div>
                </div>
                {activeOrg.data?.id === org.id ? (
                  <div className="ml-auto px-3">
                    <Badge
                      variant={"outline"}
                      className="rounded-full border-primary"
                    >
                      Current
                    </Badge>
                  </div>
                ) : (
                  <div className="ml-auto flex items-center gap-3 px-3">
                    {loading ? (
                      <p className="pointer-events-none flex gap-2 text-xs text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" /> Selecting
                        Organization
                      </p>
                    ) : (
                      <p className="pointer-events-none invisible -translate-x-2 text-xs text-muted-foreground opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 group-focus:visible group-focus:translate-x-0 group-focus:opacity-100">
                        Select Organization
                      </p>
                    )}
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2 group-focus:translate-x-2" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
