type NftCardProps = {
  nft: any;
  setSelected: Function;
};

const NftCard = ({ nft, setSelected }: NftCardProps) => {
  return (
    <div
      className="border border-gray-600 p-4 cursor-pointer"
      onClick={() => setSelected(nft)}
    >
      <img
        src={nft?.image}
        alt={nft?.name}
        className="w-full h-40 object-cover mb-2"
      />
      <p className="text-lg">{nft?.name}</p>
      <p className="text-sm">{nft?.description}</p>
    </div>
  );
};

export default NftCard;
