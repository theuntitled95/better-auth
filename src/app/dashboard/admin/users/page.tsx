import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AdminUserManagement from "./components/user-table";

export default async function ManageUsersPage() {
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
