'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { getNFTMetadata } from '@/utils';

type NFT = {
  id: number;
  name: string;
  price: number;
};

export default function Page() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const wallet = useWallet();
  const router = useRouter();

  const getNfts = async () => {
    const result = await getNFTMetadata('6wYDjWUD8v6zB63u138hkq8Fj1mRUxUrCvLrCxYog8cL');
    console.log(result)
  }

  useEffect(() => {
    // Fetch NFTs from user's wallet
    setNfts([
      { id: 1, name: 'Moses', price: 2.0 },
      { id: 2, name: 'Moses', price: 2.0 },
      { id: 3, name: 'Moses', price: 2.0 },
    ]);
    console.log(wallet)
    console.log(wallet?.publicKey?.toString())
    // getNFTMetadata(wallet?.publicKey?.toString())
    getNfts()
  }, [wallet]);

  const handleNFTSelect = (nft: NFT) => {
    setSelectedNFT(nft);
  };

  const handleSubmit = () => {
    if (selectedNFT) {
      router.push(`/choose-token?nftId=${selectedNFT.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">SELECT YOUR NFT FOR SWAP</h2>
        <div className="grid grid-cols-3 gap-4">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              onClick={() => handleNFTSelect(nft)}
              className="border border-gray-600 p-4 cursor-pointer"
            >
              <img
                src={`/nft-image-${nft.id}.jpg`}
                alt={nft.name}
                className="w-full h-40 object-cover mb-2"
              />
              <p className="font-bold">{nft.name}</p>
              <p>Price: ${nft.price}</p>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!selectedNFT}
          className="mt-4 bg-purple-600 text-white px-6 py-2 rounded disabled:bg-gray-600"
        >
          Create Blink
        </button>
      </div>
    </div>
  );
}
