"use client";
import { X } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import useSWR, { mutate } from "swr"; // Importar mutate
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import ApiProxy from "../api/proxy";
import { useRouter } from "next/navigation";

const CART_URL = "/api/cart";

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

export default function CartTable() {
  const { data, error, isLoading } = useSWR(CART_URL, fetcher);
  const auth = useAuth();
  const { items } = data || { items: [] };
  const router = useRouter();

  useEffect(() => {
    if (error?.status === 401 && auth.isAuthenticated !== null) {
      auth.loginRequiredRedirect();
    }
  }, [auth, error]);

  async function handleClick(event, nftId) {
    event.preventDefault();
    const { response, status } = await ApiProxy.post(
      "http://localhost:8000/api/cart/remove_item/",
      { nft_id: nftId },
      true
    );

    if (status === 200) {
      mutate(CART_URL); // Actualiza el carrito sin recargar la página
    }
  }

  return (
    <Table>
      <TableCaption>Your shopping cart.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((cartItem, idx) => (
          <TableRow key={`ìtem-${idx}`}>
            <TableCell className="font-medium">{cartItem.nft_id}</TableCell>
            <TableCell className="font-medium">{cartItem.name}</TableCell>
            <TableCell className="font-medium">{cartItem.price} ETH</TableCell>
            <TableCell className="font-medium">
              <X className="hover:cursor-pointer" onClick={(e) => handleClick(e, cartItem.nft_id)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right"></TableCell>
          <TableCell colSpan={1}></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
