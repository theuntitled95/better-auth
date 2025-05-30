"use client";

import {Button} from "@/components/ui/button";
import {signOut} from "@/lib/auth-client";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

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
          router.push("/auth");
        },
      },
    });
  }

  return (
    <Button onClick={handleClick} asChild>
      Log Out
    </Button>
  );
};
