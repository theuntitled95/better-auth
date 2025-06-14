import { getActiveSubscription } from "@/actions/sub";
import { Plan, plans } from "@/constants/plans";
import { UserRole } from "@/generated/prisma";
import { ac, roles } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { normalizeName } from "@/lib/utils";
import { stripe } from "@better-auth/stripe";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { admin, organization } from "better-auth/plugins";
import Stripe from "stripe";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      gender: {
        type: "string",
        label: "Gender",
        options: ["male", "female", "other"],
        required: false,
      },
      dob: {
        type: "date",
        label: "Date of Birth",
        required: false,
      },
      phone: {
        type: "string",
        label: "Phone Number",
        required: false,
      },
      trialAllowed: {
        type: "boolean",
        label: "Trial Allowed",
        required: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }) => {
      console.log("Reset password URL: ", url);
      // Send reset password email
    },
    resetPasswordTokenExpiresIn: 3600, // 1 hour
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      console.log("Verification URL to verify the email: ", url);
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
      header: "x-forwarded-for",
      ipAddressHeaders: ["x-client-ip", "x-forwarded-for"],
      disableIpTracking: false,
      trustedProxy: true,
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
  plugins: [
    nextCookies(),
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: plans,
        getCheckoutSessionParams: async ({ user, plan }) => {
          const checkoutSession: {
            params: {
              subscription_data?: {
                trial_period_days: number;
              };
            };
          } = {
            params: {},
          };
          if (user.trialAllowed) {
            checkoutSession.params.subscription_data = {
              trial_period_days: (plan as Plan).trialDays,
            };
          }
          return checkoutSession;
        },
        onSubscriptionComplete: async ({ event }) => {
          const eventDataObject = event.data.object as Stripe.Checkout.Session;
          const userId = eventDataObject.metadata?.userId;

          console.log("Settings trialAllowed to false");
          await prisma.user.update({
            where: { id: userId },
            data: { trialAllowed: false },
          });
        },
      },
    }),
    // Import or define the Role type and use its values
    admin({
      adminRoles: UserRole.ADMIN,
      defaultRole: UserRole.USER,
      ac,
      roles,
    }),
    organization({
      schema: {
        member: {
          modelName: "member",
        },
      },
      allowUserToCreateOrganization: async () => {
        const subscription = await getActiveSubscription();
        return !!subscription?.subscription?.plan;
      },
    }),
  ],
});
