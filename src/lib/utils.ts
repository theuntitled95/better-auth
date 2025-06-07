import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { prisma } from "./prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeName(name: string) {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z\s'-]/g, "")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function toProperCase(str: string) {
  if (!str) return "";

  return (
    str
      // Replace underscores, hyphens, and dots with space
      .replace(/[_\-.]+/g, " ")
      // Split camelCase: helloWorld => hello World
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // Collapse multiple spaces and trim
      .replace(/\s+/g, " ")
      .trim()
      // Capitalize each word
      .replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
      )
  );
}

export async function getSubscription(userId: string) {
  // Query your database or Stripe for the user's subscription
  return await prisma.subscription.findUnique({ where: { id: userId } });
}
