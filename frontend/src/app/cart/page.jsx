"use client";
import { useAuth } from "@/components/auth-provider";
import { useEffect } from "react";
import useSWR from 'swr'

const CART_URL = "/api/cart";

const fetcher = async url => {
  const res = await fetch(url)
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json()
}

export default function ShoppingCartHome() {
  const { data, error, isLoading } = useSWR(CART_URL, fetcher)
  const auth = useAuth();
  
  useEffect(() => {
    if (error?.status === 401 && auth.isAuthenticated !== null) {
      auth.loginRequiredRedirect();
    }
  }, [auth, error])

  if (error) return <div>Error...</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2>JSON with the shopping cart data:</h2>
        {
          JSON.stringify(data)
        }
      </main>
    </div>
  );
}