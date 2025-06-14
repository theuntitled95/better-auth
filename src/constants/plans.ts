/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Plan {
  name: string;
  description?: string;
  priceId: string;
  limits: any;
  features: string[];
  price: number;
  popular?: boolean;
  trialDays?: number;
}

export const plans: Plan[] = [
  {
    name: "basic",
    priceId: "price_1RXc8CFYofRw1I9Lza2RvIF9",
    limits: {
      tokens: 100,
    },
    features: ["Gives you access to basic features of the app"],
    price: 9.99,
    trialDays: 7,
  },
  {
    name: "plus",
    priceId: "price_1RXc9GFYofRw1I9LlCLT7eh9",
    limits: {
      tokens: 300,
    },
    features: ["Gives you access to plus features of the app"],
    price: 19.99,
    popular: true,
    trialDays: 7,
  },
  {
    name: "pro",
    priceId: "price_1RXc9QFYofRw1I9LO6P2m3eo",
    limits: {
      tokens: 1000,
    },
    features: ["Gives you access to pro features of the app"],
    price: 199.99,
    trialDays: 7,
  },
];
