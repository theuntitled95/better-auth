import {prisma} from "@/lib/prisma";
import {normalizeName} from "@/lib/utils";
import {betterAuth} from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";
import {createAuthMiddleware} from "better-auth/api";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false,
    requireEmailVerification: true,
    async sendResetPassword(data, request) {
      // Send an email to the user with a link to reset their password
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({user, url, token}) => {
      // Send an email to the user with a link to verify their email address
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const name = normalizeName(ctx.body.name);

        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              name,
            },
          },
        };
      }
    }),
  },
  session: {
    expiresIn: 7 * 24 * 60 * 60, // 7 days
  },
  advanced: {
    database: {
      generateId: false,
    },
    ipAddress: {
      ipAddressHeaders: ["x-client-ip", "x-forwarded-for"],
      disableIpTracking: false,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "email-password"],
    },
    updateAccountOnSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    },
  },
});
