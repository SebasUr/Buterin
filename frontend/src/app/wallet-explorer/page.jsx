"use client"
import { useState } from "react"
import { Wallet, AlertCircle } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock wallet NFT data
const mockWalletNfts = {
  "0x1234567890abcdef1234567890abcdef12345678": [
    {
      id: 1,
      title: "Cosmic Voyager #42",
      creator: "ArtistOne",
      price: "0.85 ETH",
      image: "/placeholder.svg?height=400&width=400",
      collection: "Cosmic Voyagers",
    },
    {
      id: 2,
      title: "Digital Genesis #18",
      creator: "CryptoCreator",
      price: "1.2 ETH",
      image: "/placeholder.svg?height=400&width=400",
      collection: "Digital Genesis",
    },
    {
      id: 3,
      title: "Neon Dreams #7",
      creator: "PixelMaster",
      price: "0.65 ETH",
      image: "/placeholder.svg?height=400&width=400",
      collection: "Neon Dreams",
    },
  ],
  "0xabcdef1234567890abcdef1234567890abcdef12": [
    {
      id: 4,
      title: "Ethereal Landscape",
      creator: "VirtualArtist",
      price: "0.6 ETH",
      image: "/placeholder.svg?height=400&width=400",
      collection: "Ethereal Landscapes",
    },
    {
      id: 5,
      title: "Crypto Punk #3078",
      creator: "NFTLegend",
      price: "5.5 ETH",
      image: "/placeholder.svg?height=400&width=400",
      collection: "Crypto Punks",
    },
  ],
}

export default function WalletExplorerPage() {
  const [walletAddress, setWalletAddress] = useState("")
  const [searchedAddress, setSearchedAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault()

    if (!walletAddress.trim()) {
      setError("Please enter a wallet address")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      if (mockWalletNfts[walletAddress.trim()]) {
        setSearchedAddress(walletAddress.trim())
      } else {
        // If wallet not in mock data, show error or empty state
        setSearchedAddress(walletAddress.trim())
      }
      setIsLoading(false)
    }, 1000)
  }

  // Get NFTs for the searched wallet
  const getNftsForWallet = (address) => {
    return mockWalletNfts[address] || []
  }

  // Format wallet address for display
  const formatWalletAddress = (address) => {
    if (!address) return ""
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Render NFT card
  const renderNftCard = (nft) => (
    <Card key={nft.id} className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={nft.image || "/placeholder.svg"}
          alt={nft.title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium line-clamp-1">{nft.title}</h3>
            <p className="text-sm text-muted-foreground">by @{nft.creator}</p>
          </div>
        </div>
        <Badge variant="outline" className="mb-2">
          {nft.collection}
        </Badge>
        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="text-xs text-muted-foreground">Current Price</p>
            <p className="font-medium">{nft.price}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const nfts = searchedAddress ? getNftsForWallet(searchedAddress) : []

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-muted py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Wallet Explorer</h1>
          <p className="text-muted-foreground max-w-2xl">
            Enter an Ethereum wallet address to view all NFTs owned by that wallet. Discover collections and digital
            assets across the blockchain.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <div className="max-w-3xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter Ethereum wallet address (0x...)"
                className="pl-10 py-6 text-base"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <Button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2" disabled={isLoading}>
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <p className="text-sm text-muted-foreground">
              Try these example addresses: 0x1234567890abcdef1234567890abcdef12345678 or
              0xabcdef1234567890abcdef1234567890abcdef12
            </p>
          </form>
        </div>

        {/* Results Section */}
        {searchedAddress && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Wallet NFTs</h2>
                <p className="text-muted-foreground">Showing NFTs owned by {formatWalletAddress(searchedAddress)}</p>
              </div>
              <Badge variant="secondary" className="px-3 py-1">
                {nfts.length} NFTs
              </Badge>
            </div>

            {nfts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {nfts.map(renderNftCard)}
              </div>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No NFTs Found</AlertTitle>
                <AlertDescription>This wallet doesn't own any NFTs or the wallet address is invalid.</AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

