"use client";
import { useAuth } from "@/components/auth-provider";
import { Suspense, useState, useEffect } from "react";
import useSWR from "swr";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import FeaturedNFTs from "@/components/featured-nft";
import RecommendedCourses from "@/components/recommended-courses";
import CallToAction from "@/components/call-to-action";
import Footer from "@/components/Footer";


const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data: nftsData, error, isLoading } = useSWR(
    "http://35.171.69.43/api/nfts",
    fetcher
  );
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [featuredNfts, setFeaturedNfts] = useState([]);

  const stats = [
    { value: "10K+", label: "Artworks" },
    { value: "3.2K+", label: "Artists" },
    { value: "8.5K+", label: "Collectors" },
    { value: "45K+", label: "Transactions" },
  ];

  useEffect(() => {
    if (nftsData && nftsData.length > 0) {
      // Ordenar los NFTs por precio de mayor a menor
      const sortedByPrice = [...nftsData].sort((a, b) => b.price - a.price);
      // Seleccionar los primeros 3 NFTs (los de mayor precio)
      const mostExpensiveNfts = sortedByPrice.slice(0, 3);
      setFeaturedNfts(mostExpensiveNfts);
    }
  }, [nftsData]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Stats Section */}
      <StatsSection stats={stats} />
      
      {/* Features Section */}
      <FeaturedNFTs/>
      {/* Recommended Courses Section */}
      <RecommendedCourses />
      {/* Call to Action Section */}
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
            {JSON.stringify(nftsData)}
          </Suspense>
        </div>
      )}
    </div>
  );
}