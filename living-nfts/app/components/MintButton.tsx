import { useState } from 'react';
import { useAccount } from 'wagmi';
import { mintLivingNFT } from '../lib/zora';

export const MintButton = () => {
  const [isMinting, setIsMinting] = useState(false);
  const { address } = useAccount();

  const handleMint = async () => {
    setIsMinting(true);
    try {
      const { hash } = await mintLivingNFT({
        contractName: "LivingNFTs",
        contractURI: "ipfs://Qm.../contract.json",
        tokenURI: "ipfs://Qm.../seed.json"
      });
      alert(`Minted! TX: ${hash}`);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <button 
      onClick={handleMint}
      disabled={!address || isMinting}
      className="bg-blue-500 px-4 py-2 rounded"
    >
      {isMinting ? 'Minting...' : 'Mint LivingNFT'}
    </button>
  );
};