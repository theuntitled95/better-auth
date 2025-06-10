"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function CreateOrganizationForm() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [logo, setLogo] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, ""),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Organization name is required.");
      return;
    }
    setLoading(true);

    const res = await authClient.organization.create({
      name,
      slug: slug || "",
      logo: logo || "",
      metadata: description ? { description } : undefined,
      fetchOptions: {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onSuccess: () => {
          toast.success("Organization created!");
          console.log(
            "Organization created! you are about to be redirected to: ",
            `/dashboard/organizations/${res.data?.slug}`,
          );
          router.push(`/dashboard/organizations/${res.data?.slug}`);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="org-name">
          Organization Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="org-name"
          placeholder="Acme Inc"
          value={name}
          onChange={handleNameChange}
          disabled={loading}
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="org-slug">
          Slug
        </label>
        <Input
          id="org-slug"
          placeholder="acme-inc"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="org-logo">
          Logo URL
        </label>
        <Input
          id="org-logo"
          placeholder="https://example.com/logo.png"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <label
          className="mb-1 block text-sm font-medium"
          htmlFor="org-description"
        >
          Description
        </label>
        <Input
          id="org-description"
          placeholder="What does your organization do?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating..." : "Create Organization"}
      </Button>
    </form>
  );
}
