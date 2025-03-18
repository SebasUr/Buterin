"use client"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import useSWR from "swr"
import { Filter, Search, ChevronDown, Grid3X3, LayoutList, ArrowUpDown, Heart, Eye, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import { Skeleton } from "@/components/ui/skeleton"
import ApiProxy from "../api/proxy"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const NFTS_URL = "/api/nfts";

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

export default function ExplorePage() {
  const router = useRouter()
  // const searchParams = useSearchParams()

  // Get query parameters with defaults
  // const currentPage = Number(searchParams.get("page") || 1)
  // const currentCategory = searchParams.get("category") || "all"
  // const currentSort = searchParams.get("sort") || "newest"
  // const searchQuery = searchParams.get("search") || ""

  // Local state
  const [view, setView] = useState("grid") // grid or list
  // const [searchInput, setSearchInput] = useState(searchQuery)
  // const [isFiltersVisible, setIsFiltersVisible] = useState(false)

  // Fetch NFTs data
  // const { data, error, isLoading } = useSWR(
  //   `http://localhost:8000/api/nfts?page=${currentPage}&category=${currentCategory}&sort=${currentSort}&search=${searchQuery}`,
  //   fetcher,
  // )
  const { data, error, isLoading } = useSWR(NFTS_URL, fetcher)

  // // Mock categories for filter sidebar
  // const categories = [
  //   { id: "all", name: "All Items" },
  //   { id: "art", name: "Art" },
  //   { id: "collectibles", name: "Collectibles" },
  //   { id: "photography", name: "Photography" },
  //   { id: "music", name: "Music" },
  //   { id: "domains", name: "Domains" },
  //   { id: "virtual-worlds", name: "Virtual Worlds" },
  //   { id: "trading-cards", name: "Trading Cards" },
  //   { id: "sports", name: "Sports" },
  //   { id: "utility", name: "Utility" },
  // ]

  // // Mock price ranges
  // const priceRanges = [
  //   { id: "all", name: "All Prices" },
  //   { id: "under-0.1", name: "Under 0.1 ETH" },
  //   { id: "0.1-0.5", name: "0.1 - 0.5 ETH" },
  //   { id: "0.5-1", name: "0.5 - 1 ETH" },
  //   { id: "1-5", name: "1 - 5 ETH" },
  //   { id: "5-10", name: "5 - 10 ETH" },
  //   { id: "above-10", name: "Above 10 ETH" },
  // ]

  // // Mock sort options
  // const sortOptions = [
  //   { value: "newest", label: "Recently Added" },
  //   { value: "oldest", label: "Oldest" },
  //   { value: "price-high-low", label: "Price: High to Low" },
  //   { value: "price-low-high", label: "Price: Low to High" },
  //   { value: "most-liked", label: "Most Liked" },
  //   { value: "most-viewed", label: "Most Viewed" },
  // ]

  // // Mock NFT data (use this if API data is not available)
  // const mockNfts = [
  //   {
  //     id: 1,
  //     title: "Abstract Dimensions #42",
  //     creator: "CryptoArtist",
  //     price: "1.25 ETH",
  //     image: "/placeholder.svg?height=500&width=500",
  //     likes: 24,
  //     views: 156,
  //     category: "art",
  //     isAuction: true,
  //     timeLeft: "12h 30m",
  //   },
  //   {
  //     id: 2,
  //     title: "Neon Genesis #18",
  //     creator: "DigitalMaster",
  //     price: "0.85 ETH",
  //     image: "/placeholder.svg?height=500&width=500",
  //     likes: 18,
  //     views: 92,
  //     category: "art",
  //     isAuction: false,
  //   },
  //   {
  //     id: 3,
  //     title: "Crypto Punk #3078",
  //     creator: "NFTLegend",
  //     price: "5.5 ETH",
  //     image: "/placeholder.svg?height=500&width=500",
  //     likes: 120,
  //     views: 1024,
  //     category: "collectibles",
  //     isAuction: false,
  //   },
  //   {
  //     id: 4,
  //     title: "Ethereal Landscape",
  //     creator: "VirtualArtist",
  //     price: "0.6 ETH",
  //     image: "/placeholder.svg?height=500&width=500",
  //     likes: 45,
  //     views: 312,
  //     category: "photography",
  //     isAuction: true,
  //     timeLeft: "2d 4h",
  //   },
  //   {
  //     id: 5,
  //     title: "Digital Dreams #7",
  //     creator: "CryptoCreator",
  //     price: "1.8 ETH",
  //     image: "/placeholder.svg?height=500&width=500",
  //     likes: 67,
  //     views: 489,
  //     category: "art",
  //     isAuction: false,
  //   },
  //   {
  //     id: 6,
  //     title: "Metaverse Land Plot #42",
  //     creator: "VirtualDeveloper",
  //     price: "3.2 ETH",
  //     image: "/placeholder.svg?height=500&width=500",
  //     likes: 28,
  //     views: 215,
  //     category: "virtual-worlds",
  //     isAuction: true,
  //     timeLeft: "5d 12h",
  //   },
  //   {
  //     id: 7,
  //     title: "Cosmic Voyage #15",
  //     creator: "GalacticArtist",
  //     price: "0.95 ETH",
  //     image: "/placeholder.svg?height=500&width=500",
  //     likes: 52,
  //     views: 378,
  //     category: "art",
  //     isAuction: false,
  //   },
  //   {
  //     id: 8,
  //     title: "Crypto Kitty #1337",
  //     creator: "DigitalPets",
  //     price: "0.75 ETH",
  //     image: "/placeholder.svg?height=500&width=500",
  //     likes: 104,
  //     views: 892,
  //     category: "collectibles",
  //     isAuction: false,
  //   },
  //   {
  //     id: 9,
  //     title: "Urban Dystopia",
  //     creator: "CityScaper",
  //     price: "1.45 ETH",
  //     image: "/placeholder.svg?height=500&width=500",
  //     likes: 38,
  //     views: 267,
  //     category: "photography",
  //     isAuction: true,
  //     timeLeft: "8h 15m",
  //   },
  // ]

  // Use mock data if API data is not available
  // const nfts = data ? data : mockNfts
  const nfts = data ? data : []
  // const totalPages = data?.totalPages || 5

  // Handle search submission
  // const handleSearch = (e) => {
  //   e.preventDefault()
  //   updateQueryParams({ search: searchInput, page: 1 })
  // }

  // // Handle filter changes
  // const handleCategoryChange = (category) => {
  //   updateQueryParams({ category, page: 1 })
  // }

  // // Handle sort changes
  // const handleSortChange = (sort) => {
  //   updateQueryParams({ sort, page: 1 })
  // }

  // // Update URL query parameters
  // const updateQueryParams = (updates) => {
  //   const params = new URLSearchParams(searchParams)

  //   Object.entries(updates).forEach(([key, value]) => {
  //     if (value) {
  //       params.set(key, value)
  //     } else {
  //       params.delete(key)
  //     }
  //   })

  //   router.push(`/explore?${params.toString()}`)
  // }

  // // Reset all filters
  // const resetFilters = () => {
  //   router.push("/explore")
  //   setSearchInput("")
  // }

  async function handleClick(event, nftId) {
    event.preventDefault();
    const { response, status } = await ApiProxy.post(`http://localhost:8000/api/cart/add_item/`, { nft_id: nftId }, true);
    console.log(response, status);
    
    if (status === 200) {
      router.push("/cart");
    }
  }

  // Render NFT card
  const renderNftCard = (nft) => (
    <Card key={nft.nft_id} className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <div className="aspect-square relative overflow-hidden">
          <img
            src={nft.image_url || "/placeholder.svg"}
            alt={nft.name}
            // fill
            className="object-cover transition-transform hover:scale-105 hover:cursor-pointer"
            onClick={e => router.push(`/explore/${nft.nft_id}`)}
          />
        </div>

        {/* {nft.isAuction && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="flex items-center gap-1 bg-background/80 backdrop-blur-sm">
              <Clock className="h-3 w-3" />
              {nft.timeLeft}
            </Badge>
          </div>
        )} */}

        <div className="absolute top-3 right-3 flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium line-clamp-1">{nft.name}</h3>
            {/* <p className="text-sm text-muted-foreground">by @{nft.creator}</p> */}
          </div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="text-xs text-muted-foreground">Current Price</p>
            <p className="font-medium">{nft.price} ETH</p>
          </div>

          {/* <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" /> {nft.likes}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" /> {nft.views}
            </span>
          </div> */}
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button className="w-full hover:cursor-pointer" size="sm" onClick={e => handleClick(e, nft.nft_id)}>
            Add to Shopping Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  // Render NFT list item (for list view)
  const renderNftListItem = (nft) => (
    <Card key={nft.nft_id} className="overflow-hidden transition-all hover:shadow-md">
      <div className="flex">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32">
          <img src={nft.image_url || "/placeholder.svg"} alt={nft.name} 
          // fill 
          className="object-cover" />
        </div>

        <CardContent className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{nft.name}</h3>
              {/* <p className="text-sm text-muted-foreground">by @{nft.creator}</p> */}
            </div>

            <div className="text-right">
              <p className="text-xs text-muted-foreground">Current Price</p>
              <p className="font-medium">{nft.price}</p>
            </div>
          </div>

          {/* <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" /> {nft.likes}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" /> {nft.views}
              </span>
              {nft.isAuction && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {nft.timeLeft}
                </Badge>
              )}
            </div>

            <Button size="sm">{nft.isAuction ? "Place Bid" : "Buy Now"}</Button>
          </div> */}
        </CardContent>
      </div>
    </Card>
  )

  // Loading skeleton for NFT cards
  const renderSkeletonCard = (index) => (
    <Card key={index} className="overflow-hidden">
      <div className="aspect-square relative">
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent className="p-4">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-4 w-1/3 mb-2" />
        <Skeleton className="h-5 w-1/4 mb-4" />
        <Skeleton className="h-8 w-full mt-4" />
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-muted py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore NFTs</h1>
          <p className="text-muted-foreground max-w-2xl">
            Discover unique digital assets created by artists from around the world. Browse, collect, and trade NFTs on
            the Buterin marketplace.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Controls */}
        {/* <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search NFTs, collections, or creators..."
                className="pl-10"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </form>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setIsFiltersVisible(!isFiltersVisible)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>

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
                    className={currentSort === option.value ? "bg-accent" : ""}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

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
        </div> */}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          {
            // isFiltersVisible && (
            //   <div className="w-full md:w-64 shrink-0">
            //     <div className="bg-card rounded-lg border p-4">
            //       <div className="flex justify-between items-center mb-4">
            //         <h3 className="font-medium">Filters</h3>
            //         <Button variant="ghost" size="sm" onClick={resetFilters}>
            //           Reset
            //         </Button>
            //       </div>
  
            //       <div className="space-y-6">
            //         {/* Categories */}
            //         <div>
            //           <h4 className="text-sm font-medium mb-3">Categories</h4>
            //           <div className="space-y-2">
            //             {categories.map((category) => (
            //               <div key={category.id} className="flex items-center">
            //                 <Button
            //                   variant="ghost"
            //                   size="sm"
            //                   className={`justify-start px-2 w-full ${
            //                     currentCategory === category.id ? "bg-accent" : ""
            //                   }`}
            //                   onClick={() => handleCategoryChange(category.id)}
            //                 >
            //                   {category.name}
            //                 </Button>
            //               </div>
            //             ))}
            //           </div>
            //         </div>
  
            //         {/* Price Range */}
            //         <div>
            //           <h4 className="text-sm font-medium mb-3">Price Range</h4>
            //           <Select defaultValue="all">
            //             <SelectTrigger>
            //               <SelectValue placeholder="All Prices" />
            //             </SelectTrigger>
            //             <SelectContent>
            //               {priceRanges.map((range) => (
            //                 <SelectItem key={range.id} value={range.id}>
            //                   {range.name}
            //                 </SelectItem>
            //               ))}
            //             </SelectContent>
            //           </Select>
            //         </div>
  
            //         {/* Status */}
            //         <div>
            //           <h4 className="text-sm font-medium mb-3">Status</h4>
            //           <Tabs defaultValue="all">
            //             <TabsList className="grid grid-cols-3">
            //               <TabsTrigger value="all">All</TabsTrigger>
            //               <TabsTrigger value="buy">Buy Now</TabsTrigger>
            //               <TabsTrigger value="auction">Auction</TabsTrigger>
            //             </TabsList>
            //           </Tabs>
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // )
          }

          {/* NFT Grid/List */}
          <div className="flex-1">
            {isLoading ? (
              <div
                className={
                  view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
                }
              >
                {Array(8)
                  .fill(0)
                  .map((_, index) => renderSkeletonCard(index))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Error loading NFTs. Please try again later.</p>
                <Button variant="outline" className="mt-4" onClick={() => router.refresh()}>
                  Retry
                </Button>
              </div>
            ) : nfts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No NFTs found matching your criteria.</p>
                <Button variant="outline" className="mt-4" onClick={resetFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className={
                  view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
                }
              >
                {nfts.map((nft) => (view === "grid" ? renderNftCard(nft) : renderNftListItem(nft)))}
              </div>
            )}

            {/* Pagination */}
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
          </div>
        </div>
      </div>
    </div>
  )
}