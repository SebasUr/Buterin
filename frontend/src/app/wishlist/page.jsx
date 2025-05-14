"use client";
import { useAuth } from "@/components/auth-provider";
import { X } from "lucide-react";
import { useEffect } from "react";
import useSWR, { mutate } from "swr";
import ApiProxy from "../api/proxy";
import NftListItem from "@/components/nft-list-item";

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
      mutate(WISHLIST_URL);
    }
  }

  return (
    <div className="min-h-screen px-6 sm:px-12 py-16 bg-gradient-to-br from-white to-slate-100 dark:from-zinc-900 dark:to-zinc-800">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Your Wishlist
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">
            All the NFTs you love, saved in one place.
          </p>
        </header>

        <main className="space-y-6">
          {wishlist_items.length === 0 ? (
            <p className="text-center text-zinc-500 dark:text-zinc-400 text-lg">
              Your wishlist is empty.
            </p>
          ) : (
            wishlist_items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-grow">
                  <NftListItem nft={item} />
                </div>
                <button
                  onClick={(e) => handleClick(e, item.nft_id)}
                  className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                  title="Remove from wishlist"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
