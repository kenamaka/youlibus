import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const forwarded = req.headers.get(
    "x-forwarded-for"
  );

  const ip =
    forwarded?.split(",")[0] || "unknown";

  return NextResponse.json({ ip });
}