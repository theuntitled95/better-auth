import {prisma} from "@/lib/prisma";
import {betterAuth} from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    async sendResetPassword(data, request) {
      // Send an email to the user with a link to reset their password
    },
  },
});
