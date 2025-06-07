import { SignOutButton } from "@/components/auth/sign-out-button";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { getSubscription } from "@/lib/utils";
import { CreditCard, LayoutDashboard, Wallet } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { OrganizationSection } from "./components/organization-section";

export const metadata: Metadata = {
  title: "Profile | SAAS",
  description: "Profile page for SAAS application",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("auth/login");

  const subscription = session?.user.id
    ? await getSubscription(session.user.id)
    : null;

  return (
    <div className="relative">
      <div className="container mx-auto my-16 flex min-h-svh max-w-7xl flex-col items-center justify-center">
        <div className="w-full max-w-[200ch] overflow-x-auto border p-4 shadow-sm backdrop-blur-[3px]">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Profile</h1>
            <div className="flex items-center justify-center gap-2">
              <Button asChild size={"lg"}>
                <Link href={"/dashboard"}>
                  <LayoutDashboard /> Go to Dashboard
                </Link>
              </Button>
              <SignOutButton />
            </div>
          </div>
          <hr className="border-2" />
          <OrganizationSection />
          <pre className="text-xs break-words whitespace-pre-wrap">
            <code>{JSON.stringify({ session }, null, 2)}</code>
          </pre>
          <div className="my-4 border p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold">
                <CreditCard /> Subscriptions
              </h2>
            </div>
            <p>
              {(subscription && subscription.status) || (
                <div className="">
                  <p className="mb-4">No subscriptions found</p>
                  <Button>
                    <Wallet />
                    Subscribe
                  </Button>
                </div>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
