"use server";
import { setAuthToken, setRefreshToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import ApiProxy from "../proxy";

const DJANGO_LOGIN_URL = "http://localhost:8000/api/auth/login";

export async function POST(request) {
  const body = await request.json();
  const {response, status} = await ApiProxy.post(DJANGO_LOGIN_URL, body, false)
  if (status === 200) {
    const {access, refresh, username, email, id} = response
    setAuthToken(access);
    setRefreshToken(refresh);
    return NextResponse.json({"username": username}, {status:status})
  }
  return NextResponse.json({response}, {status:status})
}