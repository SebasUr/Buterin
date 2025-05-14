import { Card, CardContent } from "@/components/ui/card";
import ApiProxy from "@/app/api/proxy";
import { Button } from "@/components/ui/button"
import { Heart, } from "lucide-react"


export default async function Page({ params }) {
  const { id } = await params
  const { response, status } = await ApiProxy.get(`http://localhost:8000/api/nfts/${id}`, false);

  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="relative">
          <div className="aspect-square relative overflow-hidden">
            <img
              src={response.image_url || "/placeholder.svg"}
              alt={response.name}
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium line-clamp-1">{response.name}</h3>
            </div>
          </div>

          <div className="flex justify-between items-center mt-3">
            <div>
              <p className="text-xs text-muted-foreground">Current Price</p>
              <p className="font-medium">{response.price} ETH</p>
            </div>
          </div>

          {/* <div className="mt-4 pt-4 border-t">
            <Button className="w-full hover:cursor-pointer" size="sm" onClick={handleClick}>
              Add to Shopping Cart
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}