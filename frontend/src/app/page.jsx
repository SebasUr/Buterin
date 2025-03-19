"use client";
import { useAuth } from "@/components/auth-provider";
import { Suspense, useState } from "react";
import useSWR from "swr";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import FeaturedNFTs from "@/components/featured-nft";
import CallToAction from "@/components/call-to-action";
import Footer from "@/components/footer";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/api/nfts",
    fetcher
  );
  const auth = useAuth();
  const [email, setEmail] = useState("");

  const stats = [
    { value: "10K+", label: "Artworks" },
    { value: "3.2K+", label: "Artists" },
    { value: "8.5K+", label: "Collectors" },
    { value: "45K+", label: "Transactions" },
  ];

  // Featured NFTs - would normally come from API
  const featuredNfts = [
    {
      id: 1,
      title: "Cosmic Voyager #42",
      creator: "ArtistOne",
      price: "0.85 ETH",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 2,
      title: "Digital Genesis #18",
      creator: "CryptoCreator",
      price: "1.2 ETH",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 3,
      title: "Neon Dreams #7",
      creator: "PixelMaster",
      price: "0.65 ETH",
      image: "/placeholder.svg?height=400&width=400",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      {/* Stats Section */}
      <StatsSection stats={stats} />
      {/* Features Section */}
      <FeaturedNFTs featuredNfts={featuredNfts} />

      <CallToAction />
      {/* Footer */}
      <Footer />

      {/* Debug section - only visible during development */}
      {process.env.NODE_ENV === "development" && (
        <div className="hidden">
          <div>
            {auth.isAuthenticated ? (
              <p className="text-green-500">Logged In</p>
            ) : (
              <p className="text-red-500">NOT Logged In</p>
            )}
          </div>
          <Suspense>
            <h2>JSON with the NFTs data:</h2>
            {JSON.stringify(data)}
          </Suspense>
        </div>
      )}
    </div>
  );
}
