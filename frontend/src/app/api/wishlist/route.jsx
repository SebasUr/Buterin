"use server";
import { NextResponse } from "next/server";
import ApiProxy from "../proxy";

const DJANGO_WISHLIST_URL = "http://localhost:8000/api/wishlist";

export async function GET(params) {
  const {response, status} = await ApiProxy.get(DJANGO_WISHLIST_URL, true)
  return NextResponse.json(response, {status:status})
}