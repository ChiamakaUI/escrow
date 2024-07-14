'use client';

import { useState } from 'react';
import TransactionForm from './TransactionForm';
import TransactionDetails from './TransactionDetails';

const Transaction = () => {
  const [step, setStep] = useState<number>(0);
  const [transactionDetails, setTransactionDetails] = useState<any>()
  return (
    <div>
      {step === 0 ? (
        <TransactionForm setStage={setStep} setDetails={setTransactionDetails}/>
      ) : (
        <TransactionDetails transactionDetails={transactionDetails}/>
      )}
    </div>
  );
};

export default Transaction;