"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type CancelSubButtonProps = {
  className?: string;
};

export default function CancelSubButton({ className }: CancelSubButtonProps) {
  async function handleSubCancellation() {
    try {
      await authClient.subscription.cancel({
        returnUrl: "/dashboard/billing/subscriptions",
        fetchOptions: {
          onError(ctx) {
            console.log(ctx);
            toast.error(ctx.error.message);
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Button onClick={handleSubCancellation} className={cn(className)}>
      Cancel Subscription
    </Button>
  );
}
