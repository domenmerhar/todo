import { getSession } from "@/lib/actions/auth";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const user = await getSession();
  if (!user) NextResponse.redirect(new URL("/sign-in", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: "/home",
};
