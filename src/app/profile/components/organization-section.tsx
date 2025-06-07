"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toProperCase } from "@/lib/utils";
import { Building2, ChevronRight, Loader2, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function OrganizationSection() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orgs, setOrgs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/organizations/memberships")
      .then((res) => res.json())
      .then((data) => {
        if (mounted) {
          setOrgs(data || []);
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = orgs.filter((org) =>
    org.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="my-4 border p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Building2 /> Organizations
          </h2>
        </div>
        <div className="flex h-50 items-center justify-center">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" /> Loading
            organizations...
          </div>
        </div>
      </div>
    );
  }

  if (!orgs.length) {
    return (
      <div className="my-4 flex flex-col items-center border p-4">
        <span className="mb-2">You are not part of any organization.</span>
        <Button asChild>
          <Link href="/dashboard/organizations/create" className="">
            <Plus />
            Create Organization
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="my-4 border p-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Building2 /> Organizations
        </h2>
        <input
          type="text"
          placeholder="Search organizations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-sm border px-2 py-1"
        />
      </div>
      <ScrollArea className="h-50">
        <ul className="divide-y">
          {filtered.map((org) => (
            <li
              key={org.id}
              className="first-of-type:border-t last-of-type:border-b"
            >
              <Link
                href={`/dashboard/organizations/${org.slug}`}
                className="group flex items-center justify-between p-2 outline-none hover:bg-foreground/10 focus:bg-foreground/10"
              >
                <div className="flex items-center gap-4">
                  {/* Org Logo */}

                  <Image
                    src={org.logo || "/assets/user-profile.svg"}
                    alt={`${org.name} Logo`}
                    width={24}
                    height={24}
                    className="rounded-full border bg-background object-cover"
                  />
                  {/* <img src={org.logo} alt={`${org.name} Logo`} className="w-6 h-6 rounded-full border bg-background object-cover" /> */}

                  <span className="group-hover:underline group-focus:underline">
                    {org.name}
                  </span>
                  <Badge className="rounded-full">
                    {toProperCase(
                      org.member?.role ||
                        org.membership?.role ||
                        org.role ||
                        "",
                    )}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <p className="pointer-events-none invisible -translate-x-2 text-xs text-muted-foreground opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 group-focus:visible group-focus:translate-x-0 group-focus:opacity-100">
                    Go to Organization
                  </p>
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2 group-focus:translate-x-2" />
                </div>
              </Link>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="text-sm text-gray-500">No organizations found.</li>
          )}
        </ul>
      </ScrollArea>
    </div>
  );
}
