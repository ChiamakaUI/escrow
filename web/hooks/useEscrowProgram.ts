import { PublicKey, Keypair } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';
import {
  getAssociatedTokenAddressSync,
  TOKEN_2022_PROGRAM_ID,
} from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { randomBytes } from 'crypto';
import { useAnchorProvider } from '@/context';
import { getEscrowProgram } from '@/utils';

export function useEscrowProgram() {

  const { connection } = useConnection();
  const seed = new BN(randomBytes(8));
  const tokenProgram = TOKEN_2022_PROGRAM_ID;
  const provider = useAnchorProvider();
  const { sendTransaction, publicKey } = useWallet();

  if (!publicKey) {
    console.log('wallet public key not available');
    return { initiateEscrow: null };
  }

  const program = getEscrowProgram(provider);

  const maker: PublicKey = publicKey;


  const [mintA, mintB] = Array.from({ length: 2 }, () => Keypair.generate());

  const escrow = PublicKey.findProgramAddressSync(
    [Buffer.from('escrow'), maker.toBytes(), seed.toArrayLike(Buffer, 'le', 8)],
    program.programId
  )[0];

  const vault = getAssociatedTokenAddressSync(
    mintA.publicKey,
    escrow,
    true,
    tokenProgram
  );

  const initiateEscrow = async (taker: PublicKey) => {
    console.log(taker)
    const [makerAtaA, makerAtaB, takerAtaA, takerAtaB] = [maker, taker]
      .map((a) =>
        [mintA, mintB].map((m) =>
          getAssociatedTokenAddressSync(
            m.publicKey,
            a as PublicKey,
            false,
            tokenProgram
          )
        )
      )
      .flat();
    const accounts = {
      maker: maker as PublicKey,
      taker: taker,
      mintA: mintA.publicKey,
      mintB: mintB.publicKey,
      makerAtaA,
      makerAtaB,
      takerAtaA,
      takerAtaB,
      escrow,
      vault,
      tokenProgram,
    };
    if (!maker) {
      console.error('Maker public key is not available');
      return;
    }
    console.log('inititate');
    const transaction = await program.methods
      .make(seed, new BN(1e6), new BN(1e6))
      .accounts({ ...accounts })
      .transaction();

    await sendTransaction(transaction, connection);
  };

  return { initiateEscrow };
}
