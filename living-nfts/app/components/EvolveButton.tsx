"use client"
import React, { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';

export function EvolveButton({
  contractAddress,
  currentTokenId
}: {
  contractAddress: `0x${string}`;
  currentTokenId: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const handleEvolve = async () => {
    setIsLoading(true);
    try {
      // Call API to prepare evolution
      const response = await fetch('/api/evolve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Wallet-Address': address || ''
        },
        body: JSON.stringify({
          contractAddress,
          currentTokenId,
          trigger: 'user_trigger' 
        })
      });

      const { newURI, txParams } = await response.json();

      // Execute mint
      writeContract({
        ...txParams,
        value: BigInt(txParams.value)
      }, {
        onSuccess: (txHash) => {
          console.log(`Evolved to new token! TX: ${txHash}`);
        }
      });

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleEvolve}
      disabled={isLoading || !address}
      className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      {isLoading ? 'Evolving...' : 'Evolve NFT'}
    </button>
  );
}