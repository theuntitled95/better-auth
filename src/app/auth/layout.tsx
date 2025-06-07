import HeaderMinimal from "@/components/header-minimal";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Auth | SAAS",
  description: "Authentication page for SAAS application",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/profile");
  }
  return (
    <div className="relative flex min-h-screen w-full justify-center">
      <HeaderMinimal />
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 -z-10 ">
        <div className="relative h-full w-full bg-red [&>div]:absolute [&>div]:h-full [&>div]:w-full [&>div]:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [&>div]:[background-size:16px_16px] [&>div]:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:opacity-30">
          <div></div>
        </div>
      </div> */}

      <div className="mt-20 w-full lg:w-7/12">
        <div className="w-full">
          <div className="flex w-full flex-col items-center justify-center md:py-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
