import { NextResponse } from "next/server";

const DEV_USERNAME = "HaneriDev";
const DEV_PASSWORD = "haneriDev@Shaik@222";
const DEV_AUTH_COOKIE = "haneri_dev_auth";
const DEV_AUTH_TOKEN = "haneri-dev-2026-v1";
const THIRTY_DAYS_SECONDS = 60 * 60 * 24 * 30;

function liveModeBlocked() {
  return NextResponse.json(
    { ok: false, message: "Dev login is disabled in live mode." },
    { status: 403 },
  );
}

export async function POST(request: Request) {
  if (process.env.SITE_LIVE === "true") {
    return liveModeBlocked();
  }

  let username = "";
  let password = "";

  try {
    const body = await request.json();
    username = typeof body?.username === "string" ? body.username : "";
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body" },
      { status: 400 },
    );
  }

  if (username !== DEV_USERNAME || password !== DEV_PASSWORD) {
    return NextResponse.json(
      { ok: false, message: "Invalid credentials" },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: DEV_AUTH_COOKIE,
    value: DEV_AUTH_TOKEN,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: THIRTY_DAYS_SECONDS,
  });
  return response;
}

export async function DELETE() {
  if (process.env.SITE_LIVE === "true") {
    return liveModeBlocked();
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: DEV_AUTH_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
