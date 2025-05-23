"use server";
import { NextResponse } from "next/server";
import ApiProxy from "../proxy";

const DJANGO_REGISTER_URL = "http://localhost:8000/api/auth/register/";

export async function POST(request) {
  const body = await request.json();
  const {response, status} = await ApiProxy.post(DJANGO_REGISTER_URL, body, false)
  return NextResponse.json({response}, {status:status})
}