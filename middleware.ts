import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/rooms/:id",
    "/api/webhook/clerk",
    "api/shopeefood/:path*",
  ],
  ignoredRoutes: ["/api/webhook/clerk", "api/shopeefood/:path*"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
