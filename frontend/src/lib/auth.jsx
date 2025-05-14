"use server";
import { cookies } from "next/headers";

const TOKEN_AGE = 3600;
const TOKEN_AUTH_NAME = "auth-token";
const TOKEN_REFRESH_NAME = "refresh-token";

export async function getAuthToken() {
  const token = (await cookies()).get(TOKEN_AUTH_NAME);
  return token?.value
}

export async function getRefreshToken() {
  const token = (await cookies()).get(TOKEN_REFRESH_NAME);
  return token?.value
}

export async function setAuthToken(authToken) {
  return (await cookies()).set({
    name: TOKEN_AUTH_NAME,
    value: authToken,
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: TOKEN_AGE,
  })
}

export async function setRefreshToken(refreshToken) {
  return (await cookies()).set({
    name: TOKEN_REFRESH_NAME,
    value: refreshToken,
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: TOKEN_AGE,
  })
}

export async function removeAllTokens() {
  (await cookies()).delete(TOKEN_REFRESH_NAME);
  return (await cookies()).delete(TOKEN_AUTH_NAME);
}