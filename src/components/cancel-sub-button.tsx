"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function CancelSubButton() {
  async function handleSubCancellation() {
    try {
      await authClient.subscription.cancel({
        returnUrl: "/dashboard/billing/subscriptions",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Button onClick={handleSubCancellation} className="w-full">
      Cancel Subscription
    </Button>
  );
}
