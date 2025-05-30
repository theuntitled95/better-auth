import LoginTabs from "@/components/tabs-18";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Auth | SAAS",
  description: "Authentication page for SAAS application",
};

export default function AuthPage() {
  return <LoginTabs />;
}
