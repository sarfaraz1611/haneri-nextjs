import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const DEV_AUTH_COOKIE = "haneri_dev_auth";
export const DEV_AUTH_TOKEN = "haneri-dev-2026-v1";

const PUBLIC_PATHS = new Set<string>(["/", "/DevLogin"]);
const PUBLIC_API_PATHS = new Set<string>(["/api/dev-login"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.has(pathname) || PUBLIC_API_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(DEV_AUTH_COOKIE)?.value;
  if (token === DEV_AUTH_TOKEN) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm|ico|woff|woff2|ttf|otf)$).*)",
  ],
};
