"use server";
import { NextResponse } from "next/server";
import ApiProxy from "../proxy";

const DJANGO_CART_URL = "http://35.171.69.43/api/cart";

export async function GET(params) {
  const {response, status} = await ApiProxy.get(DJANGO_CART_URL, true)

  return NextResponse.json(response, {status:status})
}

export async function POST(request) {
  const requestData = await request.json()
  const {response, status} = await ApiProxy.post(DJANGO_CART_URL, requestData, true)
  return NextResponse.json(response, {status: status})
} 