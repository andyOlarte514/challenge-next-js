import { NextResponse } from "next/server";
import { parse } from "cookie";

const authenticate = async (request: any) => {
  const cookies = parse(request.headers.get("cookie") || "");
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  const token = cookies.jwt;
  if (!token) {
    return NextResponse.redirect(url);
  }

  try {
    const response = await fetch("http://localhost:3000/auth/validate-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const { valid } = await response.json();

    if (valid) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(url);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(url);
  }
};

export const config = {
  matcher: ["/dashboard"],
};

export default authenticate;
