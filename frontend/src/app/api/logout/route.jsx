import { removeAllTokens } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(params) {
  const tal = await removeAllTokens()
  return NextResponse.json({}, {status: 200})
}