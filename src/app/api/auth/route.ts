import { NextRequest } from "next/server";
import { createToken, verifyToken } from "@/utils/api/getToken";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return Response.json({ error: "Missing username or password" });
  }

  const token = createToken(username, password);

  if (!verifyToken(token)) {
    return Response.json({ error: "Invalid username or password" });
  }

  if (
    username === process.env.NEXT_PUBLIC_ID &&
    password == process.env.NEXT_PUBLIC_PASSWORD
  ) {
    request.cookies.set("token", token);
    return Response.json({ token: token });
  }
}

export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return Response.json({ error: "Missing token" });
  }

  if (!verifyToken(token)) {
    return Response.json({ error: "Invalid token" });
  }

  return Response.json({ token: token });
}

export const revalidate = 3;
