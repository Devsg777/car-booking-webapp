import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ['/','/api/webhooks(.*)','/about','/contact'],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: ['/api/uploadthing'],
  
 
});

  
export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
function intlMiddleware(req: import("next/server").NextRequest & { experimental_clerkUrl: import("next/dist/server/web/next-url").NextURL; }) {
  throw new Error("Function not implemented.");
}

