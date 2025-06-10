"use client";

import { Button } from "@/components/ui/button";
import { Plan } from "@/constants/plans";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export default function CreateSubButton({
  buttonText,
  plan,
  className,
}: {
  buttonText: string | React.ReactNode;
  plan: Plan;
  className?: string;
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
    <Button onClick={handleSubCreation} className={cn(className)}>
      {buttonText}
    </Button>
  );
}
