import { auth0 } from "./lib/auth0";
import { NextRequest, NextResponse } from "next/server";

// Define routes that should be publicly accessible
const publicRoutes = [
  "/auth/login",
  "/auth/logout",
  "/auth/callback",
  "/unauthorized",
];

function isPublicRoute(pathname: string): boolean {
  const isPublicPath: boolean = publicRoutes.some(
    (route) => pathname.startsWith(route) || pathname === route,
  );

  const isStaticFile =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".");

  return isPublicPath || isStaticFile;
}

export async function middleware(request: NextRequest) {
  const { nextUrl, url } = request;
  const pathname = nextUrl.pathname;

  // First, let the Auth0 middleware do its work
  const authResponse = await auth0.middleware(request);

  // If it's a public route or auth route, allow access immediately
  if (isPublicRoute(pathname) || pathname.startsWith("/auth")) {
    return authResponse;
  }

  try {
    // Get the user session
    const session = await auth0.getSession();

    // No session means no authenticated user
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", url));
    }
    // Check token expiration
    const tokenExpiresAt = session.tokenSet.expiresAt * 1000; // Convert to milliseconds
    const now = Date.now();
    const tokenIsExpired = now >= tokenExpiresAt;
    if (tokenIsExpired) {
      try {
        // Try to refresh the token
        if (session.refresh_token) {
          const tokenSet = await auth0.getAccessToken();

          // Update the session with new tokens
          await auth0.updateSession({
            ...session,
            accessToken: tokenSet.token,
            accessTokenExpiresAt: tokenSet.expiresAt,
          });

          // Get the updated session
          const updatedSession = await auth0.getSession();
          if (!updatedSession) {
            throw new Error("Failed to get updated session");
          }

          // Update user information
          session.accessToken = updatedSession.accessToken;
          session.accessTokenExpiresAt = updatedSession.accessTokenExpiresAt;
        } else {
          // No refresh token available, redirect to login
          return NextResponse.redirect(new URL("/auth/login", url));
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return NextResponse.redirect(new URL("/auth/login", url));
      }
    }
    // Get user roles and check for admin access
    const userRoles = session.user["https://auth.empowertech.be/roles"] || [];

    // If user is not an admin, redirect to unauthorized
    if (!userRoles.includes("Admin")) {
      return NextResponse.redirect(new URL("/unauthorized", url));
    }

    // Create a new response from the auth response
    const response = NextResponse.next();

    // Add user information to headers for API routes
    response.headers.set("x-user-email", session.user.email ?? "");
    response.headers.set("x-user-id", session.user.sub ?? "");
    response.headers.set("x-user-roles", JSON.stringify(userRoles));

    return response;
  } catch (error) {
    console.error("Auth middleware error:", error);
    return NextResponse.redirect(new URL("/auth/login", url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/single-image-upload|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
