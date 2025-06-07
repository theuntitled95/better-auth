"use client";

import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const REDIRECT_DELAY = 20000; // 2 seconds in ms

export default function UnauthorizedRedirect() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(Math.ceil(REDIRECT_DELAY / 1000));

  useEffect(() => {
    // Countdown interval
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    // Redirect timeout
    const timeout = setTimeout(() => {
      router.push("/auth/login");
    }, REDIRECT_DELAY);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="container mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center p-4">
      <div className="text-center font-mono">
        <Lock
          className="mx-auto mb-4 text-gray-500 dark:text-gray-400"
          size={48}
        />
        <h1 className="text-5xl font-bold text-gray-800 md:text-7xl dark:text-white">
          Unauthorized
        </h1>
        <p className="mt-4 mb-8 text-xl text-gray-600 md:text-2xl dark:text-gray-300">
          You are not logged in or your session has expired.
          <br />
          Redirecting you to the login page in{" "}
          <span className="font-bold">{countdown}</span> second
          {countdown !== 1 && "s"}...
        </p>
        <div className="flex justify-end">
          <Button asChild className="rounded-none" size="lg">
            <Link href="/auth/login" className="">
              <Lock className="mr-2" />
              Go to Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
