"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function FeaturedNFTs() {
  const { data: nftsData, error, isLoading } = useSWR("/api/nfts", fetcher);
  const [featuredNfts, setFeaturedNfts] = useState([]);

  useEffect(() => {
    if (nftsData && nftsData.length > 0) {
      // Ordenar por precio descendente y tomar los 3 primeros
      const sorted = [...nftsData].sort((a, b) => b.price - a.price);
      setFeaturedNfts(sorted.slice(0, 3));
    }
  }, [nftsData]);

  if (isLoading) {
    return <p className="text-center py-10">Cargando NFTs destacados…</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">Error al cargar los NFTs.</p>;
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Título con animación */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="flex justify-between items-center mb-12"
        >
          <h2 className="text-3xl font-bold">Featured NFTs</h2>
          <Button variant="outline" asChild>
            <Link href="/explore">View All</Link>
          </Button>
        </motion.div>

        {/* NFTs con animación de aparición en cascada */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredNfts.map((nft) => (
            <motion.div
              key={nft.id ?? nft.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-square relative">
                  <Image
                    src={nft.image_url}
                    alt={nft.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{nft.name}</h3>
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
