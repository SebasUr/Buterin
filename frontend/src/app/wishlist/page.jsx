"use client";
import { useAuth } from "@/components/auth-provider";
import { X } from "lucide-react";
import { useEffect } from "react";
import useSWR, { mutate } from "swr";
import ApiProxy from "../api/proxy";

const WISHLIST_URL = "/api/wishlist";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export default function WishlistPage(params) {
  const { data, error, isLoading } = useSWR(WISHLIST_URL, fetcher);
  const auth = useAuth();
  useEffect(() => {
    if (error?.status === 401 && auth.isAuthenticated !== null) {
      auth.loginRequiredRedirect();
    }
  }, [auth, error]);

  const { wishlist_items } = data || { wishlist_items: [] };

  async function handleClick(event, nftId) {
    event.preventDefault();
    const { response, status } = await ApiProxy.post(
      "http://localhost:8000/api/wishlist/remove_item/",
      { nft_id: nftId },
      true
    );

    if (status === 200) {
      mutate(WISHLIST_URL); // Actualiza el carrito sin recargar la página
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">Wishlist</h1>
        {
          wishlist_items.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-center">
              <img src={item.image_url} alt={item.name} className="w-20 h-20 rounded-md" />
              <div className="flex flex-col gap-2">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-muted-foreground w-200">{item.description}</p>
                <p className="font-medium">{item.price} ETH</p>
              </div>
              <X className="hover:cursor-pointer" onClick={(e) => handleClick(e, item.nft_id)} />
            </div>
          ))
        }
      </main>
    </div>
  );
}