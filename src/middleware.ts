export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/dashboard/:path*"],
  // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
