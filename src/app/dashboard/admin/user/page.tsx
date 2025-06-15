import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

function formatDate(dateInput: string | Date) {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  return date.toLocaleString();
}

export default async function UserDetailsPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const params = await searchParams;
  const userId = params.userId;

  if (!userId) {
    redirect("/dashboard/admin/users");
  }

  const user = await auth.api.listUsers({
    query: {
      filterField: "id",
      filterValue: userId,
    },
    headers: await headers(),
  });

  const organizations = await auth.api.listOrganizations({
    headers: await headers(),
    query: {
      filterField: "userId",
      filterValue: userId,
    },
  });

  if (!user) {
    redirect("/dashboard/admin/users");
  }

  if (!user.users.length) {
    redirect("/dashboard/admin/users");
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">User Details Page</h2>
      <div className="grid grid-cols-2 gap-4 py-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Name</Label>
          <p className="text-sm">{user.users[0].name}</p>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Email</Label>
          <p className="text-sm">{user.users[0].email}</p>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Role</Label>
          <p className="text-sm">{user.users[0].role}</p>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Created At</Label>
          <p className="text-sm">{formatDate(user.users[0].createdAt)}</p>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Updated At</Label>
          <p className="text-sm">{formatDate(user.users[0].updatedAt)}</p>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Email Verified</Label>
          <p className="text-sm">
            {user.users[0].emailVerified ? "Yes" : "No"}
          </p>
        </div>
      </div>
      <h2 className="text-2xl font-bold">Organizations</h2>
      <div>
        <pre>
          <code>{JSON.stringify(organizations, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
}
