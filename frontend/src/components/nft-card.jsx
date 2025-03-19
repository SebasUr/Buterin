import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toast } from "sonner"

const NftCard = ({ nft, handleShopping, handleLiking }) => {
  const router = useRouter();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <div className="aspect-square relative overflow-hidden">
          <img
            src={nft.image_url || "/placeholder.svg"}
            alt={nft.name}
            className="object-cover transition-transform hover:scale-105 hover:cursor-pointer"
            onClick={() => router.push(`/explore/${nft.nft_id}`)}
          />
        </div>

        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          >
            <Heart className="h-4 w-4 hover:cursor-pointer" onClick={(e) => {
              handleLiking(e, nft.nft_id);
              toast("You've liked this nft", {
                description: `${nft.name} has been added to your wishlist.`,
                action: {
                  label: "Ok",
                },
              });
            }}/>
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-medium line-clamp-1">{nft.name}</h3>
        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="text-xs text-muted-foreground">Current Price</p>
            <p className="font-medium">{nft.price} ETH</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button className="w-full" size="sm" onClick={(e) => handleShopping(e, nft.nft_id)}>
            Add to Shopping Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NftCard;
