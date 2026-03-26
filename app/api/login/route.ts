import { NextResponse } from "next/server";
import { authenticate } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string };
  const user = authenticate(body.username ?? "", body.password ?? "");

  if (!user) {
    return NextResponse.json({ error: "Ungültiger Username oder Passwort." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, username: user.username });
  response.cookies.set("flashcards_session", user.username, {
    httpOnly: false,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });
  return response;
}
