"use client";
import CartTable from "./table";
import { Button } from "@/components/ui/button";
import { mutate } from "swr";
import ApiProxy from "../api/proxy";

export default function ShoppingCartHome() {  
  async function handleClick(event) {
    event.preventDefault();
    try {
      const { response, status } = await ApiProxy.post(
        "http://35.171.69.43/api/cart/checkout/",
        {},
        true,
        true
      );
  
      if (status !== 200) {
        throw new Error("Checkout failed");
      }
  
      const url = window.URL.createObjectURL(response);
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
  
      mutate("/api/cart"); // Actualiza el carrito sin recargar la página
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <CartTable />
        <Button
          className="w-full sm:w-[300px] h-[50px] transition-all hover:cursor-pointer"
          onClick={(e) => handleClick(e)}
        >
          Checkout
        </Button>
      </main>
    </div>
  );
}