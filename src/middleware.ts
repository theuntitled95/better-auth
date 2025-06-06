import {getSessionCookie} from "better-auth/cookies";
import {NextRequest, NextResponse} from "next/server";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude /auth, /api/auth and their subroutes
    "/((?!_next|auth(?:/.*)?$|api/auth(?:/.*)?$|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
