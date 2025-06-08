import { getActiveSubscription } from "@/actions/sub";
import { SignOutButton } from "@/components/auth/sign-out-button";
import CancelSubButton from "@/components/cancel-sub-button";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { CreditCard, LayoutDashboard } from "lucide-react";
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

  const data = await getActiveSubscription();
  const activeSub = data.subscription;

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
              {activeSub ? (
                <div className="w-full max-w-md space-y-4 border p-8 shadow-lg transition-all hover:shadow-xl">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                      {activeSub.plan.charAt(0).toUpperCase() +
                        activeSub.plan.slice(1)}{" "}
                      Plan
                    </h2>
                    <Badge
                      className={`rounded-full ${
                        activeSub.status === "active"
                          ? "bg-green-100 text-green-800"
                          : activeSub.status === "trialing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {activeSub.status}
                    </Badge>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between p-3 shadow-sm">
                      <span className="flex items-center">
                        <svg
                          className="mr-2 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        Status
                      </span>
                      <span className="font-semibold capitalize">
                        {activeSub.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 shadow-sm">
                      <span className="flex items-center">
                        <svg
                          className="mr-2 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Auto-renew
                      </span>
                      <span className="font-semibold">
                        {activeSub.cancelAtPeriodEnd ? "No" : "Yes"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 shadow-sm">
                      <span className="flex items-center">
                        <svg
                          className="mr-2 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Tokens
                      </span>
                      <span className="font-semibold">
                        {/* TODO: Extend Subscription type of better-auth to include this limits field. */}
                        {activeSub.limits?.tokens || "N/A"} per month
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 shadow-sm">
                      <span className="flex items-center">
                        <svg
                          className="mr-2 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                        Seats
                      </span>
                      <span className="font-semibold">{activeSub.seats}</span>
                    </div>
                  </div>

                  {activeSub.cancelAtPeriodEnd ? (
                    <p className="text-xs text-red-400">
                      Your subscription will be cancelled on:{" "}
                      {activeSub.periodEnd?.toLocaleDateString()}
                    </p>
                  ) : (
                    <CancelSubButton />
                    // <Link
                    //   href="/dashboard/billing/subscriptions"
                    //   className={buttonVariants({ variant: "default" })}
                    // >
                    //   Manage Subscription
                    // </Link>
                  )}
                </div>
              ) : (
                <div className="flex w-full max-w-md flex-col items-center justify-center gap-3 border p-8 shadow-md">
                  <p className="">
                    You don&apos;t have an active subscription plan.
                  </p>
                  <Link
                    href="/dashboard/billing/subscriptions"
                    className={buttonVariants({ variant: "default" })}
                  >
                    View Plans
                  </Link>
                </div>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
