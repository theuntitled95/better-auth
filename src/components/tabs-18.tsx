"use client";

import SignIn from "@/components/auth/sign-in";
import SignUp from "@/components/auth/sign-up";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

export default function LoginTabs() {
  return (
    <Tabs defaultValue="signin" className="max-w-sm w-full gap-0">
      <TabsList className="w-full grid grid-cols-2 p-0 bg-transparent">
        <TabsTrigger
          value="signin"
          className="rounded-b-none border-border border-b-0 data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-transparent data-[state=active]:bg-secondary dark:data-[state=active]:bg-blue-500/20 data-[state=active]:backdrop-blur-[1px] rounded-none"
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          value="signup"
          className="rounded-b-none border-border border-b-0 data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-transparent data-[state=active]:bg-secondary dark:data-[state=active]:bg-blue-500/20 data-[state=active]:backdrop-blur-[1px] rounded-none"
        >
          Register
        </TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <SignIn />
      </TabsContent>
      <TabsContent value="signup">
        <SignUp />
      </TabsContent>
    </Tabs>
  );
}
