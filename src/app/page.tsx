import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <div className="max-w-3xl text-center">
          <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-slate-900">
            Your Next Great
            <span className="text-sky-900">Project</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-700">
            Build modern and beautiful websites with this collection of stunning
            background patterns. Perfect for landing pages, apps, and
            dashboards.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="" asChild>
              <Link href="/auth">Get Started</Link>
            </Button>
            <Button variant={"outline"} asChild>
              <Link href="/learn-more">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
