import { NextResponse } from "next/server";
import { parse, serialize } from "cookie";

const EMPTY_PATH = "/";
const LOGIN_PATH = "/auth/login";
const REGISTER_PATH = "auth/register";
const DASHBOARD_PATH = "/dashboard";

const clearCookie = (cookies: any) => {
  delete cookies.jwt;
  const cookieSerialized = serialize("jwt", "", {
    maxAge: -1,
    path: "/",
  });

  const headers = {
    "Set-Cookie": cookieSerialized,
  };

  return NextResponse.next({ headers });
};

const authenticate = async (request: any) => {
  const cookies = parse(request.headers.get("cookie") || "");
  const url = request.nextUrl.clone();
  const token = cookies.jwt;

  const isEmptyPath = url.pathname === EMPTY_PATH;
  const isAuthPath =
    url.pathname === LOGIN_PATH || url.pathname === REGISTER_PATH;
  const isDashboardPath = url.pathname === DASHBOARD_PATH;
  if (!token) {
    if (isAuthPath) {
      return NextResponse.next();
    }

    if (isEmptyPath || isDashboardPath) {
      url.pathname = LOGIN_PATH;
      return NextResponse.redirect(url);
    }
  } else if (!!token) {
    try {
      const response = await fetch(
        `${process.env.API_BASE_URL}/auth/validate-token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        }
      );
      const { valid } = await response.json();

      if (valid) {
        if (isEmptyPath || isAuthPath) {
          url.pathname = DASHBOARD_PATH;
          return NextResponse.redirect(url);
        }
        return NextResponse.next();
      } else {
        return clearCookie(cookies);
      }
    } catch (error) {
      return clearCookie(cookies);
    }
  }
};

export default authenticate;
