import { getActiveSubscription } from "@/actions/sub";
import BgPattern from "@/components/bg-pattern";
import CancelSubButton from "@/components/cancel-sub-button";
import CreateSubButton from "@/components/create-sub-button";
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
import UpdateSubButton from "@/components/update-sub-button";
import { plans } from "@/constants/plans";
import { auth } from "@/lib/auth";
import { toProperCase } from "@/lib/utils";
import { ArrowLeftRight } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Manage Subscriptions",
  description: "Manage your subscriptions",
};

export default async function SubscriptionPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const data = await getActiveSubscription();
  const activeSub = data.subscription;

  const options: Intl.DateTimeFormatOptions = {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Subscription Plans</h1>
      <div className="grid-col-1 grid w-fit gap-4 md:grid-cols-3">
        {plans.map((plan) => {
          const planName =
            plan.name.charAt(0).toUpperCase() + plan.name.slice(1);
          const buttonText = activeSub ? (
            <>
              <ArrowLeftRight /> Switch to {toProperCase(plan.name)}
            </>
          ) : (
            "Subscribe"
          );

          return (
            <Card
              key={plan.name}
              className={`relative isolate max-w-md rounded-none border-2 bg-transparent ${plan.popular && !(activeSub?.plan === plan.name) ? "border-primary" : ""}`}
            >
              {plan.popular && !(activeSub?.plan === plan.name) ? (
                <Badge className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full">
                  Most Popular
                </Badge>
              ) : (
                <></>
              )}
              <BgPattern className="absolute" />
              <CardHeader className="">
                <CardTitle>
                  <h2 className="text-xl font-semibold">{planName}</h2>
                </CardTitle>
                <CardAction className="col-start-1 row-start-2 justify-self-start">
                  <p className="text-4xl font-bold">
                    {plan.price}
                    <span className="text-sm font-normal">/month</span>
                  </p>
                </CardAction>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto flex flex-col gap-4">
                {activeSub?.plan === plan.name ? (
                  <>
                    {activeSub.cancelAtPeriodEnd ? (
                      <Alert variant={"destructive"}>
                        <AlertDescription>
                          Your subscription will be cancelled on:{" "}
                          {activeSub.periodEnd?.toLocaleDateString(
                            "en-us",
                            options,
                          )}
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <div className="flex w-full flex-col gap-4">
                        <Alert variant={"default"}>
                          <AlertDescription>
                            You are subscribed to this plan
                          </AlertDescription>
                        </Alert>
                        <CancelSubButton
                          className={`${buttonVariants({
                            size: "lg",
                            variant: "outline",
                          })} text-primary`}
                        >
                          Cancel Subscription
                        </CancelSubButton>
                      </div>
                    )}
                  </>
                ) : activeSub ? (
                  <UpdateSubButton
                    buttonText={buttonText}
                    plan={plan}
                    subId={activeSub.stripeSubscriptionId as string}
                    className={`${buttonVariants({ size: "lg" })} w-full`}
                  />
                ) : (
                  <CreateSubButton
                    buttonText={buttonText}
                    plan={plan}
                    className={`${buttonVariants({ size: "lg" })} w-full`}
                  />
                )}

                {session?.user.trialAllowed && (
                  <p className="text-xs text-muted-foreground">
                    Includes {plan.trialDays}-days trial
                  </p>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
