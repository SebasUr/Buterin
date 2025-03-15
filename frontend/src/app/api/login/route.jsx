"use server";
import { setAuthToken, setRefreshToken, getAuthToken, getRefreshToken } from "@/lib/auth";
import { NextResponse } from "next/server";

const DJANGO_LOGIN_URL = "http://localhost:8000/api/auth/login";


export async function POST(request) {
  const body = await request.json();
  const response = await fetch(DJANGO_LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  
  const data = await response.json();
  if (response.ok) {
    setAuthToken(data.access);
    setRefreshToken(data.refresh);
    const authToken = await getAuthToken();
    const refreshToken = await getRefreshToken();
    // console.log(authToken, refreshToken);
    return NextResponse.json({}, {status:200})
  }
  
  return NextResponse.json({data}, {status:401})
}