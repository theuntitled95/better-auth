import { cn } from "@/lib/utils";

interface BgPatternProps {
  className?: string;
}

export default function BgPattern({ className }: BgPatternProps) {
  return (
    <div className={cn("fixed inset-0 -z-10", className)}>
      <div className="bg-red relative h-full w-full dark:opacity-30 [&>div]:absolute [&>div]:h-full [&>div]:w-full [&>div]:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [&>div]:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] [&>div]:[background-size:16px_16px]">
        <div></div>
      </div>
    </div>
  );
}
