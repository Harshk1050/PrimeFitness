import { NextRequest, NextResponse } from "next/server";
import { decode } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  const token = req.cookies.get("authjs.session-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    const decoded = await decode({
      token,
      secret: process.env.NEXTAUTH_SECRET!,
      salt: "authjs.session-token",
    });

    if (!decoded) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
