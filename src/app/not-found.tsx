import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center p-4">
      {/* Content */}
      <div className="font-mono">
        Nothing to see here...{" "}
        <h1 className="text-6xl font-bold text-gray-800 md:text-9xl dark:text-white">
          404
        </h1>
        <p className="mt-4 mb-8 text-xl text-gray-600 md:text-2xl dark:text-gray-300">
          Oops! The page you&apos;re looking for either doesn&apos;t exist or is
          temporarily unavailable.
        </p>
        <div className="flex justify-end">
          <Button asChild className="rounded-none" size={"lg"}>
            <Link href="/" className="">
              <Home />
              Go to Homepage
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
