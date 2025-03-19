import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const NFTSearch = ({ nfts, view, renderNftCard, renderNftListItem }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredNFTs, setFilteredNFTs] = useState(nfts);

  useEffect(() => {
    const filtered = nfts.filter(
      (nft) =>
        nft.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        nft.description.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredNFTs(filtered);
  }, [searchInput, nfts]);

  return (
    <div>
      {/* Barra de búsqueda */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <form onSubmit={(e) => e.preventDefault()} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search NFTs, collections, or creators..."
              className="pl-10"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Mostrar NFTs filtrados con la opción de grid/list */}
      <div className="flex-1">
        {filteredNFTs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No NFTs found matching your criteria.
            </p>
          </div>
        ) : (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col w-full max-w-5xl mx-auto gap-4" // Ajustado para vista lista
            }
          >
            {filteredNFTs.map((nft) =>
              view === "grid" ? renderNftCard(nft) : renderNftListItem(nft)
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTSearch;
