
import { Metaplex } from '@metaplex-foundation/js';
import { Connection, PublicKey } from '@solana/web3.js';

export const getNFTMetadata = async (mintAddressString) => {
    console.log({mintAddressString})
  // Check if mintAddressString is defined
  if (!mintAddressString) {
    console.error('Error: mintAddressString is undefined');
    return null;
  }

  // Using a different public RPC endpoint
  const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=460424af-54bf-4327-a17e-84620d95352b');
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
    console.log(nfts);
    return nfts;
  } catch (error) {
    console.error('Error fetching NFT metadata:', error);
    return null;
  }
};