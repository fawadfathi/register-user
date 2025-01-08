import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // All to visit Every API Route
  if (isApiAuthRoute) {
    return;
  }

  // Check Auth Route which is Public Routes

  if (isAuthRoute) {
    //  if the user logged in than redirect the user to DEFAULT_LOGIN_REDIRECT(/settings)

    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  // check if the user is not (logged-in) and if the user is not in publicRoute than redirect the user to the "auth/login"

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("auth/login", nextUrl));
  }

  return;
});

// This config Specifies which paths the middleware should apply to using regex pattern
export const config = {
  /*
   * Apply middleware to all paths except:
   * - public (static files)
   * - api (API routes)
   * - _next/static (Next.js static files)
   * - _next/image (Next.js image optimization files)
   * - favicon.ico (favicon file)
   */

  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
