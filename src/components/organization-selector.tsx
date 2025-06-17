"use client";

import { ChevronRight, Command, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

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
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

/* -------------------------------------------------------------------------- */
/*                              Helper Components                             */
/* -------------------------------------------------------------------------- */

const OrgAvatar = ({ logo, alt }: { logo?: string | null; alt: string }) =>
  logo ? (
    <Image
      src={logo}
      alt={alt}
      width={24}
      height={24}
      className="rounded-full border bg-background object-cover"
    />
  ) : (
    <div className="flex aspect-square size-8 items-center justify-center rounded-[0.25rem] bg-sidebar-primary text-sidebar-primary-foreground">
      <Command className="size-4" />
    </div>
  );

interface OrgListItemProps {
  org: NonNullable<
    ReturnType<typeof authClient.useListOrganizations>["data"]
  >[number];
  isCurrent: boolean;
  loading: boolean;
  onSelect: (orgId: string, orgName: string) => void;
}

function OrgListItem({ org, isCurrent, loading, onSelect }: OrgListItemProps) {
  const disabled = isCurrent || loading;
  const base =
    "group flex w-full items-center gap-2 p-1 text-left hover:bg-primary/10 focus:bg-primary/10 cursor-pointer";

  return (
    <button
      type="button"
      disabled={disabled}
      className={`${base} ${
        disabled ? "pointer-events-none cursor-wait opacity-30 select-none" : ""
      }`}
      onClick={() => onSelect(org.id, org.name)}
    >
      <OrgAvatar logo={org.logo} alt={`${org.name} Logo`} />

      {/* name + slug */}
      <div className="flex flex-col">
        <span className="font-medium">{org.name}</span>
        <span className="text-xs text-muted-foreground">{org.slug}</span>
      </div>

      {/* right-hand side */}
      <div className="ms-auto flex items-center gap-3 px-3">
        {isCurrent ? (
          <Badge variant="outline" className="rounded-full border-primary">
            Current
          </Badge>
        ) : loading ? (
          <p className="flex gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Selecting…
          </p>
        ) : (
          <>
            <p className="invisible -translate-x-2 text-xs whitespace-nowrap text-muted-foreground opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 group-focus:visible group-focus:translate-x-0 group-focus:opacity-100">
              Select organization
            </p>
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2 group-focus:translate-x-2" />
          </>
        )}
      </div>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*                           Main Selector Component                          */
/* -------------------------------------------------------------------------- */

export default function OrganizationSelector() {
  const router = useRouter();
  const { data: orgs = [] } = authClient.useListOrganizations();
  const { data: activeOrg } = authClient.useActiveOrganization();

  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  /* -------- sort alphabetically once, then filter by query -------- */
  const filteredOrgs = useMemo(() => {
    const sorted = [...(orgs ?? [])].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
    );
    if (!query) return sorted;
    const q = query.toLowerCase();
    return sorted.filter((o) => o.name.toLowerCase().includes(q));
  }, [orgs, query]);

  /** Switch active org */
  const handleChangeOrg = useCallback(
    async (orgId: string, orgName: string) => {
      await authClient.organization.setActive({
        organizationId: orgId,
        fetchOptions: {
          onRequest: () => setLoading(true),
          onResponse: () => setLoading(false),
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            toast.success(`Active organization set to “${orgName}”.`);
            router.refresh();
          },
        },
      });
    },
    [router],
  );

  /* ------------------------------- UI ------------------------------- */

  if (!activeOrg)
    return (
      <div className="flex items-center justify-center border p-4 text-sm text-muted-foreground">
        <span>No Organizations Found</span>
      </div>
    );

  return (
    <Dialog>
      {/* ---------- sidebar trigger ---------- */}
      <DialogTrigger className="w-full">
        <SidebarMenuButton size="lg" asChild>
          <Button
            asChild
            className="w-full bg-transparent text-primary select-none"
          >
            <div>
              <OrgAvatar
                logo={activeOrg?.logo}
                alt={`${activeOrg?.name ?? "Organization"} Logo`}
              />

              <div className="relative grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeOrg?.name}</span>
                <span className="truncate text-[10px] text-muted-foreground">
                  {activeOrg?.slug}
                </span>
                <Badge
                  variant="outline"
                  className="absolute top-1/2 right-1 -translate-y-1/2 truncate rounded-full border-primary text-[10px]"
                >
                  Current
                </Badge>
              </div>
            </div>
          </Button>
        </SidebarMenuButton>
      </DialogTrigger>

      {/* ---------- pop-over ---------- */}
      <DialogContent className="bg-transparent backdrop-blur-2xl">
        <DialogHeader>
          <DialogTitle>Switch organization</DialogTitle>
          <DialogDescription>
            Search or pick an organization to switch to.
          </DialogDescription>
        </DialogHeader>

        {/* --- search box --- */}
        <div className="mb-2 flex items-center gap-2">
          <Input
            placeholder="Search organizations…"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape" && query) setQuery("");
            }}
            className="h-8"
          />
          {query && (
            <Button
              size="icon"
              variant="ghost"
              type="button"
              onClick={() => setQuery("")}
              className="h-8 w-8"
            >
              <X className="size-4" />
            </Button>
          )}
        </div>

        {/* --- list / loader --- */}
        {loading ? (
          <div className="grid h-80 place-items-center border">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <ScrollArea className="h-80 border">
            <div className="divide-y">
              {filteredOrgs.length ? (
                filteredOrgs.map((org) => (
                  <OrgListItem
                    key={org.id}
                    org={org}
                    isCurrent={org.id === activeOrg?.id}
                    loading={loading}
                    onSelect={handleChangeOrg}
                  />
                ))
              ) : (
                <p className="p-4 text-center text-sm text-muted-foreground">
                  No organizations found.
                </p>
              )}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
