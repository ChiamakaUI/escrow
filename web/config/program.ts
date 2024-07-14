import idl from "anchor/target/idl/anchor_escrow.json"
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react"
import { PublicKey } from '@solana/web3.js';
import {
  Program,
  Idl,
  AnchorProvider,
  setProvider,
} from "@coral-xyz/anchor"

const { connection } = useConnection()
const wallet = useAnchorWallet()

const provider = new AnchorProvider(connection, wallet, {})
setProvider(provider)

export const programId = new PublicKey("JPLockxtkngHkaQT5AuRYow3HyUv5qWzmhwsCPd653n")
export const program = new Program(idl as Idl, programId)