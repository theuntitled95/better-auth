import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminUserManagement from "./components/user-table";

export default async function ManageUsersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  if (session?.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const users = await auth.api.listUsers({
    query: {},
    headers: await headers(),
  });
  return (
    <div>
      <AdminUserManagement userData={users.users} />
    </div>
  );
}
