import { getActiveSubscription } from "@/actions/sub";
import CreateSubButton from "@/components/create-sub-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import UpdateSubButton from "@/components/update-sub-button";
import { plans } from "@/constants/plans";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Subscriptions",
  description: "Manage your subscriptions",
};

export default async function SubscriptionPage() {
  const data = await getActiveSubscription();
  const activeSub = data.subscription;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Subscription Plans</h1>
      <div className="grid-col-1 grid gap-4 md:grid-cols-3">
        {plans.map((plan) => {
          const planName =
            plan.name.charAt(0).toUpperCase() + plan.name.slice(1);
          const buttonText = activeSub ? "Switch to this plan" : "Subscribe";

          return (
            <div key={plan.name} className="border p-4">
              <h2 className="mb-2 text-xl font-semibold">{planName}</h2>
              <p className="mb-6 text-2xl font-bold">
                {plan.price}
                <span className="text-sm font-normal">/month</span>
              </p>
              <ul className="mb-6 space-y-2">
                {plan.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              {activeSub?.plan === plan.name ? (
                <>
                  {activeSub.cancelAtPeriodEnd ? (
                    <Alert variant={"destructive"}>
                      <AlertDescription>
                        Your subscription will be cancelled on:{" "}
                        {activeSub.periodEnd?.toLocaleDateString()}
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert variant={"default"}>
                      <AlertDescription>
                        You are subscribed to this plan
                      </AlertDescription>
                    </Alert>
                  )}
                </>
              ) : activeSub ? (
                <UpdateSubButton
                  buttonText={buttonText}
                  plan={plan}
                  subId={activeSub.stripeSubscriptionId as string}
                />
              ) : (
                <CreateSubButton buttonText={buttonText} plan={plan} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
