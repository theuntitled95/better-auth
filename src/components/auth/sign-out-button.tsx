"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const SignOutButton = () => {
  const router = useRouter();

  async function handleClick() {
    await signOut({
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Signed out successfully");
          router.push("/login");
        },
      },
    });
  }

  return (
    <Button onClick={handleClick} variant={"destructive"} size={"lg"}>
      <LogOut />
      Log Out
    </Button>
  );
};
