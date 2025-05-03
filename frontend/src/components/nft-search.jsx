import { useState, useEffect } from "react";
import {
  Search,
  ArrowUpDown,
  ChevronDown,
  Grid3X3,
  LayoutList,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NFTSearch = ({ nfts, renderNftCard, renderNftListItem }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredNFTs, setFilteredNFTs] = useState(nfts);
  const [currentSort, setCurrentSort] = useState(null);
  const [view, setView] = useState("grid"); // 'grid' o 'list'

  const sortOptions = [
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "name-asc", label: "Name: A-Z" },
  ];

  useEffect(() => {
    let filtered = nfts.filter(
      (nft) =>
        nft.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        nft.description.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (currentSort) {
      filtered = sortNFTs(filtered, currentSort);
    }

    setFilteredNFTs(filtered);
  }, [searchInput, nfts, currentSort]);

  const sortNFTs = (nfts, sortOption) => {
    const sorted = [...nfts];
    switch (sortOption) {
      case "price-high-low":
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "price-low-high":
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  };

  const handleSortChange = (sortOption) => {
    setCurrentSort(sortOption === currentSort ? null : sortOption);
  };

  return (
    <div>
      {/* Barra de búsqueda, orden y vista */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
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

        {/* Menú de ordenamiento y botones de vista */}
        <div className="flex flex-row items-start gap-4">
          {/* Ordenamiento */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                {currentSort
                  ? sortOptions.find((opt) => opt.value === currentSort)?.label
                  : "Sort By"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={currentSort === option.value ? "bg-accent" : ""}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Botones para cambiar la vista */}
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={view === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setView("grid")}
              className="rounded-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setView("list")}
              className="rounded-none"
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* NFTs renderizados */}
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
                : "flex flex-col w-full mx-auto gap-4"
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
