import {auth} from "@/lib/auth";
import type {Metadata} from "next";
import {headers} from "next/headers";
import Link from "next/link";
import {redirect} from "next/navigation";

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
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen w-full  relative flex justify-center">
      <div className="bg-white dark:bg-black border-b py-3 flex justify-between items-center border-border absolute z-50 w-full lg:w-8/12 px-4 md:px-1">
        <Link href="/">
          <div className="flex gap-2 cursor-pointer">
            <svg
              width="60"
              height="45"
              viewBox="0 0 60 45"
              fill="none"
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 0H15V15H30V30H15V45H0V30V15V0ZM45 30V15H30V0H45H60V15V30V45H45H30V30H45Z"
                className="fill-black dark:fill-white"
              ></path>
            </svg>
            <p className="dark:text-white text-black">SAAS-AUTH.</p>
          </div>
        </Link>
      </div>
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 ">
        <div className="relative h-full w-full bg-red [&>div]:absolute [&>div]:h-full [&>div]:w-full [&>div]:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [&>div]:[background-size:16px_16px] [&>div]:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
          <div></div>
        </div>
      </div>

      <div className="mt-20 lg:w-7/12 w-full">
        <div className="w-full">
          <div className="flex items-center flex-col justify-center w-full md:py-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
