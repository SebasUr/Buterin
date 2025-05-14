"use client"
import { useState } from "react"
import { Wallet, AlertCircle } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function WalletExplorerPage() {
  const [walletAddress, setWalletAddress] = useState("")
  const [searchedAddress, setSearchedAddress] = useState("")
  const [nfts, setNfts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Maneja la búsqueda haciendo el fetch al endpoint del backend
  const handleSearch = async (e) => {
    e.preventDefault()

    if (!walletAddress.trim()) {
      setError("Please enter a wallet address")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const res = await fetch(`http://35.171.69.43/api/wallet-explorer?wallet=${walletAddress.trim()}`)
      if (!res.ok) {
        throw new Error("Error al obtener datos del backend")
      }
      const data = await res.json()
      setNfts(data)
      setSearchedAddress(walletAddress.trim())
    } catch (err) {
      setError(err.message)
      setNfts([])
    }
    setIsLoading(false)
  }

  // Formatea la dirección para mostrarla de forma abreviada
  const formatWalletAddress = (address) => {
    if (!address) return ""
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Renderiza la tarjeta de cada NFT (sólo se muestran nombre e imagen)
  const renderNftCard = (nft, index) => (
    <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={nft.image || "/placeholder.svg"}
          alt={nft.name}
          unoptimized
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium line-clamp-1">{nft.name}</h3>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Encabezado de la página */}
      <div className="bg-muted py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Wallet Explorer</h1>
          <p className="text-muted-foreground max-w-2xl">
            Ingresa una dirección de Ethereum para ver todos los NFTs asociados a esa wallet.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Formulario de búsqueda */}
        <div className="max-w-3xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Ingresa la dirección de Ethereum (0x...)"
                className="pl-10 py-6 text-base"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <Button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2" disabled={isLoading}>
                {isLoading ? "Buscando..." : "Search"}
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
              Ejemplos: 0x1234567890abcdef1234567890abcdef12345678 o 0xabcdef1234567890abcdef1234567890abcdef12
            </p>
          </form>
        </div>

        {/* Sección de resultados */}
        {searchedAddress && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Wallet NFTs</h2>
                <p className="text-muted-foreground">
                  Mostrando NFTs de {formatWalletAddress(searchedAddress)}
                </p>
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
                <AlertDescription>
                  Esta wallet no posee NFTs o la dirección es inválida.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
