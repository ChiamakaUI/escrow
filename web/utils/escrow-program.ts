import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import EscrowIDL from '../../anchor/target/idl/anchor_escrow.json';
import type { AnchorEscrow } from '../../anchor/target/types/anchor_escrow';

export { AnchorEscrow, EscrowIDL };

export const ESCROW_PROGRAM_ID = new PublicKey(EscrowIDL.address);

export function getEscrowProgram(provider: AnchorProvider) {
  return new Program(EscrowIDL as AnchorEscrow, provider);
}
