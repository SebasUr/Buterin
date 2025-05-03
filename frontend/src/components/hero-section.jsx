"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import useSWR from "swr";
import { useState, useEffect } from "react";

const NFTS_URL = "/api/nfts/";

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

export default function HeroSection({ stats }) {
  const [randomNft, setRandomNft] = useState(null);
  const { data: nftsData, error, isLoading } = useSWR(NFTS_URL, fetcher);

  useEffect(() => {
    if (nftsData && nftsData.length > 0 && !randomNft) {
      const randomIndex = Math.floor(Math.random() * nftsData.length);
      const selectedNft = nftsData[randomIndex];
      
      const normalizedNft = {
        name: selectedNft.name,
        description: selectedNft.description,
        imageUrl: selectedNft.image_url,
        raribleUrl: selectedNft.rarible_url,
        makePrice: selectedNft.price
      };
      setRandomNft(normalizedNft);
    }
  }, [nftsData, randomNft]);

  if (isLoading) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-background z-0"></div>
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-4xl md:text-6xl font-bold tracking-tight bg-muted h-12 w-3/4 mx-auto animate-pulse rounded"
                ></motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-lg text-muted-foreground max-w-md mx-auto bg-muted h-6 w-1/2 mx-auto animate-pulse rounded"
                ></motion.p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                <div className="bg-muted h-10 w-32 animate-pulse rounded"></div>
                <div className="bg-muted h-10 w-32 animate-pulse rounded"></div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-muted animate-pulse" style={{ height: '600px', width: '600px' }}></div>
              <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full rounded-2xl bg-primary/20 dark:bg-primary/10"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching NFTs:", error);
  }

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-background z-0"></div>
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-bold tracking-tight"
              >
                Discover, Collect & Sell {" "}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-primary"
                >
                  Extraordinary
                </motion.span>{" "}
                NFTs
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-lg text-muted-foreground max-w-md mx-auto"
              >
                Buterin is the premier marketplace for NFT creators and
                collectors. Explore unique digital assets and build your
                collection.
              </motion.p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Button size="lg" asChild>
                  <Link href="/explore">
                    Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              >
                <Button size="lg" variant="outline" asChild>
                  <Link href="/create">Create NFT</Link>
                </Button>
              </motion.div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-border/50">
              <Image
                src={randomNft?.imageUrl || "/placeholder.svg?height=600&width=600"}
                alt={randomNft?.name || "Featured NFT"}
                width={600}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                <h3 className="text-xl font-bold">
                  {randomNft?.name || "Ethereal Dimensions #24"}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted-foreground">
                    {randomNft?.makePrice ? `${randomNft.makePrice} ETH` : "Price not set"}
                  </span>
                  {randomNft?.raribleUrl && (
                    <span className="font-medium">
                      <Button variant="link" asChild>
                        <Link href={randomNft.raribleUrl} target="_blank">
                          View on Rarible
                        </Link>
                      </Button>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="absolute -bottom-6 -right-6 -z-10 w-full h-full rounded-2xl bg-primary/20 dark:bg-primary/10"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}