export { default } from "next-auth/middleware";

export const config = { matcher: ["/", "/accounts", "/create", "/explores", "/p/:path*", "/profile/:path*", "/reels"] };
