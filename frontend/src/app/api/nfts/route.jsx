"use server";
import { NextResponse } from "next/server";
import ApiProxy from "../proxy";

const DJANGO_NFTS_URL = "http://localhost:8000/api/nfts";

export async function GET(params) {
  const {response, status} = await ApiProxy.get(DJANGO_NFTS_URL, false)
  return NextResponse.json(response, {status:status})
}

// export async function POST(request) {
//   const requestData = await request.json()
//   let endpoint = requestData.nft_id ? `${DJANGO_NFTS_URL}/${requestData.nft_id}/` : DJANGO_NFTS_URL
//   console.log(endpoint);
//   const {response, status} = await ApiProxy.post(endpoint, requestData, true )
//   return NextResponse.json(response, {status: status})
// }  