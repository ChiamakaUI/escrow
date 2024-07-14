'use client';

import { useState, useEffect } from 'react';
import { useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { getNFTMetadata } from '@/utils';
import { NftCard } from '@/components';
import { NftMeta } from '@/types';

export default function Page() {
  const [nfts, setNfts] = useState<any[] | null>([]);
  const [metadataList, setMetadataList] = useState<NftMeta[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<NftMeta | null>();
  const [nftPrice, setNftPrice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const wallet = useWallet();

  const getNftsAndMetadata = async () => {
    setLoading(true);
    try {
      const nftResults = await getNFTMetadata(
        wallet?.publicKey?.toString() || ''
      );
      setNfts(nftResults);
      if (!nftResults) return;

      const metadataResults = await Promise.all(
        nftResults.map(async (nft) => {
          if (nft && nft.uri) {
            const response = await fetch(nft.uri);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          }
          return null;
        })
      );
      setMetadataList(metadataResults);
    } catch (err) {
      console.error('Error fetching NFTs or metadata:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (wallet.connected) {
      getNftsAndMetadata();
    }
  }, [wallet.connected]);

  const handleNFTSelect = (nft: NftMeta) => {
    setSelectedNFT(nft);
  };

  const handleCreateBlink = async () => {
    if (!selectedNFT || !nftPrice || isNaN(Number(nftPrice))) return;

    const desc = selectedNFT?.description ?? '';

    const apiUrl = new URL('/api/swap-nft', window.location.origin);
    apiUrl.searchParams.set('icon', selectedNFT?.image);
    apiUrl.searchParams.set('description', desc);
    apiUrl.searchParams.set('title', selectedNFT?.name);
    apiUrl.searchParams.set('price', nftPrice);

    const dialToUrl = new URL('https://dial.to/');
    dialToUrl.searchParams.set('action', `solana-action:${apiUrl.toString()}`);

    console.log('Redirecting to:', dialToUrl.toString());
    window.location.href = dialToUrl.toString();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {loading ? (
        <div>Loading...</div>
      ) : metadataList.length !== 0 ? (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">SELECT YOUR NFT FOR SWAP</h2>
          <div className="grid grid-cols-3 gap-4">
            {metadataList.map((nft, i) => (
              <NftCard key={i} nft={nft} setSelected={handleNFTSelect} />
            ))}
          </div>
          <div className="flex flex-col my-3.5">
            <p className="mb-1">Price (SOL)</p>
            <input
              type="text"
              className="border border-white p-2 rounded-xl w-[55%] text-white"
              onChange={(e) => setNftPrice(e.target.value)}
              value={nftPrice}
            />
          </div>
          <button
            onClick={handleCreateBlink}
            disabled={!selectedNFT || !nftPrice}
            className="mt-4 bg-[#641BE6] text-white px-6 py-2 rounded disabled:bg-gray-600"
          >
            Create Blink
          </button>
        </div>
      ) : (
        <div>No NFTs found</div>
      )}
    </div>
  );
}


