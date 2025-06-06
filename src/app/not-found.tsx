import {Button} from "@/components/ui/button";
import {Home} from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 container mx-auto max-w-xl">
      {/* Content */}
      <div className="font-mono">
        Nothing to see here...{" "}
        <h1 className="text-6xl md:text-9xl font-bold text-gray-800 dark:text-white">
          404
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
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
