import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Get the current user
  const session = await auth.api.getSession({ headers: req.headers });
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch organizations and the user's role in each
  const memberships = await prisma.member.findMany({
    where: { userId },
    include: { organization: true },
  });

  // Format the response
  const orgs = memberships.map((m) => ({
    id: m.organization.id,
    name: m.organization.name,
    slug: m.organization.slug,
    logo: m.organization.logo,
    metadata: m.organization.metadata,
    createdAt: m.organization.createdAt,
    role: m.role,
  }));

  return NextResponse.json(orgs);
}
