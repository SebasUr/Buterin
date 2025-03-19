import { Card, CardContent } from "@/components/ui/card";

const NftListItem = ({ nft }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="flex">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32">
          <img
            src={nft.image_url || "/placeholder.svg"}
            alt={nft.name}
            className="object-cover"
          />
        </div>

        <CardContent className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">{nft.name}</h3>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Current Price</p>
              <p className="font-medium">{nft.price} ETH</p>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default NftListItem;
