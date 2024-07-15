
import { Metaplex } from '@metaplex-foundation/js';
import { Connection, PublicKey } from '@solana/web3.js';

export const getNFTMetadata = async (mintAddressString: PublicKey) => {
  // Check if mintAddressString is defined
  if (!mintAddressString) {
    console.error('Error: mintAddressString is undefined');
    return null;
  }
  const API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
  const HELIUS_RPC_URL = process.env.NEXT_PUBLIC_HELIUS_RPC_URL;

  const connection = new Connection(`${HELIUS_RPC_URL}/?api-key=${API_KEY}`);
  const metaplex = new Metaplex(connection);

  let mintAddress;
  try {
    // Convert the mint address string to a PublicKey
    mintAddress = new PublicKey(mintAddressString);
  } catch (error) {
    console.error('Error creating PublicKey:', error);
    console.error('Provided mintAddressString:', mintAddressString);
    return null;
  }

  try {
    const nfts = await metaplex.nfts().findAllByOwner({ owner: mintAddressString });
    return nfts;
  } catch (error) {
    console.error('Error fetching NFT metadata:', error);
    return null;
  }
};