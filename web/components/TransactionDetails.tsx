import { useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useEscrowProgram } from '@/hooks';

type TransactionDetailsProps = {
  transactionDetails: any;
};

const TransactionDetails = ({
  transactionDetails,
}: TransactionDetailsProps) => {
  const { name, price, duration, stages } = transactionDetails;
  const [value, setValue] = useState<string>("")
  const [receiver, setReceiver] = useState<PublicKey>();

  const escrowProgram = useEscrowProgram()
  
  const handleInitiateEscrow = async () => {

      try {
        if(!receiver) return
        await escrowProgram.initiateEscrow?.(receiver);
        console.log("Escrow initiated successfully");
      } catch (error) {
        console.error("Error initiating escrow:", error);
      }

  };

  return (
    <div className="bg-gray-900 text-white p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Start Transaction</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Transaction details</h2>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="mb-1">{name}</p>
          <p className="mb-1">${price} USDC</p>
          <p className="mb-1">Payment will be made after all {stages} stages are completed</p>
          <p className="mb-1">Expected period: {duration} days</p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Receiver's details</h2>
        <div className="">
          <p className="mb-2">Public Address</p>
          <input
            type="text"
            placeholder="Public Address"
            className="w-full bg-gray-800 rounded p-3"
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </section>

      <button
        className="w-full bg-[#641BE6] text-white rounded-lg py-3 font-semibold hover:bg-[#641BE6] transition duration-300"
        onClick={() => {
           setReceiver(new PublicKey(value));
          handleInitiateEscrow()
        }}
      >
        Create Escrow
      </button>
    </div>
  );
};

export default TransactionDetails;
