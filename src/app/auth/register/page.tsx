import SignUp from "@/components/auth/sign-up2";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | SAAS",
  description: "Create a new account to access our services.",
};

export default function RegisterPage() {
  return <SignUp />;
}
