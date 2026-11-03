import { NextRequest, NextResponse } from "next/server";
import { createToken, verifyToken } from "@/utils/api/getToken";
import { getRequestToken } from "@/utils/api/auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json().catch(() => ({}));

  if (!username || !password) {
    return NextResponse.json(
      { error: "Enter your username and password" },
      { status: 400 }
    );
  }

  const token = createToken(username, password);

  if (!verifyToken(token)) {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }

  return NextResponse.json({ token });
}

export async function GET(request: NextRequest) {
  const token = getRequestToken(request);

  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  return NextResponse.json({ token });
}
