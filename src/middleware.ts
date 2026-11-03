import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./utils/api/getToken";

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get("token");
  const loggedIn = !!token && verifyToken(token.value);
  const isLogin = request.nextUrl.pathname.startsWith("/admin/login");

  if (!loggedIn && !isLogin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (loggedIn && isLogin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/admin", "/admin/login"],
};
