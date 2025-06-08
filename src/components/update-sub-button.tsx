"use client";
import { updateExistingSubscription } from "@/actions/sub";
import { Button } from "@/components/ui/button";
import { Plan } from "@/constants/plans";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function UpdateSubscription({
  buttonText,
  plan,
  subId,
}: {
  buttonText: string;
  plan: Plan;
  subId: string;
}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSubUpdate = async () => {
    try {
      setIsPending(true);
      const result = await updateExistingSubscription(subId, plan.priceId);
      console.log({ result });
      if (result.status) {
        toast.success(result.message || "Subscription updated successfully");
        setTimeout(() => {
          router.refresh();
        }, 3000);
      } else {
        toast.error(result.message || "Failed to update subscription");
      }
    } catch (err) {
      console.log(err);
      toast.error("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Button disabled={isPending} onClick={handleSubUpdate}>
      {buttonText}
    </Button>
  );
}
