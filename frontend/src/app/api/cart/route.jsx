"use server";
import { getAuthToken } from "@/lib/auth";
import { NextResponse } from "next/server";

const DJANGO_CART_URL = "http://localhost:8000/api/cart";

export async function GET(params) {
  const authToken = await getAuthToken();
  
  if (!authToken) {
    return NextResponse.json({}, {status:401})
  }
  
  const response = await fetch(DJANGO_CART_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${authToken}`
    }
  })

  const json = await response.json()
  return NextResponse.json({...json}, {status:response.status})
}