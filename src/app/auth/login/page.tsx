import SignIn from "@/components/auth/sign-in";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | SAAS",
  description: "Log in to your account to access our services.",
};

export default function LoginPage() {
  return (
    <div className="w-full">
      <SignIn />
    </div>
  );
}
