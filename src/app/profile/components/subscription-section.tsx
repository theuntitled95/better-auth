import { getActiveSubscription } from "@/actions/sub";
import CancelSubButton from "@/components/cancel-sub-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toProperCase } from "@/lib/utils";
import { CreditCard, Repeat } from "lucide-react";
import Link from "next/link";

export async function SubscriptionSection() {
  const data = await getActiveSubscription();
  const activeSub = data.subscription;

  const options: Intl.DateTimeFormatOptions = {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="my-4 border p-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold">
          <CreditCard /> Subscriptions
        </h2>
      </div>
      <p>
        {activeSub ? (
          <Card className="w-full max-w-md rounded-none bg-foreground/5">
            <CardHeader className="">
              <CardTitle className="text-2xl font-bold">
                {activeSub.plan.charAt(0).toUpperCase() +
                  activeSub.plan.slice(1)}{" "}
                Plan
              </CardTitle>
              <CardAction>
                <Badge
                  className={`rounded-full ${
                    activeSub.status === "active"
                      ? "bg-success/10 text-success"
                      : activeSub.status === "trialing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100/10 text-gray-800"
                  }`}
                >
                  {toProperCase(activeSub.status)}
                </Badge>
              </CardAction>
            </CardHeader>

            <CardContent>
              {/* <div className="mt-6 space-y-2 divide-y"> */}
              <div className="flex items-center justify-between p-2">
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

              <div className="flex items-center justify-between p-2">
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

              <div className="flex items-center justify-between p-2">
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
              {/* </div> */}
            </CardContent>
            <CardFooter className="flex-col gap-4">
              {activeSub.cancelAtPeriodEnd ? (
                <Alert className="bg-background" variant={"destructive"}>
                  <AlertDescription>
                    Your subscription will be cancelled on:{" "}
                    {activeSub.periodEnd?.toLocaleDateString("en-us", options)}
                  </AlertDescription>
                </Alert>
              ) : (
                <CancelSubButton
                  className={`${buttonVariants({
                    size: "lg",
                    variant: "outline",
                  })} w-full text-primary`}
                >
                  Cancel Subscription
                </CancelSubButton>
              )}
              <Link
                href={"/dashboard/billing/subscriptions"}
                className={`${buttonVariants({ variant: "default", size: "lg" })} w-full`}
              >
                <Repeat />
                Manage Subscriptions
              </Link>
            </CardFooter>
          </Card>
        ) : (
          <div className="flex w-full max-w-md flex-col items-center justify-center gap-3 border p-8 shadow-md">
            <p className="">You don&apos;t have an active subscription plan.</p>
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
  );
}
