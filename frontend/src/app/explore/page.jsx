"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import useSWR from "swr";
import {
  Filter,
  Search,
  ChevronDown,
  Grid3X3,
  LayoutList,
  ArrowUpDown,
  Heart,
  Eye,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton";
import ApiProxy from "../api/proxy";
import NFTSearch from "@/components/NFTSearch";
import NftCard from "@/components/NftCard";
import NftListItem from "@/components/NftListList";
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const NFTS_URL = "/api/nfts";

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

export default function ExplorePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get query parameters with defaults
  const currentPage = Number(searchParams.get("page") || 1);
  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "newest";
  const searchQuery = searchParams.get("search") || "";

  // Local state
  const [view, setView] = useState("grid"); // grid or list
  // const [isFiltersVisible, setIsFiltersVisible] = useState(false)

  // Fetch NFTs data
  // const { data, error, isLoading } = useSWR(
  //   `http://localhost:8000/api/nfts?page=${currentPage}&category=${currentCategory}&sort=${currentSort}&search=${searchQuery}`,
  //   fetcher,
  // )
  const { data, error, isLoading } = useSWR(NFTS_URL, fetcher);

  // // Mock sort options
  const sortOptions = [
    { value: "newest", label: "Recently Added" },
    { value: "oldest", label: "Oldest" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "most-liked", label: "Most Liked" },
    { value: "most-viewed", label: "Most Viewed" },
  ];

  // Use mock data if API data is not available
  // const nfts = data ? data : mockNfts
  const nfts = data ? data : [];
  // const totalPages = data?.totalPages || 5

  async function handleClick(event, nftId) {
    event.preventDefault();
    const { response, status } = await ApiProxy.post(
      `http://localhost:8000/api/cart/add_item/`,
      { nft_id: nftId },
      true
    );
    console.log(response, status);

    if (status === 200) {
      router.push("/cart");
    }
  }

  // Loading skeleton for NFT cards
  // const renderSkeletonCard = (index) => (
  //   <Card key={index} className="overflow-hidden">
  //     <div className="aspect-square relative">
  //       <Skeleton className="h-full w-full" />
  //     </div>
  //     <CardContent className="p-4">
  //       <Skeleton className="h-5 w-3/4 mb-2" />
  //       <Skeleton className="h-4 w-1/2 mb-4" />
  //       <Skeleton className="h-4 w-1/3 mb-2" />
  //       <Skeleton className="h-5 w-1/4 mb-4" />
  //       <Skeleton className="h-8 w-full mt-4" />
  //     </CardContent>
  //   </Card>
  // );

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-muted py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore NFTs</h1>
          <p className="text-muted-foreground max-w-2xl">
            Discover unique digital assets created by artists from around the
            world. Browse, collect, and trade NFTs on the Buterin marketplace.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          {/* Barra de búsqueda */}
          <div className="flex-1">
            <NFTSearch
              nfts={nfts}
              view={view}
              renderNftCard={(nft) => (
                <NftCard key={nft.nft_id} nft={nft} handleClick={handleClick} />
              )}
              renderNftListItem={(nft) => (
                <NftListItem key={nft.nft_id} nft={nft} />
              )}
            />
          </div>

          {/* Controles de ordenamiento y vista */}
          <div className="flex flex-col md:flex-row items-start gap-4">
            {/* Dropdown de ordenamiento (Sort) */}
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    Sort
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className={
                        currentSort === option.value ? "bg-accent" : ""
                      }
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Botones para cambiar entre Grid y List */}
            <div className="flex border rounded-md overflow-hidden">
              <Button
                variant={view === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setView("grid")}
                className="rounded-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setView("list")}
                className="rounded-none"
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* Pagination */
}
{
  // !isLoading && nfts.length > 0 && (
  //   <div className="mt-12">
  //     <Pagination>
  //       <PaginationContent>
  //         <PaginationItem>
  //           <PaginationPrevious
  //             href={`/explore?${new URLSearchParams({
  //               ...Object.fromEntries(searchParams.entries()),
  //               page: Math.max(1, currentPage - 1),
  //             })}`}
  //             className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
  //           />
  //         </PaginationItem>
  //         {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
  //           const pageNum = i + 1
  //           return (
  //             <PaginationItem key={pageNum}>
  //               <PaginationLink
  //                 href={`/explore?${new URLSearchParams({
  //                   ...Object.fromEntries(searchParams.entries()),
  //                   page: pageNum,
  //                 })}`}
  //                 isActive={currentPage === pageNum}
  //               >
  //                 {pageNum}
  //               </PaginationLink>
  //             </PaginationItem>
  //           )
  //         })}
  //         {totalPages > 5 && (
  //           <>
  //             <PaginationItem>
  //               <PaginationEllipsis />
  //             </PaginationItem>
  //             <PaginationItem>
  //               <PaginationLink
  //                 href={`/explore?${new URLSearchParams({
  //                   ...Object.fromEntries(searchParams.entries()),
  //                   page: totalPages,
  //                 })}`}
  //                 isActive={currentPage === totalPages}
  //               >
  //                 {totalPages}
  //               </PaginationLink>
  //             </PaginationItem>
  //           </>
  //         )}
  //         <PaginationItem>
  //           <PaginationNext
  //             href={`/explore?${new URLSearchParams({
  //               ...Object.fromEntries(searchParams.entries()),
  //               page: Math.min(totalPages, currentPage + 1),
  //             })}`}
  //             className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
  //           />
  //         </PaginationItem>
  //       </PaginationContent>
  //     </Pagination>
  //   </div>
  // )
}
