"use server";
import { NextResponse } from "next/server";
import ApiProxy from "../proxy";

const DJANGO_NFTS_WALLET_URL = "http://localhost:8000/api/nfts2/";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get("wallet");

  // Se pasa el parámetro 'wallet' en la URL del backend
  const urlWithParam = `${DJANGO_NFTS_WALLET_URL}?wallet=${wallet}`;

  const { response, status } = await ApiProxy.get(urlWithParam, true);
  return NextResponse.json(response, { status });
}
