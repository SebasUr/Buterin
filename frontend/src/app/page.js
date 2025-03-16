"use client"
import { useAuth } from "@/components/auth-provider"
import { Suspense, useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Gem, Shield, Zap, TrendingUp, Wallet } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Home() {
  const { data, error, isLoading } = useSWR("http://localhost:8000/api/nfts", fetcher)
  const auth = useAuth()
  const [email, setEmail] = useState("")

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
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-background z-0"></div>
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Discover, Collect & Sell <span className="text-primary">Extraordinary</span> NFTs
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Buterin is the premier marketplace for NFT creators and collectors. Explore unique digital assets and
                build your collection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link href="/explore">
                    Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/create">Create NFT</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Featured NFT"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                  <h3 className="text-xl font-bold">Ethereal Dimensions #24</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">@CryptoArtist</span>
                    <span className="font-medium">2.4 ETH</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full rounded-2xl bg-primary/20 dark:bg-primary/10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold">10K+</p>
              <p className="text-muted-foreground">Artworks</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold">3.2K+</p>
              <p className="text-muted-foreground">Artists</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold">8.5K+</p>
              <p className="text-muted-foreground">Collectors</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold">45K+</p>
              <p className="text-muted-foreground">Transactions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured NFTs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured NFTs</h2>
            <Button variant="outline" asChild>
              <Link href="/explore">View All</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredNfts.map((nft) => (
              <Card key={nft.id} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-square relative">
                  <Image src={nft.image || "/placeholder.svg"} alt={nft.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{nft.title}</h3>
                      <p className="text-sm text-muted-foreground">by @{nft.creator}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Current Price</p>
                      <p className="font-medium">{nft.price}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t flex justify-between">
                    <Button variant="outline" size="sm">
                      Place Bid
                    </Button>
                    <Button size="sm">Buy Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Buterin</h2>
            <p className="text-muted-foreground">
              Our platform offers a secure, user-friendly experience for NFT creators and collectors alike.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
                <p className="text-muted-foreground">
                  Every transaction is secured by blockchain technology, ensuring authenticity and ownership.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Minting</h3>
                <p className="text-muted-foreground">
                  Create and list your NFTs in minutes with our streamlined minting process.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Multiple Wallets</h3>
                <p className="text-muted-foreground">
                  Connect with various wallet providers for a seamless trading experience.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Gem className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Exclusive Collections</h3>
                <p className="text-muted-foreground">
                  Access limited edition drops and exclusive artist collaborations.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Market Insights</h3>
                <p className="text-muted-foreground">
                  Track trends and get valuable insights to make informed collecting decisions.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Low Gas Fees</h3>
                <p className="text-muted-foreground">Enjoy optimized gas fees and transaction costs on our platform.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your NFT Journey?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of creators and collectors on Buterin today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/explore">Explore Marketplace</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/create">Create Your First NFT</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for the latest drops and marketplace updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Marketplace</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Explore
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Collections
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Artists
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Activity
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">My Account</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Watchlist
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    My Collections
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Platform Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Partners
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-6"
                >
                  <path d="M5 22h14"></path>
                  <path d="M5 2h14"></path>
                  <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path>
                  <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path>
                </svg>
              </div>
              <span className="font-semibold text-lg">Buterin</span>
            </div>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Buterin. All rights reserved.</p>
          </div>
        </div>
      </footer>

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
  )
}

