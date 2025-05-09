"use client"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import {
  ArrowDown,
  ArrowUp,
  Search,
  RefreshCw,
  Star,
  Clock,
  DollarSign,
  BarChart3,
  TrendingUp,
  Filter,
  ChevronDown,
  Info,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"

// CoinGecko API key
const COINGECKO_API_KEY = "CG-f8oRk9n9V7xCNkNoGeymaLs5"

export default function CoinsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get query parameters with defaults
  const currentPage = Number(searchParams.get("page") || 1)
  const currentSort = searchParams.get("sort") || "market_cap_desc"
  const searchQuery = searchParams.get("search") || ""
  const currentCategory = searchParams.get("category") || "all"

  // Local state
  const [coins, setCoins] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchInput, setSearchInput] = useState(searchQuery)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [globalData, setGlobalData] = useState(null)
  const [timeframe, setTimeframe] = useState("24h")

  // Fetch coins data
  const fetchCoins = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Construct API URL with parameters
      const perPage = 50
      let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=${currentSort}&per_page=${perPage}&page=${currentPage}&sparkline=true&price_change_percentage=1h,24h,7d`

      if (searchQuery) {
        apiUrl += `&ids=${searchQuery}`
      }

      if (currentCategory !== "all") {
        apiUrl += `&category=${currentCategory}`
      }

      // Add API key
      apiUrl += `&x_cg_demo_api_key=${COINGECKO_API_KEY}`

      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      setCoins(data)
      setLastUpdated(new Date())
    } catch (err) {
      console.error("Error fetching coin data:", err)
      setError(err.message || "Failed to fetch cryptocurrency data")
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  // Fetch global market data
  const fetchGlobalData = async () => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/global?x_cg_demo_api_key=${COINGECKO_API_KEY}`)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      setGlobalData(data.data)
    } catch (err) {
      console.error("Error fetching global data:", err)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchCoins()
    fetchGlobalData()

    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem("crypto-favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }

    // Set up auto-refresh every 60 seconds
    const refreshInterval = setInterval(() => {
      refreshData()
    }, 60000)

    return () => clearInterval(refreshInterval)
  }, [currentPage, currentSort, searchQuery, currentCategory])

  // Handle manual refresh
  const refreshData = () => {
    setIsRefreshing(true)
    fetchCoins()
    fetchGlobalData()
  }

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault()
    updateQueryParams({ search: searchInput, page: 1 })
  }

  // Handle sort changes
  const handleSortChange = (sort) => {
    updateQueryParams({ sort, page: 1 })
  }

  // Handle category changes
  const handleCategoryChange = (category) => {
    updateQueryParams({ category, page: 1 })
  }

  // Handle timeframe changes
  const handleTimeframeChange = (value) => {
    setTimeframe(value)
  }

  // Update URL query parameters
  const updateQueryParams = (updates) => {
    const params = new URLSearchParams(searchParams)

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    router.push(`/coins?${params.toString()}`)
  }

  // Toggle favorite status
  const toggleFavorite = (coinId) => {
    const newFavorites = favorites.includes(coinId) ? favorites.filter((id) => id !== coinId) : [...favorites, coinId]

    setFavorites(newFavorites)
    localStorage.setItem("crypto-favorites", JSON.stringify(newFavorites))
  }

  // Format large numbers
  const formatNumber = (num, maximumFractionDigits = 2) => {
    if (num === null || num === undefined) return "N/A"

    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits,
    }).format(num)
  }

  // Format currency
  const formatCurrency = (num, maximumFractionDigits = 2) => {
    if (num === null || num === undefined) return "N/A"

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits,
    }).format(num)
  }

  // Format percentage
  const formatPercentage = (num) => {
    if (num === null || num === undefined) return "N/A"

    return `${num >= 0 ? "+" : ""}${num.toFixed(2)}%`
  }

  // Get price change based on selected timeframe
  const getPriceChange = (coin) => {
    switch (timeframe) {
      case "1h":
        return coin.price_change_percentage_1h_in_currency
      case "7d":
        return coin.price_change_percentage_7d_in_currency
      case "24h":
      default:
        return coin.price_change_percentage_24h
    }
  }

  // Sort options
  const sortOptions = [
    { value: "market_cap_desc", label: "Market Cap (High to Low)" },
    { value: "market_cap_asc", label: "Market Cap (Low to High)" },
    { value: "volume_desc", label: "Volume (High to Low)" },
    { value: "volume_asc", label: "Volume (Low to High)" },
    { value: "id_asc", label: "Name (A-Z)" },
    { value: "id_desc", label: "Name (Z-A)" },
    { value: "price_asc", label: "Price (Low to High)" },
    { value: "price_desc", label: "Price (High to Low)" },
  ]

  // Category options
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "cryptocurrency", name: "Cryptocurrencies" },
    { id: "decentralized-finance-defi", name: "DeFi" },
    { id: "non-fungible-tokens-nft", name: "NFT" },
    { id: "metaverse", name: "Metaverse" },
    { id: "gaming", name: "Gaming" },
    { id: "layer-1", name: "Layer 1" },
    { id: "layer-2", name: "Layer 2" },
    { id: "smart-contract-platform", name: "Smart Contract" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-muted py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Cryptocurrency Prices</h1>
          <p className="text-muted-foreground max-w-2xl">
            Track real-time cryptocurrency prices, market cap, volume, and more. Stay updated with the latest trends in
            the crypto market.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Global Market Data */}
        {globalData && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">Market Cap</span>
                </div>
                <div className="text-lg font-semibold">{formatCurrency(globalData.total_market_cap.usd, 0)}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {formatPercentage(globalData.market_cap_change_percentage_24h_usd)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <BarChart3 className="h-4 w-4" />
                  <span className="text-sm">24h Volume</span>
                </div>
                <div className="text-lg font-semibold">{formatCurrency(globalData.total_volume.usd, 0)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">BTC Dominance</span>
                </div>
                <div className="text-lg font-semibold">{formatPercentage(globalData.market_cap_percentage.btc)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Info className="h-4 w-4" />
                  <span className="text-sm">Active Coins</span>
                </div>
                <div className="text-lg font-semibold">{formatNumber(globalData.active_cryptocurrencies, 0)}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search cryptocurrencies..."
                className="pl-10"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </form>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Category
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={currentCategory === category.id ? "bg-accent" : ""}
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
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

            <Button variant="outline" onClick={refreshData} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="mb-6">
          <Tabs defaultValue="24h" value={timeframe} onValueChange={handleTimeframeChange}>
            <TabsList>
              <TabsTrigger value="1h">1h</TabsTrigger>
              <TabsTrigger value="24h">24h</TabsTrigger>
              <TabsTrigger value="7d">7d</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Last Updated */}
        {lastUpdated && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Clock className="h-4 w-4" />
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Coins Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">
                  {timeframe === "1h" ? "1h %" : timeframe === "7d" ? "7d %" : "24h %"}
                </TableHead>
                <TableHead className="text-right">24h Volume</TableHead>
                <TableHead className="text-right">Market Cap</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                // Loading skeletons
                Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-6 w-6 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-8" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <div>
                            <Skeleton className="h-4 w-24 mb-1" />
                            <Skeleton className="h-3 w-12" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-4 w-20 ml-auto" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-4 w-16 ml-auto" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-4 w-24 ml-auto" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-4 w-28 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
              ) : coins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No cryptocurrencies found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                coins.map((coin, index) => {
                  const priceChange = getPriceChange(coin)
                  const isPriceUp = priceChange >= 0
                  const isFavorite = favorites.includes(coin.id)

                  return (
                    <TableRow key={coin.id}>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleFavorite(coin.id)}>
                          <Star
                            className={`h-4 w-4 ${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                          />
                        </Button>
                      </TableCell>
                      <TableCell className="font-medium">{coin.market_cap_rank}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Image
                            src={coin.image || "/placeholder.svg"}
                            alt={coin.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div>
                            <div className="font-medium">{coin.name}</div>
                            <div className="text-xs text-muted-foreground uppercase">{coin.symbol}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(coin.current_price)}</TableCell>
                      <TableCell className="text-right">
                        <div
                          className={`flex items-center justify-end gap-1 ${isPriceUp ? "text-green-500" : "text-red-500"}`}
                        >
                          {isPriceUp ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                          {formatPercentage(Math.abs(priceChange || 0))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{formatCurrency(coin.total_volume, 0)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(coin.market_cap, 0)}</TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            onClick={() => updateQueryParams({ page: Math.max(1, currentPage - 1) })}
            disabled={currentPage <= 1 || isLoading}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">Page {currentPage}</span>
          <Button
            variant="outline"
            onClick={() => updateQueryParams({ page: currentPage + 1 })}
            disabled={isLoading || coins.length < 50}
          >
            Next
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 text-sm text-muted-foreground border-t pt-6">
          <p>
            Data provided by CoinGecko API. Cryptocurrency prices are subject to high market risk and volatility. You
            should only participate in trading activities with funds that you can afford to lose.
          </p>
        </div>
      </div>
    </div>
  )
}
