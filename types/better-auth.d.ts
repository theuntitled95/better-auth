import "@better-auth/stripe";

declare module "@better-auth/stripe" {
  interface Subscription {
    limits?: {
      tokens?: number;
      // Add any other properties you need in the limits object
    };
  }
}
