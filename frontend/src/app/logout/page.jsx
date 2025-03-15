"use client";

import { useAuth } from "@/components/auth-provider";

const LOGOUT_URL = "/api/logout";

export default function LogoutPage(params) {
  const auth = useAuth();

  async function handleClick(event) {
    event.preventDefault();
    const response = await fetch(LOGOUT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      auth.logout();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="p-4 bg-background rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">¿Are you  sure you want to Logout?</h1>
        <button onClick={handleClick} className="w-full p-2 bg-blue-500 text-white rounded">Logout</button>
      </div>
    </div>
  )
}