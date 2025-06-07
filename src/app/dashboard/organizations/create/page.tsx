import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { CreateOrganizationForm } from "./create-organization-form";

export const metadata: Metadata = {
  title: "Create Organization | SAAS",
  description: "Create a new organization for your team.",
};

export default function CreateOrganizationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Organization</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateOrganizationForm />
        </CardContent>
      </Card>
    </div>
  );
}
