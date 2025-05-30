"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function UnauthorizedRedirect() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/auth");
    }, 2000); // 2 seconds

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-lg text-muted-foreground">
        You are not logged in. Please{" "}
        <Link href="/auth" className="underline text-primary">
          login
        </Link>{" "}
        to continue.
      </p>
    </div>
  );
}
