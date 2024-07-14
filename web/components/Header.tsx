"use client"

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4">
      <nav>
        <Link href="/" className="text-white">
          Home
        </Link>
      </nav>
      <WalletMultiButton />
    </header>
  )
}

export default Header



