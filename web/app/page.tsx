import Link from 'next/link'
const Page = () => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
      <p className="mb-4">Start your transaction with us today</p>      
      <div className="flex gap-4 mb-6 w-full">
      <Link href="/create-escrow" className="text-white w-[46%]">
      <button className="flex-1 border border-[#641BE6] text-white rounded py-2 hover:bg-[#641BE6] w-full">
          Create Escrow
        </button>
        </Link>
        <Link href="/sell-nft" className="text-white w-[46%]">
        <button className="flex-1 bg-[#641BE6] text-white rounded py-2 w-full">
          Sell Nfts
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;