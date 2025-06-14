import { UserRole } from "@/generated/prisma";
import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statements = {
  ...defaultStatements,
  posts: [
    "create",
    "read",
    "list",
    "update",
    "delete",
    "update:own",
    "delete:own",
  ],
} as const;

export const ac = createAccessControl(statements);

export const roles = {
  [UserRole.ADMIN]: ac.newRole({
    ...adminAc.statements,
    posts: [
      "create",
      "read",
      "list",
      "update",
      "delete",
      "update:own",
      "delete:own",
    ],
  }),
};
