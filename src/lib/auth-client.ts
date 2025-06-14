import { auth } from "@/lib/auth";
import { ac, roles } from "@/lib/permissions";
import { stripeClient } from "@better-auth/stripe/client";
import {
  adminClient,
  inferAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  plugins: [
    adminClient({ ac, roles }),
    organizationClient(),
    stripeClient({
      subscription: true, //if you want to enable subscription management
    }),
    inferAdditionalFields<typeof auth>(),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
