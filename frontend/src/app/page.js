"use client";
import { useAuth } from "@/components/auth-provider";
import { Suspense } from "react";
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  const { data, error, isLoading } = useSWR("http://localhost:8000/api/nfts", fetcher)
  const auth = useAuth()
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error...</div>  

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
        </div>
        <div>
          {auth.isAuthenticated? <p className="text-green-500">Logged In</p>: <p className="text-red-500">NOT Logged In</p>}
        </div>
        <Suspense>
          <h2>JSON with the NFTs data:</h2>
          {
            JSON.stringify(data)
          }
        </Suspense>
      </main>
    </div>
  );
}
