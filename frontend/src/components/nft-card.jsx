const NFTCard = ({ nft }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover rounded-md" />
      <h2 className="text-lg font-semibold mt-2">{nft.name}</h2>
      <p className="text-gray-500">{nft.price} ETH</p>
    </div>
  );
};

export default NFTCard;