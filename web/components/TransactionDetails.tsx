
type TransactionDetailsProps = {
  transactionDetails: any;
};

const TransactionDetails = ({
  transactionDetails,
}: TransactionDetailsProps) => {
  const { name, price, duration, stages } = transactionDetails;
  return (
    <div className="bg-gray-900 text-white p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Start Transaction</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Transaction details</h2>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="mb-1">{name}</p>
          <p className="mb-1">${price} USDC</p>
          <p className="mb-1">Paying after all {stages} stages are completed</p>
          <p className="mb-1">Expected period: {duration}</p>
          <button className="text-blue-400 text-sm absolute top-4 right-4">
            Edit
          </button>
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
          />
        </div>
      </section>

      <button className="w-full bg-[#641BE6] text-white rounded-lg py-3 font-semibold hover:bg-[#641BE6] transition duration-300">
        Create Escrow
      </button>
    </div>
  );
};

export default TransactionDetails;
