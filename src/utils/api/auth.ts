import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./getToken";

export const getRequestToken = (request: NextRequest) =>
  request.headers.get("Authorization")?.split(" ")[1] ||
  request.cookies.get("token")?.value;

export const isAuthorized = (request: NextRequest) => {
  const token = getRequestToken(request);
  return !!token && verifyToken(token);
};

type Handler = (request: NextRequest) => Promise<Response> | Response;

/** Rejects unauthenticated requests and turns thrown errors into JSON. */
export const withAuth =
  (handler: Handler) =>
  async (request: NextRequest): Promise<Response> => {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      return await handler(request);
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
  };

export const jsonError = (error: string, status = 400) =>
  NextResponse.json({ error }, { status });
