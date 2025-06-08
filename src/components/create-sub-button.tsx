"use client";

import { Button } from "@/components/ui/button";
import { Plan } from "@/constants/plans";
import { authClient } from "@/lib/auth-client";

export default function CreateSubButton({
  buttonText,
  plan,
}: {
  buttonText: string;
  plan: Plan;
}) {
  const handleSubCreation = async () => {
    try {
      const { error } = await authClient.subscription.upgrade({
        plan: plan.name,
        successUrl: "/profile",
        cancelUrl: "/dashboard/billing/subscriptions",
      });
      if (error) {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Button onClick={handleSubCreation} className="w-full">
      {buttonText}
    </Button>
  );
}
